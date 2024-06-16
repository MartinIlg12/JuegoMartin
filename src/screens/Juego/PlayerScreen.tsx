import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Player } from './Player'; // Interfaz Player

interface PlayersScreenProps {
    route: {
        params: {
            playerId: number;
            imageUri: string;
            playerName: string;
        };
    };
}

export const PlayerScreen: React.FC<PlayersScreenProps> = ({ route }) => {
    const { playerId, playerName, imageUri } = route.params;

    return (
        <View style={styles.container}>
            <Text>Player Details for ID: {playerId}</Text>
            <Text>Player Name: {playerName}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default PlayerScreen;
