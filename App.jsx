import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { useEffect } from 'react';

export default function App() {
  const [fontsLoaded] = useFonts({
    Manrope: require('./assets/fonts/Manrope-Regular.ttf'),
    ManropeMedium: require('./assets/fonts/Manrope-Medium.ttf'),
    ManropeBold: require('./assets/fonts/Manrope-Bold.ttf'),
  });

  return (
    <>
      {fontsLoaded ? (
        <View style={styles.container}>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
          <StatusBar style='auto' />
        </View>
      ) : (
        <></>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },
});
