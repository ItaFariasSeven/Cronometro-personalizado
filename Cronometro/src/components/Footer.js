import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font';


export default function Footer({navigation}) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })
        if(!fontsLoaded){
            return null;
        }
    return (
        <View style={styles.container}>
             <TouchableOpacity style={styles.space} onPress={() => navigation.navigate("Timer")}>
                <Image 
                    source={require('../../assets/icons/navTimer.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Timer
                </Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.space} onPress={() => navigation.navigate("Cronometro")}>
                <Image 
                    source={require('../../assets/icons/navCronometro.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Cronômetro
                </Text>
            </TouchableOpacity>

             <TouchableOpacity style={styles.space} onPress={() => navigation.navigate("Historico")}>
                <Image 
                    source={require('../../assets/icons/navHistorico.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Histórico
                </Text>
            </TouchableOpacity>
        </View>
    
    );
}

const styles = StyleSheet.create({
    container :{
        display: 'flex',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#4564A8'
    },
    text: {
       textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
       color: "#FFFFFF",
       fontFamily: 'monospace',
       fontWeight: 'bold'
    },
    icon:{
        width: 60,
        height: 60
    },
    space: {
        textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
    }
})