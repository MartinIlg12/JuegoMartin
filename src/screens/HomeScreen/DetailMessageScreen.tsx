import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import { Button, Divider, IconButton, Text, TextInput } from 'react-native-paper';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { Message } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime, auth } from '../../configs/firebaseConfig';
import { styles } from '../../theme/styles';
import Modal from 'react-native-modal';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface CustomAlertProps {
    isVisible: boolean;
    onClose: () => void;
    message: string;
    isSuccess: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, onClose, message, isSuccess }) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.7} animationIn="zoomInDown" animationOut="zoomOutUp">
            <View style={alertStyles.modalContent}>
                <Text style={alertStyles.message}>{message}</Text>
                <TouchableOpacity onPress={onClose} style={[alertStyles.button, isSuccess ? alertStyles.buttonAdded : alertStyles.buttonDefault]}>
                    <Text style={alertStyles.buttonText}>Aceptar</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const alertStyles = StyleSheet.create({
    modalContent: {
        backgroundColor: '#1e272e',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    message: {
        marginBottom: 20,
        fontSize: 18,
        color: '#f5f6fa',
        textAlign: 'center',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonDefault: {
        backgroundColor: '#ff4757',
    },
    buttonAdded: {
        backgroundColor: '#3498db',
    },
    buttonText: {
        color: '#f5f6fa',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export const DetailMessageScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { message } = route.params as { message: Message };

    const [editFormMessage, setEditFormMessage] = useState<Message>({
        id: message.id,
        to: message.to,
        subject: message.subject,
        message: message.message,
        userId: message.userId
    });

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [alertVisible, setAlertVisible] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState<string>('');
    const [alertSuccess, setAlertSuccess] = useState<boolean>(true);
    const isOwner = auth.currentUser?.uid === message.userId;

    const handleUpdateMessage = async () => {
        try {
            await update(ref(dbRealTime, `messages/${editFormMessage.userId}/${editFormMessage.id}`), {
                to: editFormMessage.to,
                subject: editFormMessage.subject,
                message: editFormMessage.message
            });
            setIsEditing(false);
            setAlertMessage('Mensaje Actualizado');
            setAlertSuccess(true);
            setAlertVisible(true);
        } catch (error) {
            console.error('Error updating message:', error);
            setAlertMessage('An error occurred while updating the message.');
            setAlertSuccess(false);
            setAlertVisible(true);
        }
    }

    const handleDeleteMessage = async () => {
        try {
            await remove(ref(dbRealTime, `messages/${message.userId}/${message.id}`));
            navigation.dispatch(CommonActions.goBack());
        } catch (error) {
            console.error('Error deleting message:', error);
            setAlertMessage('An error occurred while deleting the message.');
            setAlertSuccess(false);
            setAlertVisible(true);
        }
    }

    return (
        <ImageBackground
            source={{ uri: 'https://pbs.twimg.com/media/F-R2owPXoAAsjpg?format=jpg&name=4096x4096' }}
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
                    <Text style={styles.textLabel}>Mensaje:</Text>
                    <TextInput
                        value={editFormMessage.message}
                        onChangeText={(value) => setEditFormMessage({ ...editFormMessage, message: value })}
                        multiline={true}
                        numberOfLines={5}
                        style={styles.input}
                        placeholderTextColor="#ffff"
                        theme={{ colors: { text: '#fff', placeholder: '#ffffff', primary: '#ffffff' } }}
                        outlineColor="#ffff"
                        disabled={!isOwner}
                    />
                </View>
                {isOwner && !isEditing && (
                    <View style={styles.buttonContainer}>
                        <Button
                            mode='contained'
                            icon='email-sync'
                            onPress={() => setIsEditing(true)}
                            style={styles.buttonDetailAdd}
                        >
                            Editar
                        </Button>
                        <Button
                            mode='contained'
                            icon='email-remove'
                            onPress={handleDeleteMessage}
                            style={styles.buttonDetailDelete}
                        >
                            Eliminar
                        </Button>
                    </View>
                )}
                {isOwner && isEditing && (
                    <Button
                        mode='contained'
                        onPress={handleUpdateMessage}
                        style={styles.buttonDetailAdd}
                    >
                        Actualizar
                    </Button>
                )}
            </View>
            <CustomAlert
                isVisible={alertVisible}
                onClose={() => {
                    setAlertVisible(false);
                    if (alertSuccess) {
                        navigation.dispatch(CommonActions.navigate({ name: 'Home' }));
                    }
                }}
                message={alertMessage}
                isSuccess={alertSuccess}
            />
        </ImageBackground>
    );
}
