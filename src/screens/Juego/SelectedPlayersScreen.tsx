import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { Player } from './Player'; 

interface FormUser {
    name: string;
}
interface SelectedPlayersScreenProps {
    route: {
        params: {
            players: Player[];
            username: string; 
        };
    };
}

const SelectedPlayersScreen: React.FC<SelectedPlayersScreenProps> = ({ route }) => {
    const { players, username } = route.params;
    // hook useState: manipular el formulario del perfil de usuario
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
    useEffect(() => {
        // Obtener la data del usuario autenticado
        setUserAuth(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" });
    }, []);
    return (
        <ImageBackground
            source={{ uri: 'https://img.freepik.com/vector-gratis/campo-futbol-verde_225004-1137.jpg' }}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Goats FC</Text>
                    <View style={styles.userInfo}>
                    <Text style={styles.playerDetails}>{userAuth?.displayName}</Text> 
                        <Text style={styles.score}>Puntuación: 0</Text>
                    </View>
                </View>
                {players.map(player => (
                    <View key={player.id} style={getPlayerStyle(player)}>
                        <Image source={{ uri: player.imageUri }} style={styles.playerImage} />
                        <Text style={styles.playerDetails}>{player.name}</Text>
                        <Text style={styles.playerDetails}>#{player.jerseyNumber}</Text>
                    </View>
                ))}
            </View>
        </ImageBackground>
    );
};

const getPlayerStyle = (player: Player) => {
    let left = 10;
    let top = 10;

    switch (player.position) {
        case 'PO':
            left = 160; 
            top = 50;
            break;
        case 'LI':
            left = 280; 
            top = 170;
            break;
        case 'DFC I':
            left = 200; 
            top = 150;
            break;
        case 'DFC D':
            left = 120; 
            top = 150;
            break;
        case 'LD':
            left = 10; 
            top = 150;
            break;
        case 'MCD':
            left = 150; 
            top = 300;
            break;
        case 'MCO I':
            left = 300; 
            top = 350;
            break;
        case 'MCO D':
            left = 10; 
            top = 350;
            break;
        case 'EI':
            left = 20; 
            top = 450;
            break;
        case 'ED':
            left = 180; 
            top = 450;
            break;
        case 'DC':
            left = 100; 
            top = 550;
            break;
        default:
            left = 0;
            top = 0;
            break;
    }

    return {
        ...styles.playerContainer,
        left,
        top,
    };
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    userInfo: {
        alignItems: 'flex-end',
    },
    username: {
        fontSize: 18,
        color: 'white',
    },
    score: {
        fontSize: 16,
        color: 'white',
    },
    playerContainer: {
        position: 'absolute',
        alignItems: 'center',
    },
    playerImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    playerDetails: {
        color: 'white',
        marginTop: 5,
    },
});

export default SelectedPlayersScreen;
