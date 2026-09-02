import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";
import { useState, useEffect } from 'react';
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
    
        
        useEffect(() => {
            let intervalo;
            
            if (rodando) {
                intervalo = setInterval(() => {
                    setTempo((tempoAnterior) => tempoAnterior + 1);
                }, 1000);
            }
            return () => clearInterval(intervalo);
        }, [ rodando ]);
        
        const minutes = Math.floor(timer / 60);
        const seconds = timer % 60;
        const minutesformat = String(minutes).padStart(2, "0");
        const secondsformat = String(seconds).padStart(2, "0");

        //Funçaõ de substituir botão de iniciar pelo de pausar e redefinir
        const [clicado, setClicado] = useState(false);
        const [clicadoNovamente, setClicadoNovamente] = useState(true);
            
        if(!fontsLoaded){
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
                    {minutesformat} : {secondsformat}
                </Text>
            </View>
            
            <View style={styles.buttonStart}>
                {rodando ? (
                    <View style={styles.buttonPauseReset}>
                        <ButtonPause style={styles.buttonPause} 
                            onPress={() => {
                                setRodando(false);  
                        }}
                        />
                        <ButtonReset style={styles.buttonReset} 
                            onPress={() => { 
                                setRodando(false) ;
                                setTempo(0);    
                        }}
                        />
                    </View>
                ):(
                    <ButtonStart 
                        onPress={() => {
                            setRodando(true) ; 
                    }}
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