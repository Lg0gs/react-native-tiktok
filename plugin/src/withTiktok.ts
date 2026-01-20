import {
  withInfoPlist,
  type ConfigPlugin,
  withProjectBuildGradle,
  withAndroidManifest,
  AndroidConfig,
} from '@expo/config-plugins';

const withTiktok: ConfigPlugin<{ tiktokClientKey: string }> = (
  config,
  { tiktokClientKey }
) => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  config = withInfoPlist(config, (config) => {
    // eslint-disable-next-line dot-notation
    config.modResults['TikTokClientKey'] = tiktokClientKey;

    // Merge TikTok URL scheme with existing schemes instead of overwriting
    const existingURLTypes = config.modResults.CFBundleURLTypes || [];
    const tiktokURLType = { CFBundleURLSchemes: [tiktokClientKey] };
    const hasScheme = existingURLTypes.some(
      (urlType) =>
        urlType.CFBundleURLSchemes &&
        urlType.CFBundleURLSchemes.includes(tiktokClientKey)
    );
    if (!hasScheme) {
      config.modResults.CFBundleURLTypes = [...existingURLTypes, tiktokURLType];
    }

    // Merge TikTok query schemes with existing schemes instead of overwriting
    const tiktokSchemes = [
      'tiktokopensdk',
      'tiktoksharesdk',
      'snssdk1180',
      'snssdk1233',
    ];
    const existingSchemes = config.modResults.LSApplicationQueriesSchemes || [];
    const mergedSchemes = [...new Set([...existingSchemes, ...tiktokSchemes])];
    config.modResults.LSApplicationQueriesSchemes = mergedSchemes;

    return config;
  });

  config = withProjectBuildGradle(config, (config) => {
    const buildGradle = config.modResults.contents;
    const mavenRepo = `maven { url "https://artifact.bytedance.com/repository/AwemeOpenSDK" }`;

    const updatedContent = buildGradle.replace(
      /(allprojects\s*{\s*repositories\s*{)/,
      `$1\n\t\t${mavenRepo}`
    );
    config.modResults.contents = updatedContent;
    return config;
  });

  config = withAndroidManifest(config, (config) => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(
      config.modResults
    );

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      'TikTokClientKey',
      tiktokClientKey
    );

    return config;
  });

  return config;
};

export default withTiktok;
