import Foundation
import TikTokOpenSDK
import Photos

@objc(Tiktok)
class Tiktok: UIViewController {
    
  @objc
  func auth(_ callback: @escaping RCTResponseSenderBlock) {
    let scopes = ["user.info.basic,video.list"] // list your scopes
    let scopesSet = NSOrderedSet(array:scopes)
    let request = TikTokOpenSDKAuthRequest()
    request.permissions = scopesSet

    DispatchQueue.main.async {
      request.send(self, completion: { resp -> Void in
        callback([
          ["status": resp.errCode.rawValue, "code": resp.code]
        ])
      })
    }
  }
  
  @objc
  func share(_ path: String, callback: @escaping RCTResponseSenderBlock) {
    PHPhotoLibrary.shared().performChanges({
      let asset = PHAssetCreationRequest.forAsset()
      asset.addResource(with: .video, fileURL: URL(string: path)!, options: nil)
      let newImageIdentifier = asset.placeholderForCreatedAsset?.localIdentifier

      let request = TikTokOpenSDKShareRequest()
      request.mediaType = TikTokOpenSDKShareMediaType.video;
      request.localIdentifiers = [newImageIdentifier!]
      DispatchQueue.main.async {
        request.send(completionBlock: { resp -> Void in
          callback([resp.errCode.rawValue])
        })
      }
    })
  }
}
