import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font';


export default function ButtonPause({ onPress }) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })
        if(!fontsLoaded){
            return null;
        }
    return (

            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <Text style={styles.text}>
                        Pausar
                    </Text>
                </TouchableOpacity>
            </View>

    );
}

const styles = StyleSheet.create({
    container :{
        backgroundColor: '#EF0000',
        padding: 13,
        width: 175,
        borderRadius: 35,
        // right:15
    },
    text: {
        color: '#FFFAFA',
        fontSize: 30,
        textAlign: 'center',
        justifyContent: 'center',
        fontFamily: 'iInstead'
    }
})