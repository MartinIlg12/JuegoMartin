import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PlayerSelection from '../../screens/Juego/PlayerSelection';
import GameField from '../../screens/Juego/GameField';

interface Player {
    id: number;
    name: string;
}

export const Juego = () => {
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

    const handleSelectPlayer = (player: Player) => {
        if (selectedPlayers.length < 11 && !selectedPlayers.some(p => p.id === player.id)) {
            setSelectedPlayers([...selectedPlayers, player]);
        } else {
            alert('Ya tienes 11 jugadores en el campo o el jugador ya está seleccionado.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <PlayerSelection onSelect={handleSelectPlayer} />
            <GameField players={selectedPlayers} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});

export default Juego;
