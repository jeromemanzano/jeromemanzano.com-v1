<h1 align="center">
  <a href="http://jeromemanzano.com">jeromemanzano.com</a>
</h1>

<h4 align="center">Welcome to the first version of my website. This is built using <a href="https://vitejs.dev/" target="_blank">Vite</a> and hosted in <a href="https://www.netlify.com/" target="_blank">Netlify</a>.</h4>

[Vue 3](https://vuejs.org/) |
[Apollo Client/Server](https://www.apollographql.com/) |
[Font Awesome](https://fontawesome.com/) |
[Tailwind CSS](https://tailwindcss.com/) |
[Vue router](https://router.vuejs.org/) |
[Capacitor](https://capacitorjs.com/) |
[Firebase](https://firebase.google.com/) | |
[Node.js](https://nodejs.dev/en/) |
[VueUse](https://vueuse.org/) |
[Mongoose](https://mongoosejs.com/) |
[GraphQL](https://graphql.org/) |
[Express.js](https://expressjs.com/) |
[Pinia](https://pinia.vuejs.org/) |
[MongoDB](https://www.mongodb.com/)


## How to run in local web browser

### Requirements
1. `Mongo DB Atlas` account. Sign up for free [here](https://www.mongodb.com/)
2. `Node.js` ideally >= version `16.10`. Follow installation guide [here](https://nodejs.org/en/download/)
3. `Netlify CLI`. Follow installation guide [here](https://docs.netlify.com/cli/get-started/)

### Setup

#### 1. Connecting to your own database
Sign in to your `Mongo DB Atlas` account and create a free `cluster`. Get the [connection string](https://www.mongodb.com/docs/guides/atlas/connection-string/) of your cluster(e.g. `mongodb+srv://myusername:mypassword@mycluster.mongodb.net/?retryWrites=true&w=majority`) and copy it to `DB_CONNECTION_STRING` property of your `.env` file

```
//.env

DB_CONNECTION_STRING = "mongodb+srv://myusername:mypassword@mycluster.mongodb.net/?retryWrites=true&w=majority"
```
#### 2. Change the `NODE_ENV` property of your `.env` file to "local"

#### 3. Install all dependencies. Execute the following command on your terminal
```bash
yarn
```
#### 4. Run in local browser. Execute the following command on your terminal

```bash
Netlify dev

# Note: you need admin rights to execute this command. If your terminal doesn't have admin rights then you'll need to run with `sudo` command
```

## How to run in a local Android device/emulator

### Requirements
1. Follow setup guide for running in local web browser
2. Android Studio. Follow installation guide [here](https://developer.android.com/studio/install)
3. Android emulator or Android device. Follow guide [here](https://developer.android.com/studio/run/device)

### Setup
#### To run in an Android device/emulator you need to execute the following commands on your terminal

```bash
yarn run:android

# Note: This will build and run your app directly from the terminal.
```

or

```bash
yarn open:android

# Note: This will open Android Studio. From there you can run or debug like any other native Android application.
```

## How to run in a local ios simulator


### Requirements
1. Follow setup guide for running in local web browser
2. Device with MacOS installed
3. Xcode. Download it for free [here](https://developer.apple.com/xcode/#)

### Setup

#### To run in an ios simulator you need to execute the following commands on your terminal
This guide is only for iosSimulator. To run this on an iOS device you need to setup the proper certificate and provision from https://developer.apple.com
```bash
yarn run:ios

# Note: This will build and run your app directly from the terminal.
```

or

```bash
yarn open:ios

# Note: This will open Xcode. From there you can run or debug like any other native iOS application.
```

Like in Android, you have option to run the application directly from your IDE using

```
yarn run:ios
```

or you may open the app using `Xcode` using

```
yarn open:ios
```

## Admin Console

Some of the details shown can be updated through the admin console. To access just go to https://jeromemanzano.com/admin or if you are running it locally the https://localhost:8888/admin
