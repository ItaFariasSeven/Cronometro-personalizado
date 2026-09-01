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
        <View style={styles.geralContainer}>
            <View style={styles.timer}>
                <Text style={styles.title}>
                    Histórico
                </Text>
            </View>

            <View>
                <Text>Histórico</Text>
            </View>

            <Footer navigation={navigation}></Footer>    
        </View>
    
    );
}

const styles = StyleSheet.create({
    geralContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    timer:{
        display: 'flex',
        position:'absolute',
        top: 30,
        left: 5,
        width: 180,
        backgroundColor: '#000080',
    },
    title: {
        color: '#FFFAFA',
        fontSize: 40,
        fontFamily:'monospace',
        fontWeight: 'bold'
}
})