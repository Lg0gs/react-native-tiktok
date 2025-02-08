package com.tiktok

import android.widget.Toast
import android.content.Intent
import android.content.pm.PackageManager
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.tiktok.open.sdk.auth.AuthApi
import com.tiktok.open.sdk.auth.AuthRequest
import com.tiktok.open.sdk.auth.utils.PKCEUtils

class TiktokModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  private var authApi: AuthApi? = null
  private var redirectUrl: String = ""
  private var codeVerifier = PKCEUtils.generateCodeVerifier()
  private var callback: Callback? = null

  init {
    reactContext.addActivityEventListener(object : ActivityEventListener {
      override fun onNewIntent(intent: Intent?) {
        authApi?.getAuthResponseFromIntent(intent, redirectUrl)?.let {
          if (it.authErrorDescription != null) {
            Toast.makeText(reactApplicationContext, it.authErrorDescription, Toast.LENGTH_LONG).show()
          } else {
            callback?.invoke(it.authCode, codeVerifier)
          }
        }
      }

      override fun onActivityResult(activity: android.app.Activity, requestCode: Int, resultCode: Int, data: Intent?) {
        //
      }
    })
  }

  override fun getName(): String {
    return NAME
  }

  @ReactMethod
  fun authorize(redirectURI: String, callback: Callback, scopes: ReadableArray? = null) {
    this.redirectUrl = redirectURI
    this.callback = callback

    val applicationInfo = reactApplicationContext.packageManager.getApplicationInfo(reactApplicationContext.packageName.toString(), PackageManager.GET_META_DATA);
    val clientKey = applicationInfo.metaData?.getString("TikTokClientKey")

    val request = AuthRequest(
      clientKey = clientKey!!,
      scope = scopes?.toArrayList()?.joinToString() ?: "user.info.basic",
      redirectUri = redirectURI,
      codeVerifier = codeVerifier
    )

    if (authApi == null) {
      authApi = reactApplicationContext.currentActivity?.let {
        AuthApi(activity = it)
      }
    }

    if (authApi != null) {
      authApi!!.authorize(
        request = request,
        authMethod = AuthApi.AuthMethod.TikTokApp
      )
    }
  }

  companion object {
    const val NAME = "Tiktok"
  }
}
