import ExpoModulesCore
import TikTokOpenSDKCore

public class TiktokAppDelegate : ExpoAppDelegateSubscriber {
    public func application(_ app: UIApplication,open url: URL,
                         options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
            if (TikTokURLHandler.handleOpenURL(url)) {
                return true
            }
            return false
        }
        
    public func application(_ application: UIApplication,
                     continue userActivity: NSUserActivity,
                     restorationHandler: @escaping ([UIUserActivityRestoring]?) -> Void) -> Bool {
        if (TikTokURLHandler.handleOpenURL(userActivity.webpageURL)) {
            return true
        }
        return false
    }
}
