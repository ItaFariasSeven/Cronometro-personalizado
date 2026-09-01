import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";


export default function Historico({navigation}) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })
        if(!fontsLoaded){
            return null;
        }
    return (

            <View style={styles.container}>
                <TouchableOpacity>
                    <Text style={styles.text}>
                        Redefinir
                    </Text>
                </TouchableOpacity>
            </View>
    
    );
}

const styles = StyleSheet.create({
    container :{
        backgroundColor: '#FF6868',
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