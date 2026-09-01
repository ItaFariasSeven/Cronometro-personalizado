import { TouchableOpacity, View, Text, StyleSheet, Image } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";
import { useState } from 'react';



export default function Historico({navigation}) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })
        
        // Função que no cronômetro armazena os números 
        const [numero, setNumero] = useState("");
    
        // Função que preenche os 0's até chegar em 6
        const tempo = numero.padStart(6, "0");
        // Função para as Horas "h", Minutos "m", e Segundos "s"
        const horas = tempo.slice(0, 2);
        const minutos = tempo.slice(2, 4);
        const segundos = tempo.slice(4, 6);
        
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

            <View style={styles.containerHistorico}>
                <Text style={styles.zeros}>
                    {horas}h {minutos}m {segundos}s
                </Text>

                <View>
                    <Text style={styles.contagem}>
                        Contagem
                    </Text>
                    <Text style={styles.contagem0}>
                        0
                    </Text>
                </View>

                <Text style={styles.date}>
                    Data
                </Text>
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
    containerHistorico:{
        flexDirection:'row',
        backgroundColor: '#4747D4',
        padding: 10,
        borderRadius: 8,
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
    },
    zeros: {
        color: '#FFFAFA',
        fontSize: 25,
        fontWeight:'bold',
    },
    contagem:{
        color: '#FFFAFA',
        fontSize: 20,
        fontWeight:'bold',
        paddingEnd: 20,
        paddingStart: 20,
        flexDirection:'column',
    },
    contagem0:{
        color: '#FFFAFA',
        fontSize: 20,
        fontWeight:'bold',
        textAlign: 'center'
    },
    date:{
        color: '#FFFAFA',
        fontSize: 15,
        fontWeight:'bold',
    },
})