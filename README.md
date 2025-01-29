## React Native Tiktok

Get authorized and fetch user profile

Version 2.0.0 uses modern Tiktok Open SDK and legacy API is dropped, if your RN version < 0.69 then please refer v1.0.1

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

## Usage
```js
import { authorize } from 'react-native-tiktok';

authorize({
  redirectURI: '<YOUR_REDIRECT_URL>', // redirectURI is your universal link
  callback: (authCode) => {
  // immediately invokes callback function as soon as operation is completed
    console.log(authCode);
  },
});
```
Use `authCode` to manage [User Access Token](https://developers.tiktok.com/doc/oauth-user-access-token-management)
