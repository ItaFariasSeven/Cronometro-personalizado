import { TouchableOpacity, View, Text, StyleSheet, Image, TextInput } from "react-native";
import {useFonts} from 'expo-font';
import ButtonStart from "../components/ButtonStart";
import Footer from "../components/Footer";
import { useState } from 'react';


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
                    {horas}h {minutos}m {segundos}s
                </Text>
            </View>
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("1")}>
                    <Text style={styles.text}>
                        1
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("2")}>
                    <Text style={styles.text}>
                        2
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("3")}>
                    <Text style={styles.text}>
                        3
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("4")}>
                    <Text style={styles.text}>
                        4
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("5")}>
                    <Text style={styles.text}>
                        5
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("6")}>
                    <Text style={styles.text}>
                        6
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("7")}>
                    <Text style={styles.text}>
                        7
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("8")}>
                    <Text style={styles.text}>
                        8
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("9")}>
                    <Text style={styles.text}>
                        9
                    </Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("00")}>
                    <Text style={styles.text}>
                        00
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => adicionaNumero("0")}>
                    <Text style={styles.text}>
                        0
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => apagarNumero()}>
                    <Image
                        source={require('../../assets/images/delete.png')}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerInput}>
                <TextInput style={styles.inputRepeticao}
                    placeholder="Repetições"
                    keyboardType="numeric"
                    />
                
                
                <TextInput style={styles.inputIntervalo}
                    placeholder="Intervalo"
                    keyboardType="numeric"
                />
                
                <TextInput style={styles.inputContagem}
                    placeholder="Contagem"
                    value=''
                />

                <TouchableOpacity>
                <Image 
                    source={require('../../assets/images/addCronometro.png')}
                    style={styles.addCronometro}
                />
                </TouchableOpacity>
            </View>
            
            <View style={styles.buttonStart}>
                <ButtonStart></ButtonStart>
            </View>


            <Footer navigation={navigation}></Footer>    
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
    top: 110,
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
    bottom: 120
},
  containerInput:{
      flexDirection:'row',
      width:330,
      height:50,
      bottom: 40,
    },
    inputRepeticao: {
        backgroundColor: '#FFFAFA',
        width:110,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        fontWeight:'bold'
    },
    inputIntervalo:{
        backgroundColor: '#FFFAFA',
        width:110,
        fontWeight:'bold',

        borderWidth: 3,
        borderColor: '#4747D4',

        borderTopWidth: 0,
        borderBottomWidth: 0,

        borderLeftWidth: 3,
        borderLeftColor: '#4747D4',
    },
    inputContagem:{
        height: 95,
        backgroundColor: '#FFFAFA',
        width:110,
        textAlign:'center',
        textAlignVertical: 'top',
        paddingTop: 17,
        borderBottomLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight:'bold'
    },
    addCronometro:{
        width: 60,
        height: 60,
        resizeMode: 'contain',
        right: 85,
        top: 92.5
    }
})