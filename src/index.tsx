import { NativeModules, Platform } from 'react-native';

type AuthProps = {
  redirectURI: string;
  callback(authCode: string): void;
  codeVerifier?: string;
};

type ShareProps = {
  redirectURI: string;
  path: string;
  callback: (response: string) => void;
};

const Tiktok = NativeModules.Tiktok;

export function authorize(props: AuthProps): void {
  const { redirectURI, callback, codeVerifier } = props;
  if (Platform.OS === 'ios') {
    return Tiktok.authorize(redirectURI, callback);
  }

  return Tiktok.authorize(redirectURI, callback, codeVerifier);
}

export function share(props: ShareProps): void {
  const { redirectURI, path, callback } = props;
  return Tiktok.share(redirectURI, path, callback);
}
