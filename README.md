# React Native Tiktok

Get authorized and fetch user profile, share videos

# Install

```sh
npm install react-native-tiktok

cd ios && pod install
```

## Post-install

### iOS

Follow **Tiktok** quickstart [documentation](https://developers.tiktok.com/doc/getting-started-ios-quickstart-objective-c). Please note 1 and 2 steps are not required!!

# Usage

```js
import { init, auth, share, events } from "react-native-tiktok";

```

### `init(client_key)`
If you are on Android this methid is necessary to initialize tiktok sdk.
Please obtain a client key and secret from the developer portal on https://developers.tiktok.com under "My apps".

### `auth(callback)`
This guide details how to enable authentication from your app to TikTok. After successfully completing authentication with TikTok, users will be able to access basic user data (display name and avatar).

Callback function returns 3 types of response.

```js
  1. code - used to request user access token
  2. error 
  3. errMsg - If error is true then you can show what was the exact error
```

### `share(filePath, callback)`
**share** method allows users to share videos from your app to TikTok,
**filePath** shoud be valid mp4 video file path.
Callback function returns string type responses:

| Responses                                         |
| ------------------------------------------------- |
| **PUBLISHED**                                     |
| **NETWORK_ERROR**                                 |
| **SHARING_CANCELED**                              | 
| **SHARING_FAILED**                                |
| **UNSUPPORTED**                                   |

### `events`
Since Android side doesn't return response immediately, you need to set event listener in order to be informed when authentication or sharing processes are finished.

```js
useEffect(() => {
  const authListener = events.addListener('onAuthCompleted', (resp) => {
    // response contains returned status(errorCode) and code (if status is 0)
    // you can check it here https://developers.tiktok.com/doc/getting-started-android-handling-errors
  });

  const shareListener = events.addListener('onShareCompleted', (resp) => {
    // response contains returned errorCode
  });

  return () => {
    authListener.remove();
    shareListener.remove();
  }
}, []);
```

## License

MIT
