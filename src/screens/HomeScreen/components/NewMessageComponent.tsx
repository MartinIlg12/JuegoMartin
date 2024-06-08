import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text,TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import handlerSetValues from 'react';
interface Props{
  showModalMessage:boolean;
  setShowModalMessage: Function;
}
interface FormMessage{
  to: string;
  subject:string;
  message:string;
}
export const NewMessageComponent = ({showModalMessage, setShowModalMessage}: Props) => {
  const[forMessage, setFormMessage]=useState<FormMessage>({
    to:'',
    subject:'',
    message:'',
  })
  const handlerSetValues=(key: string, value: string)=>{
      setFormMessage({...forMessage, [key]:value })
  }
  const handlerSaveMessage=()=>{
    if(!forMessage.to || !forMessage.subject || !forMessage.message){
      return;
    }
  }
  return (
    <Portal>
        <Modal visible={showModalMessage} contentContainerStyle={styles.modal}>
          <View style={styles.header}>
            <Text variant='headlineSmall'>Intercambia tu Jugador</Text>
            <View style={styles.iconEnd}>
                <IconButton 
                icon='close-circle-outline'
                size={30}
                onPress={()=>{
                  setShowModalMessage(false)
                }}/>          
            </View>
          </View>
          <Divider/>
          < TextInput
            label='Para'
            mode='outlined'
            onChangeText={(value)=>handlerSetValues('to',value)}
          />
          < TextInput
            label='Jugador'
            mode='outlined'
            onChangeText={(value)=>handlerSetValues('subject', value)}
          />
          < TextInput
            label='Mensaje'
            mode='outlined'
            numberOfLines={7}
            onChangeText={(value)=>handlerSetValues('message', value)}
          />
          <Button style={styles.button2} mode='contained' onPress={handlerSaveMessage}>Enviar</Button>
        </Modal>
    </Portal>
  )
}
