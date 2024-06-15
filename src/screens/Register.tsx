import React, { useState } from 'react';
import { ImageBackground, View, Image } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

//Interface - Formulario registro
interface FormRegister {
    email: string;
    password: string;
}

//Interface - Snackbar message
interface MessageSnackBar {
    visible: boolean;
    message: string;
    color: string;
}

export const RegisterScreen = () => {
    //hook useState: cambiar el estado del formulario
    const [formRegister, setFormRegister] = useState<FormRegister>({
        email: '',
        password: ''
    });

    //hook useState: visualizar u ocultar el mensaje
    const [showMessage, setShowMessage] = useState<MessageSnackBar>({
        visible: false,
        message: '',
        color: '#fff'
    });

    //hook useState: visualizar la contraseña
    const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);

    //hooh useNavigation: navegar entres screens
    const navigation = useNavigation();

    //Función para cambiar los datos del formulario
    const handlerSetValues = (key: string, value: string) => {
        //Operador spread: sacar una copia del objeto
        setFormRegister({ ...formRegister, [key]: value })
    }

    //Función para enviar y crear al usuario
    const handlerFormRegister = async () => {
        //Validar que existe datos en el formulario
        if (!formRegister.email || !formRegister.password) {
            setShowMessage({
                visible: true,
                message: 'Completa todos los campos!',
                color: '#8f0e1a'
            });
            return;
        }
        //console.log(formRegister);
        try {
            const response = await createUserWithEmailAndPassword(
                auth,
                formRegister.email,
                formRegister.password
            );
            setShowMessage({
                visible: true,
                message: 'Registro exitoso!',
                color: '#2e7324'
            });
            //console.log(response);
        } catch (ex) {
            console.log(ex);
            setShowMessage({
                visible: true,
                message: 'No se logró registrar, inténtalo más tarde!',
                color: '#8f0e1a'
            });
        }
    }

    return (
        <ImageBackground
            source={{ uri: 'https://static.dezeen.com/uploads/2020/07/arsenal-home-kit-2021-art-deco-chevrons_dezeen_2364_col_8-852x1278.jpg' }} 
            style={styles.backgroundImage}
            imageStyle={{ opacity: 0.4 }}
        >
            <View style={styles.headerContainer}>
                <Image 
                    source={{ uri: 'https://thumbs.dreamstime.com/b/modern-mountain-goat-head-logo-creative-concept-vector-format-scalable-to-any-size-modern-mountain-goat-head-logo-creative-193184152.jpg' }} 
                    style={styles.iconImage} 
                />
                
            </View>
            <View style={styles.headerContainerImage}>  
            <Text style={styles.iconText}>THE GOATS FC</Text>
            </View>
            
        
        <View style={styles.root}>
            <Text style={styles.text}>Regístrate</Text>
            <TextInput
                    mode="flat"
                    label="Correo"
                    placeholder="Escribe tu correo"
                    style={styles.inputs}
                    theme={{ colors: { text: '#ffffff', placeholder: '#ffffff', primary: '#ffffff' } }}
                    outlineColor="rgba(255, 255, 255, 0.5)"
                    activeOutlineColor="#ffffff"
                    onChangeText={(value) => handlerSetValues('email', value)}
                />
                <TextInput
                    mode="flat"
                    label="Contraseña"
                    placeholder="Escribe tu contraseña"
                    secureTextEntry={hiddenPassword}
                    right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
                    style={styles.inputs}
                    theme={{ colors: { text: '#ffffff', placeholder: '#ffffff', primary: '#ffffff' } }}
                    outlineColor="rgba(255, 255, 255, 0.5)"
                    activeOutlineColor="#ffffff"
                    onChangeText={(value) => handlerSetValues('password', value)}
                />
            <Button style={styles.button} mode="contained" onPress={handlerFormRegister}>
                Registrate
            </Button>
            <Text
                style={styles.textRedirect}
                onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}>
                Ya tienes una cuenta? Inicia sesión ahora
            </Text>
            <Snackbar
                visible={showMessage.visible}
                onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
                style={{ backgroundColor: showMessage.color }}>
                {showMessage.message}
            </Snackbar>
        </View>
        </ImageBackground>
    )
}