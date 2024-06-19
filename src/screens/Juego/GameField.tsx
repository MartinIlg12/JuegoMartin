import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { Player } from './Player'; 

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
            <Button
                    mode='contained'
                    icon='eye'
                    onPress={handleShowPlayersPress}
                    style={styles.buttonDetail}>
                    Mira tu 11 de GOATS
                </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    field: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    buttonDetail: {
        marginTop: 20,
        backgroundColor: '#3498db', 
    },
});

export default GameField;
