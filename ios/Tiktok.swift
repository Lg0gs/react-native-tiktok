import TikTokOpenAuthSDK
import React

@objc(Tiktok)
class Tiktok: RCTEventEmitter {
  let authRequest = TikTokAuthRequest(scopes: ["user.info.basic"], redirectURI: "")

  @objc
  func authorize(_ redirectURI: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    DispatchQueue.main.async {
      self.authRequest.redirectURI = redirectURI
      self.authRequest.send { response in
        guard let authResponse = response as? TikTokAuthResponse else {
          return
        }

        if authResponse.errorCode == .noError {
          callback([authResponse.authCode ?? ""])
        }
      }
    }
  }
}
