import { TouchableOpacity, View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import {useFonts} from 'expo-font';

export default function Footer({ state, navigation }) {
    const [fontsLoaded] = useFonts({
        'iInstead': require('../../assets/fonts/iInstead.ttf'),
        'gotham': require('../../assets/fonts/gothamknights.ttf')
        })

    const rotaAtual = state.routes[state.index].name;

    // const rotaAtual = useNavigationState(
    //     state => state.routes[state.index].name
    // );

        if(!fontsLoaded){
            return null;
        }
    return (
        <View style={styles.container}>
        
                { rotaAtual == "Timer" && (
                <ImageBackground
                    source={require('../../assets/icons/play-solid.png')}
                    resizeMode="cover"
                    style={styles.backTimer}
                />
                )}
             <TouchableOpacity 
                 style={styles.space} 
                 onPress={() => {
                    navigation.navigate("Timer");
                }} >
                <Image 
                    source={require('../../assets/icons/navTimer.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Timer
                </Text>
            </TouchableOpacity>


             { rotaAtual == "Cronometro" && (
                <ImageBackground
                    source={require('../../assets/icons/play-solid.png')}
                    resizeMode="cover"
                    style={styles.backCronometro}
                />
                )}
             <TouchableOpacity 
             style={styles.space} 
             onPress={() => {
                navigation.navigate("Cronometro")
             }}>
                <Image 
                    source={require('../../assets/icons/navCronometro.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Cronômetro
                </Text>
            </TouchableOpacity>


             { rotaAtual == "Alarme" && (
                <ImageBackground
                    source={require('../../assets/icons/play-solid.png')}
                    resizeMode="cover"
                    style={styles.backHistorico}
                />
                )}
             <TouchableOpacity 
             style={styles.space} 
             onPress={() => {
                navigation.navigate("Historico")
                }}>
                <Image 
                    source={require('../../assets/icons/navHistorico.png')}
                    style={styles.icon}
                />
                <Text style={styles.text}>
                    Histórico
                </Text>
            </TouchableOpacity>

        </View>
    
    );
}

const styles = StyleSheet.create({
    container :{
        display: 'flex',
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        paddingBottom: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#4564A8'
    },
    text: {
       textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
       color: "#FFFFFF",
       fontFamily: 'monospace',
       fontWeight: 'bold'
    },
    icon:{
        width: 60,
        height: 60
    },
    space: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backTimer:{
        width: 180,
        height: 180,
        position: 'absolute',
        bottom: -15,
        left: -21.8,
        transform:[{
            rotate: '90deg'
        }]
    },
    backCronometro:{
        width: 180,
        height: 180,
        position: 'absolute',
        bottom: -15,
        alignItems:'center',
        zIndex: 0,
        transform:[{
            rotate: '90deg'
        }]
    },
    backHistorico:{
        width: 180,
        height: 180,
        position: 'absolute',
        bottom: -15,
        right: -21.8,
        zIndex: 0,
        transform:[{
            rotate: '90deg'
        }]
    }
})