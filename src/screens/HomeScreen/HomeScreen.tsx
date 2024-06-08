import React, { useEffect, useState } from 'react'
import { View, Image } from 'react-native'
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../theme/styles'
import  firebase, { updateProfile }  from 'firebase/auth';
import { auth } from '../../configs/firebaseConfig';
import { signInWithPhoneNumber } from 'firebase/auth';
import handlerSetValues from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import { MessageCardComponent } from './components/MessageCardComponent';
import { NewMessageComponent } from './components/NewMessageComponent';

interface FormUser {
  name: string;
  phoneNumber: string;
}

interface Message {
  id: string;
  to: string;
  subject: string;
  message: string;
}

const imageUrls = [
  'https://ticotrades.com/cdn/shop/files/CAUS_199.jpg?v=1714989744',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBz4lCpHAiYpmZ8vLBkanP4MbhvqZ-KQxTHA&s',
  'https://http2.mlstatic.com/D_NQ_NP_932446-MLU75181506843_032024-O.webp',
  'https://http2.mlstatic.com/D_NQ_NP_861654-MLA75291556769_032024-O.webp',
];

export const HomeScreen = () => {
  const [formUser, setFormUser] = useState<FormUser>({
    name: '',
    phoneNumber: '',
  });

  const [userUth, setUserAuth] = useState<firebase.User | null>(null);

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setFormUser({
      name: auth.currentUser?.displayName ?? "",
      phoneNumber: ''
    });
  }, []);

  const [showModalProfile, setShowModalProfile] = useState<boolean>(false);
  const [showModalMessage, setShowModalMessage] = useState<boolean>(false);

  const handlerSetValues = (key: string, value: string) => {
    setFormUser({ ...formUser, [key]: value });
  }

  const handlerUpdateUser = async () => {
    await updateProfile(userUth!, {
      displayName: formUser.name
    });
    setShowModalProfile(false);
  }

  return (
    <>
      <View style={styles.routeHome}>
        <View style={styles.header}>
          <Avatar.Text
            size={24} label="MI" />
          <View style={styles.textContainer}>
            <Text style={styles.textHome} variant='bodySmall'>Bienvenido</Text>
            <Text style={styles.textHome} variant='labelLarge'>{userUth?.displayName}</Text>
            {formUser.phoneNumber ? (
              <Text style={styles.textHome} variant='bodySmall'>{formUser.phoneNumber}</Text>
            ) : null}
          </View>
          <View style={styles.iconEnd}>
            <IconButton
              icon="account-edit"
              size={30}
              mode='contained'
              onPress={() => { setShowModalProfile(true) }}
            />
          </View>
        </View>
        <View>
        <Text style={styles.textGame}>
            Album Copa America 2024
          </Text>
          <Text style={styles.textGame}>
            ------------------------------------------------------
          </Text>
        </View>
        <View>
          <Text style={styles.textGame}>
            Tus Figuras
          </Text>
          <FlatList
            data={imageUrls}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
        <View>
          <FlatList
            data={imageUrls}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant='headlineMedium'>Mi perfil</Text>
            <View style={styles.iconEnd}>
              <IconButton icon='close-circle-outline' size={30} onPress={() => setShowModalProfile(false)} />
            </View>
          </View>
          <Divider />
          <TextInput
            mode='outlined'
            label='Nombre'
            value={formUser.name}
            onChangeText={(value) => handlerSetValues('name', value)}
          />
          <TextInput
            mode='outlined'
            label='Correo'
            value={userUth?.email!}
            disabled
          />
          <TextInput
            mode='outlined'
            label='Número de Teléfono'
            value={formUser.phoneNumber}
            onChangeText={(value) => handlerSetValues('phoneNumber', value)}
          />
          <Button style={styles.button2} mode='contained' onPress={handlerUpdateUser}>
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        style={styles.fabMessage}
        icon="plus"
        onPress={() => setShowModalMessage(true)}
      />
      <NewMessageComponent showModalMessage={showModalMessage} setShowModalMessage={setShowModalMessage} />
    </>
  );
}
export default HomeScreen;