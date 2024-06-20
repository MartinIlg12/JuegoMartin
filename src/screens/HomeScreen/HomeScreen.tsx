import React, { useEffect, useState } from 'react';
import { FlatList, View, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { Avatar, Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { MessageCardComponent } from './components/MessageCardComponent';
import { NewMessageComponent } from './components/NewMessageComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../../theme/styles';

// Interface para el formulario de perfil
interface FormUser {
    name: string;
}

// Interface para el mensaje
export interface Message {
    id: string;
    to: string;
    subject: string;
    message: string;
    userId: string; 
    
}

export const HomeScreen = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [overallScore, setOverallScore] = useState<number | null>(null);

    useEffect(() => {
        setUserAuth(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" });
        getAllMessages(); 
        getOverallScore(); 
    }, []);

    const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
    const [showModalMessage, setShowModalMessage] = useState<boolean>(false);

    const navigation = useNavigation();


    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value });
    }

    // Función para actualizar el perfil del usuario
    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        });
        setShowModalProfile(false);
    }

    // Función para obtener todos los mensajes de todos los usuarios
    const getAllMessages = () => {
        const dbRef = ref(dbRealTime, 'messages'); // Referencia a todos los mensajes
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) {
                setMessages([]); // Si no hay datos, establece un array vacío de mensajes
                return;
            }
            const allMessages: Message[] = [];
            Object.keys(data).forEach((userId) => {
                Object.keys(data[userId]).forEach((messageId) => {
                    const message = { ...data[userId][messageId], id: messageId, userId }; // Incluir userId
                    allMessages.push(message);
                });
            });
            setMessages(allMessages); // Establece todos los mensajes obtenidos en el estado
        });
    }

    // Función para obtener la puntuación general del usuario
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

    // Navegar a DetailMessageScreen
    const navigateToDetailMessage = (message: Message) => {
        navigation.dispatch(CommonActions.navigate({
            name: 'DetailMessage',
            params: { message, isOwner: message.userId === auth.currentUser?.uid } // Pasar isOwner para indicar si el usuario actual es el propietario del mensaje
        }));
    }

    return (
        <>
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/736x/d7/44/66/d74466ac99f76d24af3469db71cf2969.jpg' }}
                style={styles.backgroundImage}
                imageStyle={{ opacity: 0.4 }}
            >
                <View style={styles.routeHome}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9U8oJgaoX_sKBGkRSLz-ZJhD7Pbwd3uwMIA&s' }}
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
                    <Text style={styles.textContainerCards}>Mensajes de la Comunidad</Text>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => navigateToDetailMessage(item)}>
                                <MessageCardComponent message={item} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>

                {/* Botones de acción */}
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
