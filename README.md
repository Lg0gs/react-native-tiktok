
![banner](https://i.ibb.co/ZRQLsTq8/banner.webp)

<p align="center">
	<a href="https://github.com/Lg0gs/react-native-tiktok/blob/HEAD/LICENSE">
		<img alt="GitHub License" src="https://img.shields.io/github/license/Lg0gs/react-native-tiktok" />
	</a>
	<a href="https://github.com/Lg0gs/react-native-tiktok/releases">
		<img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/Lg0gs/react-native-tiktok" />
	</a>
	<a href="https://www.npmjs.com/package/react-native-tiktok">
		<img alt="NPM Downloads" src="https://img.shields.io/npm/dm/react-native-tiktok?color=00bcd4" />
	</a>
	<img alt="NPM Unpacked Size" src="https://img.shields.io/npm/unpacked-size/react-native-tiktok?color=orange">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?color=ab47bc" alt="PRs welcome!" />
	<a href="https://github.com/Lg0gs/react-native-tiktok/stargazers">
		<img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Lg0gs/react-native-tiktok">
	</a>
</p>

Get authorized and fetch user profile

v2 uses modern Tiktok Open SDK and legacy API is dropped, if your RN version < 0.69 then please refer v1

## Prerequisites
It's mandatory to provide [*`iOS Universal Link`*](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content/) and [*`Android App Link`*](https://developer.android.com/training/app-links) to the Tiktok Developers Portal in order to Tiktok App to be able to call your App when the operation is completed.

Check [this](https://medium.com/@fashad.ahmed20/how-to-implement-universal-links-in-react-native-19a424db4dcf) article how to setup Deep Links in React Native, only **iOS Setup:** (skip 3) and **Android Setup:**

## Install

> npm install react-native-tiktok

or

> yarn add react-native-tiktok


`cd ios && pod install`

## Getting started iOS

### The following are the minimum system requirements:

-   iOS version 11.0 or later
-   XCode version 9.0 or later

### Register your app with the TikTok for Developers website

1.  Sign up for a developer account on the  [TikTok for Developers website](https://developers.tiktok.com/).
2.  Create a new app, add the required details, and submit it for review.

### Configure your Xcode project

 1. Open your  `Info.plist`  file and add or update the following key-value pairs:
 ```xml
<key>LSApplicationQueriesSchemes</key>
<array>
    <string>tiktokopensdk</string>
    <string>tiktoksharesdk</string>
    <string>snssdk1180</string>
    <string>snssdk1233</string>
</array>
<key>TikTokClientKey</key>
<string>$TikTokClientKey</string>
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>$TikTokClientKey</string>
    </array>
  </dict>
</array>
```

**Note**: Replace all **$TikTokClientKey** with your Client key retrieved from the [developers](https://developers.tiktok.com/) portal

2. Add the following code to your app's `AppDelegate.swift` file:

```swift
import TikTokOpenSDKCore

override func application(_ app: UIApplication,open url: URL, options:
    [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
      if (TikTokURLHandler.handleOpenURL(url)) {
          return true
      }
      return false
}

override func application(_ application: UIApplication, continue userActivity: NSUserActivity,
     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
      if (TikTokURLHandler.handleOpenURL(userActivity.webpageURL)) {
          return true
      }
      return false
}
```

## Getting Started Android

The minimum system requirement is an API level of 21: Android 5.0 (Lollipop) or later.

1. Go to *`android/build.gradle`* file and add the maven repository

```
allprojects {
    repositories {
        maven { url "https://artifact.bytedance.com/repository/AwemeOpenSDK" }
    }
}
```
2. Go to *`android/app/src/main/AndroidManifest.xml`* file after `<application>` tag before `<activity` add:


> &lt;meta-data android:name="TikTokClientKey" android:value="<TIKTOK_CLIENT_KEY>"/&gt;

# Expo Installation
This step is pretty straightforward and includes modification of only `app.json` file

```json{
"expo": {
  ...
  "plugins": [
    [
      "react-native-tiktok",
      {
        "tiktokClientKey": "<YOUR_TIKTOK_CLIENT_KEY>"
      }
    ]
  ]
}
```

## Usage
```js
import { authorize, Scopes } from 'react-native-tiktok';

authorize({
  redirectURI: '<YOUR_REDIRECT_URL>', // your universal link
  scopes: [Scopes.user.info.basic, Scopes.video.list, ...], // optional: "user.info.basic" will be included by default
  callback: (authCode, codeVerifier) => {
  // codeVerifier is returned only on Android
    console.log(authCode, codeVerifier);
  },
});
```
Use `authCode` to manage [User Access Token](https://developers.tiktok.com/doc/oauth-user-access-token-management)
