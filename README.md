# Electron-Webcam
An electron app that is a basic html5 webcam

# Build


## Build on all Platforms

`electron-packager ./ ElectronWebcam --platform=all --arch=all --dir=build/ --version=0.36.7`


## Build on Windows

### 32bit

`electron-packager ./ ElectronWebcam --platform=win32 --arch=ia32 --dir=build/ --version=0.36.7`

### 64bit

`electron-packager ./ ElectronWebcam --platform=win32 --arch=x64 --dir=build/ --version=0.36.7`

## Build on Darwin (OS X)

### 64bit

`electron-packager ./ ElectronWebcam --platform=darwin --arch=all --dir=build/ --version=0.36.7`

## Build on Linux

### 32bit

`electron-packager ./ ElectronWebcam --platform=linux --arch=ia32 --dir=build/ --version=0.36.7`

### 64bit

`electron-packager ./ ElectronWebcam --platform=linux --arch=x64 --dir=build/ --version=0.36.7`
