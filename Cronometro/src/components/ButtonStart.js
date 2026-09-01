import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font';


export default function ButtonStart() {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf')
        })
        if(!fontsLoaded){
            return null;
        }
    return (
        <View style={styles.container}>
             <TouchableOpacity>
                <Text style={styles.text}>
                    Iniciar
                </Text>
            </TouchableOpacity>
        </View>
    
    );
}

const styles = StyleSheet.create({
    container :{
        backgroundColor: '#00CDDB',
        padding: 13,
        width: 300,
        borderRadius: 35,
    },
    text: {
        color: '#FFFAFA',
        fontSize: 35,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'iInstead'
    }
})