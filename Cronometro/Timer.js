import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';

export default function Timer() {
const [fontsLoaded] = useFonts({
    'iInstead': require('./assets/fonts/iInstead.ttf')
})
if(!fontsLoaded){
    return null;
}

  return (
    <View >
        <View style={styles.timer}>
            <Text style={styles.title}>Timer</Text>
        </View>

        <View style={styles.oclock}>
            <Text style={styles.zeros}>00h 00m 00s</Text>
        </View>

        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>2</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>3</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>4</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>5</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>6</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>7</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>8</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>9</Text>
            </TouchableOpacity>
        </View>

        <View style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>00</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.text}>0</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Image
                    source={require('./assets/images/delete.png')}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 12,
    margin: 10,
    },

  timer:{
    display: 'flex',
    position:'absolute',
    top: -210,
    left: -25,
    width: 150,
},

  title: {
    color: '#FFFAFA',
    fontSize: 50,
    fontFamily:'iInstead',
},

  oclock: {
    display: 'flex',
    position:'absolute',
    top: -100,
    justifyContent: 'center'
      
    },
    
  zeros: {
    color: '#FFFAFA',
    fontSize: 50,
    fontWeight:'bold',

  },

button: {
    backgroundColor: '#4747D4',
    padding: 20,
    justifyContent: 'center',
    borderRadius: 50,
    width: 100,
    height: 100,
},

  text: {
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 45,
    color: '#FFFAFA',
  },
  
  icon: {
    width: 55,
    height: 55,
    resizeMode: 'contain',
  }
});
