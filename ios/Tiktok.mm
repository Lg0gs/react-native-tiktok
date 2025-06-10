#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(Tiktok, RCTEventEmitter)

RCT_EXTERN_METHOD(
                  authorize: (NSString)redirectURI
                  scopes:(NSArray * _Nullable)scopes
                  callback: (RCTResponseSenderBlock)callback
                  )

+ (BOOL)requiresMainQueueSetup
{
  return NO;
}

@end
