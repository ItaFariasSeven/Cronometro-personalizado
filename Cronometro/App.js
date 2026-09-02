import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import Timer from './src/screens/Timer';
import Historico from './src/screens/Historico';
import Cronometro from './src/screens/Cronometro';
import Footer from './src/components/Footer';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>

        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor:'#000080',
            }
          }}
          tabBar={(props) => (
            <Footer{...props} />
          )}
          >
          <Tab.Screen 
            name='Timer'
            component={Timer}
          />
          <Tab.Screen 
            name='Cronometro'
            component={Cronometro}
          />
          <Tab.Screen 
            name='Historico'
            component={Historico}
          />
          
        </Tab.Navigator>
      
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
