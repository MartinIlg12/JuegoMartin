import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Player {
    id: number;
    name: string;
}

interface GameFieldProps {
    players: Player[];
}

const GameField: React.FC<GameFieldProps> = ({ players }) => {
    return (
        <View style={styles.field}>
            {players.map(player => (
                <View key={player.id} style={styles.player}>
                    <Text>{player.name}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    field: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: 400,
        maxHeight: 600,
        backgroundColor: 'green',
        margin: 20,
    },
    player: {
        width: '30%',
        height: '25%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 2,
    },
});

export default GameField;
