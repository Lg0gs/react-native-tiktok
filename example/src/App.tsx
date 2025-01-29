import { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { authorize } from 'react-native-tiktok';

export default function App() {
  useEffect(() => {
    authorize({
      redirectURI: '<YOUR_REDIRECT_URL>',
      listener: (authCode) => {
        console.log(authCode);
      },
    });
  }, []);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
  },
});
