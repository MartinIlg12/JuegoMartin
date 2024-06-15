import React from 'react';
import { View, TouchableWithoutFeedback  } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { Message } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

//Interface props
interface Props {
    message: Message;
}

export const MessageCardComponent = ({message}: Props) => {
    const navigation = useNavigation();

    const navigateToDetail = () => {
        navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { message } }));
    };

    return (
        <TouchableWithoutFeedback onPress={navigateToDetail}>
            <View style={styles.cardContainer}>
                <View style={styles.cardContent}>
                    <Text style={styles.labelLargeCard}>Para: {message.to} </Text>
                    <Text style={styles.bodyMedium}>Asunto: {message.subject}</Text>
                </View>
                <View style={styles.iconContainerCard}>
                    <IconButton
                        icon="email-edit"
                        size={25}
                        onPress={navigateToDetail}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}