
import React, { useEffect, useState } from 'react';
import { View, ImageBackground } from 'react-native';
import { Button, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Message } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime, auth } from '../../configs/firebaseConfig';

export const DetailMessageScreen = () => {
    //hook para capturar los parametros mediante navegación
    const route = useRoute();
    //@ts-ignore
    const { message } = route.params;
    //console.log(message);

    //hook useState: manipular el formulario
    const [editFormMessage, setEditFormMessage] = useState<Message>({
        id: '',
        to: '',
        subject: '',
        message: ''
    })

    //hook useEffect: Mostrar la información recibida en el formulario
    useEffect(() => {
        setEditFormMessage(message)
    }, [])

    //hook navegación
    const navigation = useNavigation();

    //Funición: cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setEditFormMessage({ ...editFormMessage, [key]: value })
    }

    //Función actualizar la data del mensaje
    const handlerUpdateMessage = async () => {
        //1. Referencia a al BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' +  auth.currentUser?.uid +'/'+ editFormMessage.id)
        //2. Actualizar data
        await update(dbRef, { message: editFormMessage.message })
        navigation.goBack();
    }

    //Función eliminar la data del mensaje
    const handlerDeleteMessage = async () => {
        //1. Referencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' +  auth.currentUser?.uid +'/'+ editFormMessage.id)
        //2. Eliminar data
        await remove(dbRef);
        navigation.goBack();
    }

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/c2/23/dd/c223dda08c1cb10fb942a0bb5506884f.jpg' }}
            style={[styles.backgroundImageDetail, { opacity: 0.7 }]}
        >
            <View style={styles.rootDetail2}>
                <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Home' }))}
                    style={styles.avatarLogOut}
                />
                <View>
                    <Text style={styles.headlineSmall}>Asunto:</Text>
                    <Text style={styles.bodyText}>{editFormMessage.subject}</Text>
                    <Divider style={styles.divider} />
                </View>
                <View>
                    <Text style={styles.bodyLarge}>Para:</Text>
                    <Text style={styles.bodyText}>{editFormMessage.to}</Text>
                    <Divider style={styles.divider} />
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.textLabel}>Mensaje</Text>
                    <TextInput
                        value={editFormMessage.message}
                        onChangeText={(value) => handlerSetValues('message', value)}
                        multiline={true}
                        numberOfLines={5}
                        style={styles.input}
                        placeholderTextColor="#ffffff80"
                        theme={{ colors: { text: 'white', placeholder: '#ffffff', primary: '#ffffff' } }}
                        outlineColor="rgba(255, 255, 255, 0.5)"
                        activeOutlineColor="#ffffff"
                    />
                </View>
                <Button
                    mode='contained'
                    icon='email-sync'
                    onPress={handlerUpdateMessage}
                    style={styles.buttonDetailAdd}>
                    Actualizar
                </Button>
                <Button
                    mode='contained'
                    icon='email-remove'
                    onPress={handlerDeleteMessage}
                    style={styles.buttonDetailDelete}>
                    Eliminar
                </Button>
            </View>
        </ImageBackground>
    );
}

