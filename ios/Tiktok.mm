#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Tiktok, RCTEventEmitter)

RCT_EXTERN_METHOD(
                  authorize: (NSString)redirectURI
                  callback: (RCTResponseSenderBlock)callback
                  scopes:(NSArray * _Nullable)scopes
                  )

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
