import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { response } from './response';

const { Tiktok } = NativeModules;

type ResponseType = {
  status: number;
  code: string;
};

export const auth = (
  callback: (code: string, error: boolean | null, errMsg: string) => void
) => {
  Tiktok.auth((resp: ResponseType) => {
    if (Platform.OS === 'ios') {
      switch (resp.status) {
        case response.success:
          callback(resp.code, false, '');
          break;
        case response.networkError:
          callback('', true, 'Network Error');
          break;
        case response.authDenied:
          callback('', true, 'Auth Denied');
          break;
        case response.unsupported:
          callback('', true, 'Unsupported');
          break;
        default:
          null;
      }
    } else {
      callback('', null, '');
    }
  });
};

export const share = (path: string, callback: (code: string) => void) => {
  Tiktok.share(path, (resp: number) => {
    if (Platform.OS === 'ios') {
      switch (resp) {
        case response.success:
          callback('PUBLISHED');
          break;
        case response.networkError:
          callback('NETWORK_ERROR');
          break;
        case response.canceled:
          callback('SHARING_CANCELED');
          break;
        case response.failed:
          callback('SHARING_FAILED');
          break;
        case response.unsupported:
          callback('UNSUPPORTED');
          break;
        default:
          null;
      }
    } else {
      callback('');
    }
  });
};

export const init = (key: string) => {
  if (Platform.OS === 'android') {
    Tiktok.init(key);
  }
};

export const events = new NativeEventEmitter(Tiktok);
