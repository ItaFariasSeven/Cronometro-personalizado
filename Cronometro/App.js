import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Timer from './src/screens/Timer';
import Historico from './src/screens/Historico';
import Cronometro from './src/screens/Cronometro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>

        <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor:'#000080',
          }
        }}>
          <Stack.Screen 
            name='Timer'
            component={Timer}
          />
          <Stack.Screen 
            name='Cronometro'
            component={Cronometro}
          />
          <Stack.Screen 
            name='Historico'
            component={Historico}
          />
          
        </Stack.Navigator>
      
    </NavigationContainer>
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
