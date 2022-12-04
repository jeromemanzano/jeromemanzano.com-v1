# jeromemanzano.com v1

Welcome to the first version of my website [jeromemanzano.com](https://www.jeromemanzano.com). This is built using `Vite` and hosted in `Netlify`

PS: This is a work in progress so you'll notice a few things missing and a lot of `TODO` comments here and there.

## Setup

### Install all dependecies

```
yarn
```

### Run on local browser

```
yarn dev
```

### Run on a local Android device/emulator

You have 2 options for running the app on an Android device or emulator. First will build and run the application from the current IDE you are using (`VSCode` /`WebStorm`)

```
yarn run:android
```

The second option will open `Android Studio`. From there you can run or debug as you do with any native Android application

```
yarn open:android
```

### Run on a local ios simulator

Like in Android, you have option to run the application directly from your IDE using

```
yarn run:ios
```

or you may open the app using `Xcode` using

```
yarn open:ios
```

This will not work on an actual iOS devices unless you setup the proper certificate and provision from https://developer.apple.com

## Backend

As you have probably seen, this connects to an api to retrieve some of the information displayed (I know it seems like overkill, but I have reasons for doing so). The backend repository is currently private. I'll change it to public once the necessary security features are in place.
