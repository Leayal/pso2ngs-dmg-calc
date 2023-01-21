@echo off
@SETLOCAL
REM This script will try to find JAVA and use it to invoke Google's Closure Compiler to uglify, minify and optimize javascript files.
REM Java Runtime's version should be at latest as possible. As of writing this script, v19 is recommended.

REM Set java home locally if needed and if the ENV variable hasn't been defined.
IF "%JAVA_HOME%"=="" (
 @SET "JAVA_HOME="
)

REM Closure Compiler's parameters

REM Path to jar file of Google Closure Compiler
SET "CLOSURE_JAR_PATH=tools\closure-compiler-v20230103.jar"

REM Specifies the compilation level to use. Options: 
REM Available options: BUNDLE, WHITESPACE_ONLY, SIMPLE, ADVANCED
REM ADVANCED may cause bug or processing failures for cases which use third-party JS libraries. Default is SIMPLE.
SET "CLOSURE_OPTIMIZATION_LEVEL=SIMPLE"

REM Sets the language spec to which input sources should conform.
REM Available options: ECMASCRIPT3, ECMASCRIPT5, ECMASCRIPT5_STRICT, ECMASCRIPT_2015, ECMASCRIPT_2016, ECMASCRIPT_2017, ECMASCRIPT_2018, ECMASCRIPT_2019, STABLE, ECMASCRIPT_NEXT, UNSTABLE.
SET "CLOSURE_TARGET_LANG=ECMASCRIPT_2015"
REM ECMASCRIPT_2016, which many browsers support.

REM Determines the set of builtin externs to load.
REM Available options: BROWSER, CUSTOM.
REM Shouldn't be changed.
SET "CLOSURE_TARGET_ENV=BROWSER"

REM Specifies the warning level to use.
REM Available options: QUIET, DEFAULT, VERBOSE
REM Shouldn't be changed.
SET "CLOSURE_WARNING_LEVEL=DEFAULT"

REM DO NOT CHANGE ANYTHING BELOW

@SET JAVA_EXE=""
cd /d %~dp0

IF "%JAVA_HOME%"=="" (
 @where java.exe >nul 2>nul
 if %errorlevel%==1 (
  @GOTO NO_JAVA
 ) ELSE (
  @SET JAVA_EXE=java.exe
 )
) ELSE (
 IF EXIST "%JAVA_HOME%\bin\java.exe" (
  @SET "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
 ) ELSE (
  @where java.exe >nul 2>nul
  if %errorlevel%==1 (
   @GOTO NO_JAVA
  ) ELSE (
   @SET JAVA_EXE=java.exe
  )
 )
)

IF "%JAVA_EXE%"=="" (
 REM Can't be here anyway.
 @GOTO NO_JAVA
) ELSE (
 REM Building the scripts into a script, or multiple scripts.

 @start /WAIT "Processing home.js" /B "%JAVA_EXE%" -jar "%CLOSURE_JAR_PATH%" --compilation_level %CLOSURE_OPTIMIZATION_LEVEL% --env %CLOSURE_TARGET_ENV% --warning_level %CLOSURE_WARNING_LEVEL% --language_in UNSTABLE --js "src/js/lea-js-extend/**.js" --language_out %CLOSURE_TARGET_LANG% --js_output_file "docs/js/lea.js-extended.js"
 @start /WAIT "Processing home.js" /B "%JAVA_EXE%" -jar "%CLOSURE_JAR_PATH%" --compilation_level %CLOSURE_OPTIMIZATION_LEVEL% --env %CLOSURE_TARGET_ENV% --warning_level %CLOSURE_WARNING_LEVEL% --language_in UNSTABLE --js "src/data/statid.js" --js "src/data/abilities.js" --js "src/data/abilities/**.js" --language_out %CLOSURE_TARGET_LANG% --js_output_file "docs/js/lea.pso2data.abilities.js"
 @start /WAIT "Processing home.js" /B "%JAVA_EXE%" -jar "%CLOSURE_JAR_PATH%" --compilation_level %CLOSURE_OPTIMIZATION_LEVEL% --env %CLOSURE_TARGET_ENV% --warning_level %CLOSURE_WARNING_LEVEL% --js "src/js/pso2/**.js" --language_out %CLOSURE_TARGET_LANG% --js_output_file "docs/js/lea.pso2.dmgcalc.js"
 @start /WAIT "Processing home.js" /B "%JAVA_EXE%" -jar "%CLOSURE_JAR_PATH%" --compilation_level %CLOSURE_OPTIMIZATION_LEVEL% --env %CLOSURE_TARGET_ENV% --warning_level %CLOSURE_WARNING_LEVEL% --language_in UNSTABLE --js "src/js/pso2ui/**.js" --language_out %CLOSURE_TARGET_LANG% --js_output_file "docs/js/lea.pso2.ui.js"
 @start /WAIT "Processing home.js" /B "%JAVA_EXE%" -jar "%CLOSURE_JAR_PATH%" --compilation_level %CLOSURE_OPTIMIZATION_LEVEL% --env %CLOSURE_TARGET_ENV% --warning_level %CLOSURE_WARNING_LEVEL% --js "src/js/home.js" --language_out %CLOSURE_TARGET_LANG% --js_output_file "docs/js/home.js"

 @echo All JS files has been processed and copied to distribution.
 @GOTO ENDING
)

:NO_JAVA
@echo Cannot find Java.
@echo No JS files have been processed by Closure.
@echo Fall-back to copying JS files without processing.

@echo Copying JS files to distribution
RMDIR /S /Q "docs\js"
XCOPY "src\js" "docs\js" /S /R /H /C /I

:ENDING

@echo Copying CSS files to distribution
RMDIR /S /Q "docs\css"
XCOPY "src\css" "docs\css" /S /R /H /C /I

@echo Copying index.html files to distribution
COPY /D /B /Y "src\index.html" "docs\index.html"

@ENDLOCAL