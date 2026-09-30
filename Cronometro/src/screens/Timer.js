import { useAudioPlayer } from 'expo-audio';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Image, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import {useFonts} from 'expo-font';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import ButtonStart from '../components/ButtonStart';
import ButtonPause from '../components/ButtonPause';
import ButtonReset from '../components/ButtonReset';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Timer({navigation}) {
    const player = useAudioPlayer(require('../../assets/sounds/notificacao.mp3'));
// Cria a constante que armazena a/as fonte(s)
    const [fontsLoaded] = useFonts({
    'iInstead': require('../../assets/fonts/iInstead.ttf')
    })
    
    // armazena os números 
    const [numero, setNumero] = useState("");
    
    // controlar a repetição do Timer
    const [repeticoes, setRepeticoes] = useState("1");
    const [intervalo, setIntervalo] = useState("0");
    
    const [tempoRestante, setTempoRestante] = useState(0);
    const [repeticoesRestantes, setRepeticoesRestantes] = useState(0);
    const [rodandoTimer, setRodandoTimer] = useState(false);
    const [fase, setFase] = useState("parado");
    
    const [duracaoTrabalho, setDuracaoTrabalho] = useState(0);
    const [duracaoIntervalo, setDuracaoIntervalo] = useState(0);

    function tocarSom() {
        try {
            player.seekTo(0); // garante que toque do início
            player.play();
        } catch (error) {
            console.log("Erro ao tocar som:", error);
        }
    }
    
    // Função que no cronômetro adiciona os números digitados
    function adicionaNumero(valor) {        
        if (numero.length + valor.length <= 6) {
            setNumero(numero + valor);
        }
    }
    // Função que no cronômetro apaga os números digitados
    function apagarNumero() {
        const novoNumero = numero.slice(0, -1)
        setNumero(novoNumero);
    }

    function converterParaSegundos(numero) {
        const tempo = numero.padStart(6, "0");
        
        const horas = Number(tempo.slice(0, 2));
        const minutos = Number(tempo.slice(2, 4));
        const segundos = Number(tempo.slice(4, 6));

        return (
            horas * 3600 +
            minutos * 60 +
            segundos
        )
    }

    function formatarTempo(totalSegundos) {
        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;
        return `${String(horas).padStart(2, "0")}h ${String(minutos).padStart(2, "0")}m ${String(segundos).padStart(2, "0")}s`
    }

    function iniciarTimer() {
        const trabalho = converterParaSegundos(numero);
        const quantidadeRepeticoes = Number(repeticoes);
        const pausa = Number(intervalo);

        if (trabalho <=0 || quantidadeRepeticoes <=0) {
            return;
        }
        setDuracaoTrabalho(trabalho);
        setDuracaoIntervalo(pausa);
        setTempoRestante(trabalho);
        setRepeticoesRestantes(quantidadeRepeticoes);
        setFase("trabalho");
        setRodandoTimer(true)
    }

    function continuarTimer() {
        setRodandoTimer(true)
    }

    useEffect(() => {
        if (fase === "finalizado") {
            salvarHistorico();
            tocarSom();
        }
    }, [fase]);

    useEffect(() => {
        if(!rodandoTimer){
            return;
        }
        const intervaloContagem = setInterval(() => {
            setTempoRestante(tempoAnterior => {
                if(tempoAnterior > 1) {
                    return tempoAnterior - 1;
                }
                if (fase === "trabalho") {
                    if (repeticoesRestantes <= 1) {
                        setRepeticoesRestantes(0);
                        setRodandoTimer(false);
                        setFase("finalizado");
                        return 0;
                    }
                    if(duracaoIntervalo > 0){
                        setFase("intervalo");
                        return duracaoIntervalo;
                    }
                    setRepeticoesRestantes(anterior => anterior -1);
                    return duracaoTrabalho;
                }
                if (fase === "intervalo") {
                    setRepeticoesRestantes(anterior => anterior -1);
                    setFase("trabalho");
                    return duracaoTrabalho;
                }
                return 0;
            });
            
        }, 1000);
        return () => clearInterval(intervaloContagem);
    }, [
        rodandoTimer, fase, repeticoesRestantes, duracaoTrabalho,duracaoIntervalo
    ]
)

async function salvarHistorico() {
    const novoRegistro = {
        id: Date.now().toString(),
        data: new Date().toLocaleDateString(),
        tempoTrabalho: duracaoTrabalho,
        repeticoes: Number(repeticoes),
        intervalo: duracaoIntervalo,
        status: "finalizado"
    };
    const historicoSalvo = await AsyncStorage.getItem("historicoTimer");

    const historicoAtual = historicoSalvo ? JSON.parse(historicoSalvo) : [];

    const novoHistorico = [ ...historicoAtual, novoRegistro ];

    await AsyncStorage.setItem("historicoTimer", JSON.stringify(novoHistorico))
}
useEffect(() => {
    if (fase === "finalizado") {
        salvarHistorico();
    }
}, [fase]);

const [modalInfo, setModalInfo] = useState(false);

    
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

        {/* Início do Modal */}
        {/* Botão para abrir Modal */}
        <TouchableOpacity 
            style={styles.modalContainer}
            onPress={() => setModalInfo(true)}
        >
            <Image
                source={require('../../assets/icons/circle-question.png')}
                style={styles.QuestionIcon}
            />
        </TouchableOpacity>

        {/* Modal */}
        <Modal 
            visible={modalInfo}
            transparent={true}
            animationType='fade'
            onRequestClose={() => setModalInfo(false)}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalComplete}>
                    <TouchableOpacity
                        sytle={styles.exitButton}
                        onPress={() => setModalInfo(false)}
                    >
                        <Image
                            source={require('../../assets/icons/button-exit.png')}
                            style={styles.exitModal}
                        />
                    </TouchableOpacity>
                    <Text style={styles.textModal}>
                        Instruções de como usar o Timer:
                    </Text>
                    <Text style={styles.textModalInstruction}>
                        1. Selecione a quantidade de repetições que deseja realizar.
                    </Text>
                    <Text style={styles.textModalInstruction}>
                        2. Informe quantos segundos de intervalo deseja entre as repetições.
                    </Text>
                    <Text style={styles.textModalInstruction}>
                        3. No teclado numérico, informe o tempo da atividade e clique em iniciar.
                    </Text>
                    <Text style={styles.textModalInstruction}>
                        O Timer contará o tempo da atividade. Ao finalizar, iniciará o intervalo. Depois do intervalo, uma repetição será descontada e o próximo ciclo começará.
                    </Text>
                </View>
            </View>
        </Modal>
        {/* Fim do Modal */}

        <View style={styles.oclock}>
            <Text style={styles.zeros}>
                <Text>{fase === "parado"
                    ? formatarTempo(converterParaSegundos(numero)) : fase === "trabalho"
                        ? formatarTempo(tempoRestante) : formatarTempo(0)}
                </Text>
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

        {/* <View style={styles.containerInput}>
                <TextInput style={styles.inputRepeticao}
                    placeholder="Repetição"
                    keyboardType="numeric"
                    value={repeticoes}
                    onChangeText={setRepeticoes}
                    />
                
                
                <TextInput style={styles.inputIntervalo}
                    placeholder="Intervalo"
                    keyboardType="numeric"
                    value={intervalo}
                    onChangeText={setIntervalo}
                />
                
                <TextInput style={styles.inputContagem}
                    placeholder="Contagem"
                    value={String(repeticoesRestantes)}
                    editable={false}
                />

                {fase === "intervalo" && (
                    <View style={styles.conatinerIntervaloText}>
                        <Text style={styles.textIntervalo}>Intervalo:</Text>

                        <Text style={styles.textIntervaloZeros}>
                            {formatarTempo(tempoRestante)}
                        </Text>
                    </View>
                )}

            </View> */}

            <View style={styles.containerInput}>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Repetições</Text>
                    <TextInput
                        style={styles.inputRepeticao}
                        keyboardType="numeric"
                        value={repeticoes}
                        onChangeText={setRepeticoes}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Intervalo (s)</Text>
                    <TextInput
                        style={styles.inputIntervalo}
                        keyboardType="numeric"
                        value={intervalo}
                        onChangeText={setIntervalo}
                    />
                </View>

                <View style={styles.inputGroupContagem}>
                    <Text style={styles.inputLabel}>Restantes</Text>
                    <TextInput
                        style={styles.inputContagem}
                        value={String(repeticoesRestantes)}
                        editable={false}
                    />
                </View>

                {fase === "intervalo" && (
                    <View style={styles.conatinerIntervaloText}>
                        <Text style={styles.textIntervalo}>Intervalo:</Text>
                        <Text style={styles.textIntervaloZeros}>
                            {formatarTempo(tempoRestante)}
                        </Text>
                    </View>
                )}
            </View>

        <View style={styles.buttonStart}>
            {rodandoTimer ? (
                <View style={styles.buttonPauseReset}>
                    <ButtonPause style={styles.buttonPause} 
                        onPress={() => {
                            setRodandoTimer(false);  
                    }}
                    />
                    <ButtonReset style={styles.buttonReset} 
                        onPress={() => { 
                            setRodandoTimer(false) ;
                            setTempoRestante(0);
                            setRepeticoesRestantes(0);
                            setFase("parado");    
                    }}
                    />
                </View>
            ):(
                <ButtonStart 
                    onPress={fase === "parado"
                        ? iniciarTimer : continuarTimer}
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
        bottom: 65

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
    top: 100,
    justifyContent: 'center'
    
},
    
  zeros: {
    color: '#FFFAFA',
    fontSize: 55,
    fontWeight:'bold',
    
},
  conatinerIntervaloText:{
      flexDirection:'row',
      position:'absolute',
      top: 100,
      justifyContent: 'center',
      alignItems:'center',
      textAlign:'center',
      gap:15,
    },
    textIntervalo:{
        color: '#FFFAFA',
        fontSize: 30,
        fontWeight:'bold',
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        paddingLeft: 25
    },
    textIntervaloZeros:{
        color: '#FFFAFA',
        fontSize: 30,
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        
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
  modalContainer:{
      position:'absolute',
      top:'5%',
      right:'6%',
    },
    QuestionIcon:{
        width:55,
        height:55,
    },
    exitModal:{
        width:60,
        height:60,
        position:'absolute',
        bottom:2,
        left:285
  },
  exitButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 2,
},
  modalBackground:{
    flex: 1,
    backgroundColor:'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
},
modalComplete:{
    width:'85%',
    backgroundColor: '#4564A8',
    left: '2%',
    bottom:'18%',
    borderRadius:10,
    paddingHorizontal: 25,
    paddingBottom: 25,
    paddingTop: 60,
    position: 'relative'
    },
    textModal:{
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
  }, 
  textModalInstruction:{
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 25,
    marginBottom: 12,
  },
  buttonStart: {
    position: 'absolute',
    bottom: 130
  },
  buttonPause:{

  },
  containerInput:{
      flexDirection:'row',
      width:400,
      height:50,
      bottom: 60,
      alignItem: 'flex-start',
    },
    inputGroup: {
        width: 160,
        alignItems: 'center',
    },
    inputGroupContagem: {
        width: 80,
        alignItems: 'center',
    },
    inputLabel: {
        color: '#FFFAFA',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    inputRepeticao: {
        backgroundColor: '#FFFAFA',
        width:'100%',
        height: 70,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        fontWeight:'bold',
        textAlign:'center',
        fontSize:30
    },
    inputIntervalo:{
        backgroundColor: '#FFFAFA',
        width:'100%',
        height: 70,
        fontWeight:'bold',
        textAlign:'center',

        borderWidth: 3,
        borderColor: '#4747D4',
        
        borderTopWidth: 0,
        borderBottomWidth: 0,
        
        borderLeftWidth: 3,
        borderLeftColor: '#4747D4',

        fontSize:30
    },
    inputContagem:{
        height: 70,
        backgroundColor: '#4564A8',
        width:'100%',
        textAlign:'center',
        textAlignVertical: 'center',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        fontWeight:'bold',
        fontSize:30
    },
    addCronometro:{
        width: 60,
        height: 60,
        resizeMode: 'contain',
        right: 190,
        top: 92.5
    },
    buttonStart: {
        position: 'absolute',
        bottom: 140,
    },
    buttonPauseReset:{
        flexDirection:'row',
        gap: 10
    },
    buttonReset:{

    }
});
