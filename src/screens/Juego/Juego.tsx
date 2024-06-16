import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import PlayerSelection from '../../screens/Juego/PlayerSelection';
import GameField from '../../screens/Juego/GameField';
import { Player } from './Player'; 

const allowedOrder = [
    { position: 'PO', count: 1 },
    { position: 'LI', count: 1 },
    { position: 'DFC D', count: 2 }, 
    { position: 'DFC I', count: 2 }, 
    { position: 'LD', count: 1 },
    { position: 'MCD', count: 1 },
    { position: 'MCO D', count: 2 }, 
    { position: 'MCO I', count: 2 }, 
    { position: 'EI', count: 1 },
    { position: 'ED', count: 1 },
    { position: 'DC', count: 1 }
];

export const Juego = () => {
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);

    const handleSelectPlayer = (player: Player) => {
        if (selectedPlayers.some(p => p.id === player.id)) {
            alert('El jugador ya está seleccionado.');
            return;
        }

        
        if (selectedPlayers.length >= 11) {
            alert('Ya tienes 11 jugadores en el campo.');
            return;
        }

        const currentPositionIndex = selectedPlayers.length;
        const currentRequirement = allowedOrder[currentPositionIndex];

        if (!currentRequirement || player.position !== currentRequirement.position) {
            alert(`Debes seleccionar un jugador en la posición ${currentRequirement.position}.`);
            return;
        }

        const positionCount = selectedPlayers.filter(p => p.position === player.position).length;

        if (positionCount >= currentRequirement.count) {
            alert(`No puedes seleccionar más de ${currentRequirement.count} jugador(es) en la posición ${player.position}.`);
            return;
        }


        setSelectedPlayers([...selectedPlayers, player]);
        alert('Jugador añadido.');
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
