import React, { useEffect, useState } from 'react';
import { FlatList, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { MessageCardComponent } from './components/MessageCardComponent';
import { NewMessageComponent } from './components/NewMessageComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../theme/styles'; // Asegúrate de importar tus estilos

// Interface - formulario perfil
interface FormUser {
    name: string;
}

// Interface - Message
export interface Message {
    id: string;
    to: string;
    subject: string;
    message: string;
}

export const HomeScreen = () => {
    // hook useState: manipular el formulario del perfil de usuario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    // hook useState: capturar la data del usuario logueado
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

    // hook useState: lista de mensajes
    const [messages, setMessages] = useState<Message[]>([]);

    // hook useState: puntaje de "Química"
    const [overallScore, setOverallScore] = useState<number | null>(null);

    // useEffect: capturar la data del usuario autenticado
    useEffect(() => {
        // Obtener la data del usuario autenticado
        setUserAuth(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" });
        // Función para listar mensajes
        getAllMessages();
        getOverallScore(); // Llamar la función para obtener el puntaje de "Química"
    }, []);

    // hook useState: mostrar u ocultar el modal del perfil
    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);

    // hook useState: mostrar u ocultar el modal del message
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false);

    // hook navegación
    const navigation = useNavigation();

    // Función para cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value });
    }

    // Función actualizar la data del usuario autenticado
    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        });
        setShowModalProfile(false);
    }

    // Función para acceder a la data
    const getAllMessages = () => {
        // Refrencia a la BDD - tabla
        const dbRef = ref(dbRealTime, 'messages/' + auth.currentUser?.uid);
        // Consultamos a la BDD
        onValue(dbRef, (snapshot) => {
            // Capturar la data
            const data = snapshot.val(); // formato esperado
            // Controlar que la data tenga información
            if (!data) return;
            // Obtener keys de los mensajes
            const getKeys = Object.keys(data);
            // Crear un arreglo para almacenar los mensajes de la BDD
            const listMessages: Message[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listMessages.push(value);
            });
            // Almacenar en el arreglo del hook
            setMessages(listMessages);
        });
    }

    // Función para obtener el puntaje de "Química" desde Firebase
    const getOverallScore = () => {
        if (auth.currentUser) {
            const scoreRef = ref(dbRealTime, `users/${auth.currentUser.uid}/overallScore`);
            onValue(scoreRef, (snapshot) => {
                const score = snapshot.val();
                if (score !== null) {
                    setOverallScore(score);
                }
            });
        }
    }

    // Función para cerrar sesión
    const handlerSignOut = async () => {
        await signOut(auth);
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
    }

    return (
        <>
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/564x/08/d7/be/08d7be00d40aac61f47717b10fbb32a8.jpg' }}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.4 }}
            >
                <View style={styles.routeHome}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9U8oJgaoX_sKBGkRSLz-ZJhD7Pbwd3uwMIA&s' }} // Reemplaza con la URL de tu imagen
                            style={styles.iconImageProfile}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.labelLargeGoats}>THE GOATS FC</Text>
                            <Text style={styles.labelLarge}>Bienvenido</Text>
                            <Text style={styles.bodySmall}>{userAuth?.displayName}</Text>
                            <Text style={styles.bodySmall}>Química: {overallScore !== null ? `${overallScore}/100` : 'Cargando...'}</Text>
                        </View>
                        <Image
                            source={{ uri: 'https://thumbs.dreamstime.com/b/modern-mountain-goat-head-logo-creative-concept-vector-format-scalable-to-any-size-modern-mountain-goat-head-logo-creative-193184152.jpg' }} 
                            style={styles.iconImage}
                        />
                    </View>
                    <Text style={styles.textJuego}>Personaliza tu equipo de GOATS</Text>
                    <TouchableOpacity
                        style={styles.buttonJuego}
                        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Juego', params: { username: formUser.name } }))}
                    >
                        <Text style={styles.buttonText}>
                            <MaterialIcons name="goat" size={20} style={styles.iconCabra} /> Que empiece el Partido <MaterialIcons name="goat" size={20} style={styles.iconCabra} />
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.textContainerCards}>Mensajes</Text>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => <MessageCardComponent message={item} />}
                        keyExtractor={item => item.id}
                    />

                </View>
                <IconButton
                    size={40} icon="account-edit" style={styles.avatarLogOut}
                    onPress={() => setShowModalProfile(true)}
                />
                <IconButton
                    size={40} icon="plus" style={styles.avatarLogOut}
                    onPress={() => setShowModalMessage(true)}
                />
                <IconButton
                    icon="logout"
                    size={40}
                    style={styles.avatarLogOut}
                    onPress={handlerSignOut}
                />

                <Portal>
                    <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
                        <View style={styles.headerModal}>
                            <Text style={styles.ModalText}>Mi Perfil</Text>
                            <View style={styles.iconEndModal}>
                                <IconButton
                                    icon='close-circle-outline'
                                    size={30}
                                    onPress={() => setShowModalProfile(false)} />
                            </View>
                        </View>
                        <Divider />
                        <TextInput
                            mode='flat'
                            style={styles.textInput}
                            theme={{ colors: { placeholder: '#333', text: '#333', primary: '#333', background: 'transparent' }, roundness: 10 }}
                            label='Nombre'
                            value={formUser.name}
                            onChangeText={(value) => handlerSetValues('name', value)} />
                        <TextInput
                            mode='flat'
                            style={styles.textInput}
                            theme={{ colors: { placeholder: '#333', text: '#333', primary: '#333', background: 'transparent' }, roundness: 10 }}
                            label='Correo'
                            value={userAuth?.email!}
                            disabled />
                        <Button mode='contained' onPress={handlerUpdateUser} style={styles.buttonModal} labelStyle={styles.buttonTextModal}>Actualizar</Button>
                    </Modal>
                </Portal>

                <NewMessageComponent showModalMessage={showModalMessage} setShowModalMessage={setShowModalMessage} />
            </ImageBackground>
            
        </>
    )
}
