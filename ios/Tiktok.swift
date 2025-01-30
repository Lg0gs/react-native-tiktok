import Foundation
import Photos
import TikTokOpenAuthSDK
import TikTokOpenShareSDK
import React

@objc(Tiktok)
class Tiktok: RCTEventEmitter {
  let authRequest = TikTokAuthRequest(scopes: ["user.info.basic"], redirectURI: "")
  let shareRequest = TikTokShareRequest(localIdentifiers: [],
                                        mediaType: .video,
                                        redirectURI: "")

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
        } else {
          callback([authResponse.errorDescription ?? "Couldn't login"])
        }
      }
    }
  }
  
  @objc
  func share(_ redirectURI: String, path: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    self.shareRequest.redirectURI = redirectURI
    var mediaIdentifier: String? = nil
    
    PHPhotoLibrary.shared().performChanges ({
      let assetRequest = PHAssetCreationRequest.forAsset()
      assetRequest.addResource(with: .video, fileURL: URL(string: path)!, options: nil)
      mediaIdentifier = assetRequest.placeholderForCreatedAsset?.localIdentifier
    }) { success, error in
      if success {
        self.shareRequest.localIdentifiers = [mediaIdentifier!]
        
        DispatchQueue.main.async {
          self.shareRequest.send { response in
            guard let shareResponse = response as? TikTokShareResponse else {
              return
            }
            if shareResponse.errorCode == .noError {
              callback(["Ok"])
            } else {
              callback([shareResponse.errorDescription ?? "Couldn't share media"])
            }
          }
        }
      } else {
        callback([error?.localizedDescription ?? "Couldn't create media asset"])
      }
    }
  }
}
