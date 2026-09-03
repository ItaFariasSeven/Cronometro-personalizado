import { TouchableOpacity, View, Text, StyleSheet, Image, FlatList } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";




export default function Historico({navigation}) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })

        const [historico, setHistorico] = useState([])

        async function carregarHistorico() {
            const dados = await AsyncStorage.getItem("historicoTimer");

            if (dados) {
                setHistorico(JSON.parse(dados));
            }
        }

        useEffect(() => {
            carregarHistorico();
        }, []);

        function formatarTempo(totalSegundos) {

            const horas = Math.floor(totalSegundos / 3600);

            const minutos = Math.floor(
                (totalSegundos % 3600) / 60
            );
        
            const segundos = totalSegundos % 60;
        
            return `${String(horas).padStart(2, "0")}h ${String(minutos).padStart(2, "0")}m ${String(segundos).padStart(2, "0")}s`;
        }
        
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

            <View style={styles.containerInfos}>
                
                <FlatList 

                    data={historico}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                    
                        <View style={styles.listInfos}>
                            <Text style={styles.text}>
                                {formatarTempo(item.tempoTrabalho)}
                            </Text>
                    
                            <Text style={styles.text}>
                                Contagem: {item.repeticoes}
                            </Text>
                    
                            <Text style={styles.text}>
                                {item.data}
                            </Text>
                        </View>

                    )}
                />
            </View>

        </View>
    
    );
}

const styles = StyleSheet.create({
    geralContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000080',
    },
    timer:{
        display: 'flex',
        position:'absolute',
        top: 30,
        left: 5,
        width: 180,
    },
    title: {
        color: '#FFFAFA',
        fontSize: 40,
        fontFamily:'monospace',
        fontWeight: 'bold'
    },
    containerInfos:{
        display:'flex',
        flexDirection:'row',
        // backgroundColor: '#4747D4',
        width:'85%'
    },
    listInfos:{
        flexDirection:'row',
        backgroundColor: '#4747D4',
        padding: 10,
        alignItems:'center',
        // justifyContent:'center',
        gap: 10,
        marginBottom: 8,
        borderRadius:8
    },
    text:{
        fontSize: 17.5,
        fontFamily:'monospace',
        fontWeight: 'bold',
        color: '#FFFAFA',

    }
})