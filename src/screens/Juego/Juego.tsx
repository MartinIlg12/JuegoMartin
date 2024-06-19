import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
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

interface CustomAlertProps {
    isVisible: boolean;
    onClose: () => void;
    message: string;
    isAdded: boolean;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ isVisible, onClose, message, isAdded }) => {
    return (
        <Modal isVisible={isVisible} backdropOpacity={0.7} animationIn="zoomInDown" animationOut="zoomOutUp">
            <View style={styles.modalContent}>
                <Text style={styles.message}>{message}</Text>
                <TouchableOpacity onPress={onClose} style={[styles.button, isAdded ? styles.buttonAdded : styles.buttonDefault]}>
                    <Text style={styles.buttonText}>{isAdded ? 'Aceptar' : 'Cerrar'}</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

export const Juego = () => {
    const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isAdded, setIsAdded] = useState(false);

    const handleSelectPlayer = (player: Player) => {
        if (selectedPlayers.some(p => p.id === player.id)) {
            setModalMessage(`${player.name} ya está seleccionado.`);
            setIsAdded(false);
            setModalVisible(true);
            return;
        }

        if (selectedPlayers.length >= 11) {
            setModalMessage('Ya tienes 11 jugadores en el campo.');
            setIsAdded(false);
            setModalVisible(true);
            return;
        }

        const currentPositionIndex = selectedPlayers.length;
        const currentRequirement = allowedOrder[currentPositionIndex];

        if (!currentRequirement || player.position !== currentRequirement.position) {
            setModalMessage(`Debes seleccionar un jugador en la posición ${currentRequirement.position}.`);
            setIsAdded(false);
            setModalVisible(true);
            return;
        }

        const positionCount = selectedPlayers.filter(p => p.position === player.position).length;

        if (positionCount >= currentRequirement.count) {
            setModalMessage(`No puedes seleccionar más de ${currentRequirement.count} jugador(es) en la posición ${player.position}.`);
            setIsAdded(false);
            setModalVisible(true);
            return;
        }

        setSelectedPlayers([...selectedPlayers, player]);
        setModalMessage(`${player.name} se añadió.`);
        setIsAdded(true);
        setModalVisible(true);
    };

    return (
        <SafeAreaView style={styles.container}>
            <PlayerSelection onSelect={handleSelectPlayer} />
            <GameField players={selectedPlayers} />
            <CustomAlert 
                isVisible={modalVisible} 
                onClose={() => setModalVisible(false)} 
                message={modalMessage} 
                isAdded={isAdded}
            />
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

export default Juego;
