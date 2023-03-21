package com.reactnativetiktok;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.core.content.FileProvider;

import com.bytedance.sdk.open.tiktok.TikTokOpenApiFactory;
import com.bytedance.sdk.open.tiktok.TikTokOpenConfig;
import com.bytedance.sdk.open.tiktok.api.TikTokOpenApi;
import com.bytedance.sdk.open.tiktok.authorize.model.Authorization;
import com.bytedance.sdk.open.tiktok.base.MediaContent;
import com.bytedance.sdk.open.tiktok.base.VideoObject;
import com.bytedance.sdk.open.tiktok.share.Share;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.File;
import java.util.ArrayList;

@ReactModule(name = TiktokModule.NAME)
public class TiktokModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Tiktok";

    private void Share(String path) {
      TikTokOpenApi tiktokOpenApi = TikTokOpenApiFactory.create(getCurrentActivity());
      Share.Request request = new Share.Request();
      request.callerLocalEntry = "com.reactnativetiktok.TikTokEntryActivity";
      ArrayList<String> mUri = new ArrayList<>();
      mUri.add(getFileUri(path));
      VideoObject videoObject = new VideoObject();
      videoObject.mVideoPaths = mUri;
      MediaContent content = new MediaContent();
      content.mMediaObject = videoObject;
      request.mMediaContent = content;
      tiktokOpenApi.share(request);
    }

    public String getFileUri(String filePath) {
      ReactContext ctx = getReactApplicationContext();
      File file = new File(filePath);
      String authority = ctx.getPackageName() + ".fileprovider";
      Uri contentUri = FileProvider.getUriForFile(ctx, authority, file);
      ctx.grantUriPermission("com.zhiliaoapp.musically", contentUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
      ctx.grantUriPermission("com.ss.android.ugc.trill", contentUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
      return contentUri.toString(); // contentUri.toString() should be prefixed with "content://"
    }

    public TiktokModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }


    // Example method
    // See https://reactnative.dev/docs/native-modules-android
    @ReactMethod
    public void init(String key) {
      TikTokOpenApiFactory.init(new TikTokOpenConfig(key));
    }

    @ReactMethod
    public void auth(Callback callBack) {
      TikTokOpenApi tiktokOpenApi = TikTokOpenApiFactory.create(getCurrentActivity());
      Authorization.Request request = new Authorization.Request();
      request.scope = "user.info.basic";
      request.callerLocalEntry = "com.reactnativetiktok.TikTokEntryActivity";
      tiktokOpenApi.authorize(request);
    }

    @ReactMethod
    public void share(String path, Callback callBack) {
      Share(path);
    }
}
