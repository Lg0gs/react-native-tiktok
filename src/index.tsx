import { NativeModules } from 'react-native';

type Props = {
  redirectURI: string;
  callback(authCode: string, codeVerifier?: string): void;
};

const Tiktok = NativeModules.Tiktok;

export function authorize(props: Props): void {
  const { redirectURI, callback } = props;
  return Tiktok.authorize(redirectURI, callback);
}
