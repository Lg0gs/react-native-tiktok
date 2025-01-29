import { NativeModules } from 'react-native';

type Props = {
  redirectURI: string;
  callback(authCode: string): void;
};

const Tiktok = NativeModules.Tiktok;

export function authorize(props: Props): void {
  return Tiktok.authorize(props.redirectURI, props.callback);
}
