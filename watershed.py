from __future__ import division
import numpy as np
try:
    import cv2 as cv
except:
    import opencv as cv
import base64
import sys


# def data_uri_to_cv2_img(uri):
    
#     return img


def fullDetermination(input):
    encoded_data = input.split(',')[1]
    nparr = np.fromstring(base64.b64decode(encoded_data), np.uint8)
    img = cv.imdecode(nparr, cv.IMREAD_COLOR)
    #img = data_uri_to_cv2_img(input)
    # img = cv.cvtColor(img, cv.COLOR_RGB2BGR)
    # calculate otsu Threshold to get binary picture
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    otsu = cv.THRESH_OTSU+cv.THRESH_BINARY_INV
    ret, thresh = cv.threshold(gray, 0, 255, otsu)
    # noise removal by morphological closing - close holes inside of an element
    kernel = np.ones((3, 3), np.uint8)
    closing = cv.morphologyEx(thresh, cv.MORPH_CLOSE, kernel, iterations=7)
    # noise removal by morphological opening - get rid of pixels outside of the element
    kernel = np.ones((3, 3), np.uint8)
    opening = cv.morphologyEx(closing, cv.MORPH_OPEN, kernel, iterations=5)
    # sure background area
    sure_bg = cv.dilate(opening, kernel, iterations=3)
    # Finding sure foreground area
    dist_transform = cv.distanceTransform(closing, cv.DIST_L2, 5)
    ret, sure_fg = cv.threshold(
        dist_transform, 0.3*dist_transform.max(), 255, 0)
    # Finding unknown region
    sure_fg = np.uint8(sure_fg)
    unknown = cv.subtract(sure_bg, sure_fg)
    # Marker labelling
    ret, markers = cv.connectedComponents(sure_fg)
    # Add one to all labels so that sure background is not 0, but 1
    markers = markers+1
    # Now, mark the region of unknown with zero
    markers[unknown == 255] = 0
    # apply watershed
    markers = cv.watershed(img, markers)
    #img[markers == -1] = [255, 0, 0]
    # get array of picture

    markers[markers != -1] = 0
    # extract border-only elements
    coord = np.where(markers[1:-1, 1:-1] == -1)
    # determine max/min values (most northern/western/.. point)
    yval = coord[0][np.argmin(coord, 1)]
    xval = coord[1][np.argmin(coord, 1)]
    yval2 = coord[0][np.argmax(coord, 1)]
    xval2 = coord[1][np.argmax(coord, 1)]
    # bring the corresponding x and y values together
    x = xval.tolist()+xval2.tolist()
    y = yval.tolist()+yval2.tolist()
    coor = list(zip(x, y))
    # draw outer points into the image
    for c in coor:
        cv.circle(img, (c[0], c[1]), 5, (255, 105, 180), 5)
    # calculate intersection

    def line(p1, p2):
        A = (p1[1] - p2[1])
        B = (p2[0] - p1[0])
        C = (p1[0]*p2[1] - p2[0]*p1[1])
        return A, B, -C

    def intersection(L1, L2):
        D = L1[0] * L2[1] - L1[1] * L2[0]
        Dx = L1[2] * L2[1] - L1[1] * L2[2]
        Dy = L1[0] * L2[2] - L1[2] * L2[0]
        if D != 0:
            x = Dx // D
            y = Dy // D
            return x, y
        else:
            return False

    L1 = line((coor[1]), coor[3])
    L2 = line(coor[0], coor[2])

    R = intersection(L1, L2)
    if R == False:
        R = coor[0]
    # draw main gripping point
    cv.circle(img, R, 10, (255, 255, 0), 10)

    ignore, buffer = cv.imencode('.png', img)

    output = base64.b64encode(buffer)

    return output

# for test purposes
# image = cv.imread('static/img/Kartoffel.jpg')
# image = fullDetermination(image)
