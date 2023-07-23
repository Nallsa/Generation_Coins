import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
const ws = new WebSocket('wss://stream.binance.com:9443/ws/etheur@trade');

export default function App() {
  const [state, setState] = useState([]);
  const app = () => {
    return (ws.onmessage = event => {
      const eventParse = JSON.parse(event.data);
      setState(eventParse.p);
    });
  };

  useEffect(() => {
    app();
  }, []);

  console.log(state);
  return (
    <View style={styles.container}>
      <Text>{state}</Text>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
