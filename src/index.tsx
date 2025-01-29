import { NativeModules, Platform } from 'react-native';

type Props = {
  redirectURI: string;
  callback(authCode: string): void;
  codeVerifier?: string;
};

const Tiktok = NativeModules.Tiktok;

export function authorize(props: Props): void {
  const { redirectURI, callback, codeVerifier } = props;
  if (Platform.OS === 'ios') {
    return Tiktok.authorize(redirectURI, callback);
  }

  return Tiktok.authorize(redirectURI, callback, codeVerifier);
}
