import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Timer from './Timer';


export default function App() {
  return (
    <View style={styles.container}>
      <Timer></Timer>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000080',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
