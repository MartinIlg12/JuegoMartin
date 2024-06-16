import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Player } from './Player'; // Interfaz Player

interface GameFieldProps {
    players: Player[];
}

const GameField: React.FC<GameFieldProps> = ({ players }) => {
    const navigation = useNavigation();

    const handleShowPlayersPress = () => {
        //@ts-ignore
        navigation.navigate('SelectedPlayersScreen', { players });
    };

    return (
        <View style={styles.field}>
            <Button title="Show Selected Players" onPress={handleShowPlayersPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    field: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
});

export default GameField;