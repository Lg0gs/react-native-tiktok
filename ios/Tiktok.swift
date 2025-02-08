import TikTokOpenAuthSDK
import React

@objc(Tiktok)
class Tiktok: RCTEventEmitter {
  let authRequest = TikTokAuthRequest(scopes: [], redirectURI: "")

  @objc
  func authorize(_ redirectURI: String, callback: @escaping RCTResponseSenderBlock, scopes: [String]?) -> Void {
    DispatchQueue.main.async {
      self.authRequest.redirectURI = redirectURI
      self.authRequest.scopes = Set(scopes ?? ["user.info.basic"])
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
