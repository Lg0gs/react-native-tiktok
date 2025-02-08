import { NativeModules } from 'react-native';

export const Scopes = {
  artist: {
    certification: {
      read: 'artist.certification.read',
      update: 'artist.certification.update',
    },
  },
  user: {
    info: {
      basic: 'user.info.basic',
      stats: 'user.info.stats',
      profile: 'user.info.profile',
    },
  },
  video: {
    list: 'video.list',
  },
};

type Props = {
  redirectURI: string;
  scopes?: string[];
  callback(authCode: string, codeVerifier?: string): void;
};

const Tiktok = NativeModules.Tiktok;

export function authorize(props: Props): void {
  const { redirectURI, callback, scopes } = props;
  return Tiktok.authorize(redirectURI, callback, scopes);
}
