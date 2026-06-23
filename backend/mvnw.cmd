@REM ----------------------------------------------------------------------------
@REM Maven Start Up Batch script
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set MAVEN_PROJECTBASEDIR=%~dp0

set MVNW_REPOURL=https://repo.maven.apache.org/maven2
set MVNW_USERNAME=
set MVNW_PASSWORD=

if not "%MVNW_USERNAME%" == "" (
  set MVNW_REPO_CREDENTIALS=--user "%MVNW_USERNAME%:%MVNW_PASSWORD%"
)

set WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain
set DOWNLOAD_URL="https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar"

if exist %WRAPPER_JAR% (
  goto verify_download
) else (
  goto download
)

:download
echo Downloading Maven Wrapper...
powershell -Command "[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; (New-Object System.Net.WebClient).DownloadFile('%DOWNLOAD_URL%', '%WRAPPER_JAR%')"
if "%ERRORLEVEL%" == "0" goto verify_download
echo Failed to download Maven Wrapper
exit /b 1

:verify_download
:exec_maven
set JAVA_EXE=java.exe
set JAVA_HOME_EXTS=

%JAVA_EXE% %MAVEN_OPTS% ^
  -classpath %WRAPPER_JAR% ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR%" ^
  %WRAPPER_LAUNCHER% %MAVEN_CONFIG% %*
if "%ERRORLEVEL%" == "0" goto end
exit /b 1
:end
