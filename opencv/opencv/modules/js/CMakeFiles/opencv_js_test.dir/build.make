# CMAKE generated file: DO NOT EDIT!
# Generated by "Unix Makefiles" Generator, CMake Version 3.15

# Delete rule output on recipe failure.
.DELETE_ON_ERROR:


#=============================================================================
# Special targets provided by cmake.

# Disable implicit rules so canonical targets will work.
.SUFFIXES:


# Remove some rules from gmake that .SUFFIXES does not remove.
SUFFIXES =

.SUFFIXES: .hpux_make_needs_suffix_list


# Suppress display of executed commands.
$(VERBOSE).SILENT:


# A target that is always out of date.
cmake_force:

.PHONY : cmake_force

#=============================================================================
# Set environment variables for the build.

# The shell in which to execute make rules.
SHELL = /bin/sh

# The CMake executable.
CMAKE_COMMAND = /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake

# The command to remove a file.
RM = /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E remove -f

# Escaping for special characters.
EQUALS = =

# The top-level source directory on which CMake was run.
CMAKE_SOURCE_DIR = /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv

# The top-level build directory on which CMake was run.
CMAKE_BINARY_DIR = /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv

# Utility rule file for opencv_js_test.

# Include the progress variables for this target.
include modules/js/CMakeFiles/opencv_js_test.dir/progress.make

modules/js/CMakeFiles/opencv_js_test: bin/opencv.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/.eslintrc.json
modules/js/CMakeFiles/opencv_js_test: bin/.eslintrc.json
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/package.json
modules/js/CMakeFiles/opencv_js_test: bin/package.json
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/run_puppeteer.js
modules/js/CMakeFiles/opencv_js_test: bin/run_puppeteer.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_calib3d.js
modules/js/CMakeFiles/opencv_js_test: bin/test_calib3d.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_features2d.js
modules/js/CMakeFiles/opencv_js_test: bin/test_features2d.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_imgproc.js
modules/js/CMakeFiles/opencv_js_test: bin/test_imgproc.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_mat.js
modules/js/CMakeFiles/opencv_js_test: bin/test_mat.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_objdetect.js
modules/js/CMakeFiles/opencv_js_test: bin/test_objdetect.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_photo.js
modules/js/CMakeFiles/opencv_js_test: bin/test_photo.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_utils.js
modules/js/CMakeFiles/opencv_js_test: bin/test_utils.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/test_video.js
modules/js/CMakeFiles/opencv_js_test: bin/test_video.js
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/tests.html
modules/js/CMakeFiles/opencv_js_test: bin/tests.html
modules/js/CMakeFiles/opencv_js_test: ../modules/js/test/tests.js
modules/js/CMakeFiles/opencv_js_test: bin/tests.js
modules/js/CMakeFiles/opencv_js_test: ../data/haarcascades/haarcascade_frontalface_default.xml
modules/js/CMakeFiles/opencv_js_test: bin/haarcascade_frontalface_default.xml


bin/opencv.js: bin/opencv_js.js
bin/opencv.js: ../modules/js/src/make_umd.py
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_1) "Generating ../../bin/opencv.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /usr/bin/python2.7 /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/src/make_umd.py /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/opencv_js.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/opencv.js

bin/.eslintrc.json: ../modules/js/test/.eslintrc.json
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_2) "Copying .eslintrc.json"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/.eslintrc.json /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/.eslintrc.json

bin/package.json: ../modules/js/test/package.json
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_3) "Copying package.json"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/package.json /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/package.json

bin/run_puppeteer.js: ../modules/js/test/run_puppeteer.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_4) "Copying run_puppeteer.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/run_puppeteer.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/run_puppeteer.js

bin/test_calib3d.js: ../modules/js/test/test_calib3d.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_5) "Copying test_calib3d.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_calib3d.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_calib3d.js

bin/test_features2d.js: ../modules/js/test/test_features2d.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_6) "Copying test_features2d.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_features2d.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_features2d.js

bin/test_imgproc.js: ../modules/js/test/test_imgproc.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_7) "Copying test_imgproc.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_imgproc.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_imgproc.js

bin/test_mat.js: ../modules/js/test/test_mat.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_8) "Copying test_mat.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_mat.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_mat.js

bin/test_objdetect.js: ../modules/js/test/test_objdetect.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_9) "Copying test_objdetect.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_objdetect.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_objdetect.js

bin/test_photo.js: ../modules/js/test/test_photo.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_10) "Copying test_photo.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_photo.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_photo.js

bin/test_utils.js: ../modules/js/test/test_utils.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_11) "Copying test_utils.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_utils.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_utils.js

bin/test_video.js: ../modules/js/test/test_video.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_12) "Copying test_video.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/test_video.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/test_video.js

bin/tests.html: ../modules/js/test/tests.html
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_13) "Copying tests.html"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/tests.html /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/tests.html

bin/tests.js: ../modules/js/test/tests.js
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_14) "Copying tests.js"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/test/tests.js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/tests.js

bin/haarcascade_frontalface_default.xml: ../data/haarcascades/haarcascade_frontalface_default.xml
	@$(CMAKE_COMMAND) -E cmake_echo_color --switch=$(COLOR) --blue --bold --progress-dir=/home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/CMakeFiles --progress-num=$(CMAKE_PROGRESS_15) "Copying haarcascade_frontalface_default.xml"
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/venv/lib/python3.6/site-packages/cmake/data/bin/cmake -E copy_if_different /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js/../../data/haarcascades/haarcascade_frontalface_default.xml /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/bin/haarcascade_frontalface_default.xml

opencv_js_test: modules/js/CMakeFiles/opencv_js_test
opencv_js_test: bin/opencv.js
opencv_js_test: bin/.eslintrc.json
opencv_js_test: bin/package.json
opencv_js_test: bin/run_puppeteer.js
opencv_js_test: bin/test_calib3d.js
opencv_js_test: bin/test_features2d.js
opencv_js_test: bin/test_imgproc.js
opencv_js_test: bin/test_mat.js
opencv_js_test: bin/test_objdetect.js
opencv_js_test: bin/test_photo.js
opencv_js_test: bin/test_utils.js
opencv_js_test: bin/test_video.js
opencv_js_test: bin/tests.html
opencv_js_test: bin/tests.js
opencv_js_test: bin/haarcascade_frontalface_default.xml
opencv_js_test: modules/js/CMakeFiles/opencv_js_test.dir/build.make

.PHONY : opencv_js_test

# Rule to build all files generated by this target.
modules/js/CMakeFiles/opencv_js_test.dir/build: opencv_js_test

.PHONY : modules/js/CMakeFiles/opencv_js_test.dir/build

modules/js/CMakeFiles/opencv_js_test.dir/clean:
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js && $(CMAKE_COMMAND) -P CMakeFiles/opencv_js_test.dir/cmake_clean.cmake
.PHONY : modules/js/CMakeFiles/opencv_js_test.dir/clean

modules/js/CMakeFiles/opencv_js_test.dir/depend:
	cd /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv && $(CMAKE_COMMAND) -E cmake_depends "Unix Makefiles" /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/modules/js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js /home/festoai/src/GripperWeb/GripperAI_Cloudapplikation/opencv/opencv/modules/js/CMakeFiles/opencv_js_test.dir/DependInfo.cmake --color=$(COLOR)
.PHONY : modules/js/CMakeFiles/opencv_js_test.dir/depend
