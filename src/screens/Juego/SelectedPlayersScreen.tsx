import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, Modal } from 'react-native';
import { IconButton } from 'react-native-paper';
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import firebase from 'firebase/auth';
import { ref, set } from 'firebase/database';

interface FormUser {
    name: string;
}

interface Player {
    id: string;
    name: string;
    imageUri: string;
    position: string;
    jerseyNumber: number;
    rating: number;
    nationality: string;
    team: string;
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
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });
    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [captain, setCaptain] = useState<Player | null>(null);
    const [nationalityScore, setNationalityScore] = useState<number>(0);
    const [teamScore, setTeamScore] = useState<number>(0);
    const [overallScore, setOverallScore] = useState<number>(0);

    useEffect(() => {
        setUserAuth(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" });
    }, []);

    const calculateNationalityScore = (nationality: string): number => {
        const filteredPlayers = players.filter(player => player.nationality === nationality);
        if (filteredPlayers.length === 0) return 0;

        const totalRating = filteredPlayers.reduce((acc, player) => acc + player.rating, 0);
        const averageRating = totalRating / filteredPlayers.length;
        return Math.round(averageRating * 20);
    };

    const calculateTeamScore = (team: string): number => {
        const filteredPlayers = players.filter(player => player.team === team);
        if (filteredPlayers.length === 0) return 0;

        const totalRating = filteredPlayers.reduce((acc, player) => acc + player.rating, 0);
        const averageRating = totalRating / filteredPlayers.length;
        return Math.round(averageRating * 20);
    };

    const saveOverallScoreToFirebase = (score: number) => {
        if (auth.currentUser) {
            const userScoreRef = ref(dbRealTime, `users/${auth.currentUser.uid}/overallScore`);
            set(userScoreRef, score)
                .then(() => {
                    //console.log("Overall score saved successfully!");
                })
                .catch((error) => {
                    //console.error("Error saving overall score: ", error);
                });
        }
    };

    const navigation = useNavigation();

    useEffect(() => {
        const nationalityScores = Array.from(new Set(players.map(player => player.nationality))).map(nationality => {
            return calculateNationalityScore(nationality);
        });

        const teamScores = Array.from(new Set(players.map(player => player.team))).map(team => {
            return calculateTeamScore(team);
        });

        const totalNationalityScore = nationalityScores.reduce((acc, score) => acc + score, 0);
        const totalTeamScore = teamScores.reduce((acc, score) => acc + score, 0);
        const overallScore = Math.round((totalNationalityScore + totalTeamScore) / (nationalityScores.length + teamScores.length));

        setOverallScore(overallScore);


        saveOverallScoreToFirebase(overallScore);
    }, [players]);

    const handlePlayerPress = (player: Player) => {
        setSelectedPlayer(player);
        setModalVisible(true);

        const nationalityScore = calculateNationalityScore(player.nationality);
        const teamScore = calculateTeamScore(player.team);
        setNationalityScore(nationalityScore);
        setTeamScore(teamScore);
    };

    const handleSelectCaptain = (player: Player) => {
        setCaptain(player);
        setModalVisible(false);
    };

    return (
        <ImageBackground
            source={{ uri: 'https://i.pinimg.com/564x/79/fd/0c/79fd0c5b4aa870744138ccbbc08268ec.jpg' }}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <View style={styles.header}>
                <View style={styles.headerContainer}>
                    <Text style={styles.title}>Goats FC</Text>
                    <View style={styles.userInfo}>
                        <Text style={styles.username}>{userAuth?.displayName}</Text>
                        <Text style={styles.score}>Quimica: {overallScore}/100</Text>
                    </View>
                </View>
            </View>

            <View style={styles.container}>
            <IconButton
                    icon="home"
                    size={30}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Home' }))}
                    style={styles.avatarLogOut}
                />
            <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Juego' }))}
                    style={styles.avatarHome}
                />
                
                {players.map(player => (
                    <TouchableOpacity
                        key={player.id}
                        onPress={() => handlePlayerPress(player)}
                        style={getPlayerStyle(player)}
                    >
                        <Image source={{ uri: player.imageUri }} style={styles.playerImage} />
                        <Text style={styles.playerDetails}>{player.name}</Text>
                        {captain === player && (
                            <View style={styles.captainBadge}>
                                <Text style={styles.captainText}>C</Text>
                            </View>
                        )}
                        <View style={styles.ratingContainer}>
                            <Text style={styles.ratingText}>{player.rating}</Text>
                        </View>
                    </TouchableOpacity>
                ))}

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Image source={{ uri: selectedPlayer?.imageUri }} style={styles.modalImage} />
                            <View style={styles.modalTextContainer}>
                                <Text style={styles.modalText}>{selectedPlayer?.name}</Text>
                                <Text style={styles.modalText}>Posición: {selectedPlayer?.position}</Text>
                                <Text style={styles.modalText}>Número: #{selectedPlayer?.jerseyNumber}</Text>
                            </View>
                            <View style={styles.ratingContainerModal}>
                                <Text style={styles.ratingTextModal}>{selectedPlayer?.rating}</Text>
                            </View>
                            
                            <TouchableOpacity
                                style={[styles.selectCaptainButton, { backgroundColor: 'green' }]}
                                onPress={() => handleSelectCaptain(selectedPlayer!)}
                            >
                                <Text style={styles.selectCaptainText}>Elegir Capitán</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.closeButtonText}>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </ImageBackground>
    );
};


const getPlayerStyle = (player: Player) => {
    let left = 10;
    let top = 10;

    switch (player.position) {
        case 'PO':
            left = 150;
            top = 10;
            break;
        case 'LI':
            left = 290;
            top = 190;
            break;
        case 'DFC I':
            left = 210;
            top = 150;
            break;
        case 'DFC D':
            left = 110;
            top = 150;
            break;
        case 'LD':
            left = 0;
            top = 190;
            break;
        case 'MCD':
            left = 150;
            top = 300;
            break;
        case 'MCO I':
            left = 300;
            top = 390;
            break;
        case 'MCO D':
            left = 10;
            top = 390;
            break;
        case 'EI':
            left = 20;
            top = 540;
            break;
        case 'ED':
            left = 300;
            top = 540;
            break;
        case 'DC':
            left = 150;
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
        marginTop: 50,
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
        backgroundColor: 'black',
        width: '100%',
        alignItems: 'center',
        paddingTop: 5,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    username: {
        fontSize: 18,
        color: 'white',
        marginRight: 50,
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
        width: 70,
        height: 70,
        borderRadius: 35,
    },
    playerDetails: {
        color: 'white',
        marginTop: 5,
    },
    selectCaptainButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    selectCaptainText: {
        color: 'white',
        fontWeight: 'bold',
    },
    captainBadge: {
        backgroundColor: 'green',
        padding: 5,
        borderRadius: 5,
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1,
    },
    captainText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    modalImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    modalTextContainer: {
        alignItems: 'center',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 18,
        marginBottom: 5,
    },
    ratingContainer: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        bottom: 20,
        right: 10,
        borderWidth: 1,
        borderColor: 'black',
        width: 30,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingContainerModal: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 5,
        top: 10,
        right: 10,
    },
    closeButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: 'grey',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'black',
        fontSize: 16,
    },
    ratingText: {
        fontSize: 8,
        fontWeight: 'bold',
        color: 'black',
    },
    ratingTextModal: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
    },
    avatarLogOut: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
        marginTop: 660,
        marginRight: 11,
    },
    avatarHome:{
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
        marginRight: 11,
    }
    
});

export default SelectedPlayersScreen;
