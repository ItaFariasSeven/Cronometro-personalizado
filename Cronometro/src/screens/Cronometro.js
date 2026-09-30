import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";
import { useState, useEffect, useRef } from 'react';
import ButtonPause from "../components/ButtonPause";
import ButtonReset from "../components/ButtonReset";


export default function Cronometro({navigation}) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })
    // Função que no cronômetro armazena os números 
    const [numero, setNumero] = useState("");
            
    // Função que no cronômetro adiciona os números digitados
    function adicionaNumero(valor) {        
        if (numero.length < 6) {
            setNumero(numero + valor);
            }
        }
        
        // Função que preenche os 0's até chegar em 6
        const tempo = numero.padStart(6, "0");
        // Função para as Horas "h", Minutos "m", e Segundos "s"
        const horas = tempo.slice(0, 2);
        const minutos = tempo.slice(2, 4);
        const segundos = tempo.slice(4, 6);
    
        function apagarNumero() {
            const novoNumero = numero.slice(0, -1)
            setNumero(novoNumero);
        }

        // Função de play do Cronêmetro
        const [timer, setTempo] = useState(0);
        const [rodando, setRodando] = useState(false);
    
        const [elapsed, setElapsed] = useState(0); // em milissegundos

        const startTimeRef = useRef(null); // timestamp de quando começou/retomou
        const elapsedBeforePauseRef = useRef(0); // tempo acumulado antes da pausa atual
        
        useEffect(() => {
            let intervalo;
            
            if (rodando) {
                startTimeRef.current = Date.now() 

                intervalo = setInterval(() => {
                    const agora = Date.now();
                    const decorrido = elapsedBeforePauseRef.current + (agora - startTimeRef.current);
                    setElapsed(decorrido);
            }, 10);
            }
            return () => clearInterval(intervalo);
        }, [rodando]);

        function iniciar() {
            setRodando(true);
        }

        function pausar() {
            // salva o tempo acumulado até agora antes de pausar
            elapsedBeforePauseRef.current = elapsed;
            setRodando(false);
        }

        function resetar() {
            setRodando(false);
            elapsedBeforePauseRef.current = 0;
            startTimeRef.current = null;
            setElapsed(0);
        }

        // Formatação: minutos, segundos e centésimos
        const totalCentesimos = Math.floor(elapsed / 10);
        const totalSegundos = Math.floor(totalCentesimos / 100);
        const minutes = Math.floor(totalSegundos / 60);
        const seconds = totalSegundos % 60;
        const centesimos = totalCentesimos % 100;

        const minutesformat = String(minutes).padStart(2, "0");
        const secondsformat = String(seconds).padStart(2, "0");
        const centesimosformat = String(centesimos).padStart(2, "0");

        if (!fontsLoaded) {
            return null;
        }
    return (
        <View style={styles.geralContainer}>
            <View style={styles.cronometro}>
                <Text style={styles.title}>
                    Cronômetro
                </Text>
            </View>
            
            <View style={styles.oclock}>
                <Text style={styles.zeros}>
                    {minutesformat} : {secondsformat} : {centesimosformat}
                </Text>
            </View>
            
            <View style={styles.buttonStart}>
                {rodando ? (
                    <View style={styles.buttonPauseReset}>
                        <ButtonPause style={styles.buttonPause} 
                            onPress={pausar}
                        />
                        <ButtonReset style={styles.buttonReset} 
                            onPress={resetar}
                        />
                    </View>
                ):(
                    <ButtonStart 
                        onPress={iniciar}
                    />
                )}
            </View>


        </View>
    
    );
}

const styles = StyleSheet.create({
    geralContainer: {
        flex: 1,
        backgroundColor: '#000080',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        gap: 15,
        flexDirection: 'row',
        marginBottom: 8,
        bottom: 50
    },

    cronometro:{
        position:'absolute',
        top: 30,
        left: 5,
        width: 350,
        backgroundColor: '#000080',
},

  title: {
    color: '#FFFAFA',
    fontSize: 40,
    fontFamily:'monospace',
    fontWeight: 'bold'
},

  oclock: {
    display: 'flex',
    position:'absolute',
    top: 210,
    justifyContent: 'center'
      
    },
    
  zeros: {
    color: '#FFFAFA',
    fontSize: 55,
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
},
    buttonStart: {
        position: 'absolute',
        bottom: 200,
    },
    buttonPauseReset:{
        flexDirection:'row',
        gap: 10
    },
    buttonReset:{

    }
})