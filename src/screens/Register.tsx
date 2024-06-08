//Martin Ilguan Prueba
import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Snackbar, Text, TextInput } from 'react-native-paper';
import { styles } from '../theme/styles';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface FormRegister {
  email: string;
  password: string;
}

interface MessageSnackBar {
  visible: boolean;
  message: string;
  color: string;
}

export const RegisterScreen = () => {
  const [formRegister, setRegister] = useState<FormRegister>({
    email: '',
    password: ''
  });
  const [hiddenPassword, setHiddenPassword] = useState<boolean>(true);
  
  const [showMessage, setShowMessage] = useState<MessageSnackBar>({
    visible: false,
    message: '',
    color: '#ffff',
  });

  const handlerSetValues = (key: string, value: string) => {
    setRegister({ ...formRegister, [key]: value });
  };

  const navigation = useNavigation();

  const handlerFormRegister = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formRegister.email || !formRegister.password) {
      setShowMessage({
        visible: true,
        message: 'Completa todos los campos',
        color: '#8f0e2a'
      });
      return;
    }

    if (!emailRegex.test(formRegister.email)) {
      setShowMessage({
        visible: true,
        message: 'Debe ser un correo electrónico válido',
        color: '#8f0e2a'
      });
      return;
    }

    if (formRegister.password.length < 6) {
      setShowMessage({
        visible: true,
        message: 'La contraseña debe tener al menos 6 caracteres',
        color: '#8f0e2a'
      });
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        formRegister.email,
        formRegister.password,
      );
      setShowMessage({
        visible: true,
        message: 'Registro exitoso',
        color: '#2e7821'
      });
    } catch (ex) {
      setShowMessage({
        visible: true,
        message: 'No se logró registrar. Inténtalo más tarde',
        color: '#8f0e2a'
      });
      console.log(ex);
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        ¡Regístrate Ahora!
      </Text>
      <TextInput
        mode="outlined"
        label="Correo"
        placeholder="Escribe tu correo"
        style={styles.inputs}
        onChangeText={(value) => handlerSetValues('email', value)}
      />
      <TextInput
        mode="outlined"
        label="Contraseña"
        placeholder="Escribe tu contraseña"
        secureTextEntry={hiddenPassword}
        style={styles.inputs}
        right={<TextInput.Icon icon="eye" onPress={() => setHiddenPassword(!hiddenPassword)} />}
        onChangeText={(value) => handlerSetValues('password', value)}
      />
      <Button style={styles.button} mode="contained" onPress={handlerFormRegister}>
        Registrate
      </Button>
      <Text
        style={styles.textRedirect}
        onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Login' }))}
      >
        ¿Ya tienes una cuenta? Inicia Sesión Ahora
      </Text>
      <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color }}
      >
        {showMessage.message}
      </Snackbar>
    </View>
  );
};
