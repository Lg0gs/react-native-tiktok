import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import Picker from 'react-native-image-crop-picker';
import { auth, share, init, events } from 'react-native-tiktok';

export default function App() {
  useEffect(() => {
    const ev = events.addListener('onShareCompleted', (resp) => {
      console.warn(resp);
    });

    return () => ev.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          auth((code, error, errMsg) => {
            console.log(code, error, errMsg);
          });
        }}
        title="Auth"
      />
      <Button
        onPress={() => {
          Picker.openPicker({
            mediaType: 'video',
          }).then((media) => {
            init('awhu8hzuq0o3b0n8');
            share(media.path, (code) => {
              console.log(code);
            });
          });
        }}
        title="Share"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
