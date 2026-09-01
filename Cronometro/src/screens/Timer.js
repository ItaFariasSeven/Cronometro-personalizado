import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';
import {useFonts} from 'expo-font';
import { useState } from 'react';
import Footer from '../components/Footer';
import ButtonStart from '../components/ButtonStart';

export default function Timer({navigation}) {
// Cria a constante que armazena a/as fonte(s)
    const [fontsLoaded] = useFonts({
    'iInstead': require('../../assets/fonts/iInstead.ttf')
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
        <View style={styles.timer}>
            <Text style={styles.title}>
                Timer
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
    },

    timer:{
        display: 'flex',
        position:'absolute',
        top: 30,
        left: 5,
        width: 150,
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
    top: 150,
    justifyContent: 'center'
      
    },
    
  zeros: {
    color: '#FFFAFA',
    fontSize: 60,
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
    bottom: 190
  }
});
