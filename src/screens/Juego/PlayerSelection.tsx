import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView} from 'react-native';
import { styles } from '../../theme/stylesJuego'; // Importamos los estilos desde el archivo styles.ts
import { IconButton } from 'react-native-paper';
import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { HomeScreen } from '../HomeScreen/HomeScreen';


interface Player {
    id: number;
    name: string;
    position: string;
    jerseyNumber: number;
    imageUri: string;
    }


    const players: Player[] = [
    { id: 1, name: 'Alison Becker', position: 'PO', jerseyNumber: 1, imageUri: 'https://backend.liverpoolfc.com/sites/default/files/styles/xl/public/acquiadam/2022-11/alisson-becker-brazil-24112022-v2.jpg?itok=mt4ZKD3d' },
    { id: 2, name: 'Emiliano Martinez', position: 'PO', jerseyNumber: 22, imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqA_MQur-dyjNlfrk37oablRcMAULOR9DAOI6zecB8VzmjU0BREsVp0nouZUBmkm8kA0Q&usqp=CAU' },
    { id: 3, name: 'Pervis Estupiñan', position: 'LI', jerseyNumber: 77, imageUri: 'https://www.sisepuedeecuador.com/wp-content/uploads/wTbjGDTs_400x400.jpg' },
    { id: 4, name: 'Alphonso Davies', position: 'LI', jerseyNumber: 19, imageUri: 'https://www.telecomasia.net/upload/iblock/99a/99ab86d99de3733d49bbeb9c5d41ade8.jpg' },
    { id: 5, name: 'Virgil Van Dijk', position: 'DFC D', jerseyNumber: 4, imageUri: 'https://i2-prod.liverpool.com/article29105074.ece/ALTERNATES/s615/0_GettyImages-2149558157.jpg' },
    { id: 6, name: 'Piero Hincapie', position: 'DFC I', jerseyNumber: 3, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/piero-hincapie-1697649381-119813.jpg?lm=1697649404' },
    { id: 7, name: 'Ronald Araujo', position: 'DFC D', jerseyNumber: 5, imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcS3yFe6QX2h26k5PyF3m4_fjt97DFFTdRGt9Z1vyCqk2t5UMKClsxbWZpwCA8XtenHnI&usqp=CAU' },
    { id: 8, name: 'Jon Stones', position: 'DFC I', jerseyNumber: 6, imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7iKCnAaYb8n0iBjqX_X1lKxVzLiV7nJRerH-oLEu-zcR5G1KXnnJga2IrFnjhCxiQFxk&usqp=CAU' },
    { id: 9, name: 'Alexander Arnold', position: 'LD', jerseyNumber: 66, imageUri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL3tJLLze4Jt4d-3KeBiGBx-9AZhllbUngMq98e3J9RO5zkaGTfWmZ50jIBbqWnSckrq8&usqp=CAU' },
    { id: 10, name: 'Rece James', position: 'LD', jerseyNumber: 24, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/reece-james-chelsea-2023-24-1696599017-118596.jpg?lm=1696599037' },
    { id: 11, name: 'Moises Caicedo', position: 'MCD', jerseyNumber: 25, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/moises-caicedo-1693438397-115429.jpg?lm=1693438417' },
    { id: 12, name: 'Declan Rice', position: 'MCD', jerseyNumber: 41, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/declan-rice-1589794490-38849.jpg?lm=1589794491' },
    { id: 13, name: 'Enzo Fernandez', position: 'MCO D', jerseyNumber: 17, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/fernandez-enzo-2022-23-argentina-1669743888-97704.jpg?lm=1669743899' },
    { id: 14, name: 'Jude Bellingham', position: 'MCO D', jerseyNumber: 22, imageUri: 'https://i2-prod.football.london/incoming/article27646001.ece/ALTERNATES/s1200c/1_GettyImages-1656777561.jpg' },
    { id: 16, name: 'Cole Palmer', position: 'MCO I', jerseyNumber: 20, imageUri: 'https://i2-prod.football.london/incoming/article27700557.ece/ALTERNATES/s615/0_GettyImages-1655017744.jpg' },
    { id: 17, name: 'Pedri', position: 'MCO I', jerseyNumber: 8, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/pedri-fc-barcelona-2022-2023-1682349156-106037.jpg?lm=1682349250' },
    { id: 18, name: 'Vinicius Junior', position: 'EI', jerseyNumber: 20, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/vinicius-junior-brazil-2022-1668948325-97017.jpg?lm=1668948359' },
    { id: 19, name: 'Jack Greaslish', position: 'EI', jerseyNumber: 30, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/jack-grealish-manchester-city-2023-24-1696588596-118559.jpg?lm=1696588609' },
    { id: 20, name: 'Phill Foden', position: 'ED', jerseyNumber: 17, imageUri: 'https://unanimodeportes.com/wp-content/uploads/2022/11/Foden-casi-no-ha-tenido-participacion-con-Inglaterra-en-la-Copa-del-Mundo-de-Qatar-2022-e1669416035117.jpg' },
    { id: 21, name: 'Rodrigo Goes', position: 'ED', jerseyNumber: 29, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/rodrygo-brazil-2022-1669733560-97681.jpg?lm=1669733608' },
    { id: 22, name: 'Lionel Messi', position: 'DC', jerseyNumber: 10, imageUri: 'https://s0.rbk.ru/v6_top_pics/media/img/0/99/756708616772990.jpg' },
    { id: 23, name: 'Cristiano Ronaldo', position: 'DC', jerseyNumber: 7, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118' },
    { id: 24, name: 'Erling Haaland', position: 'DC', jerseyNumber: 9, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/erling-haaland-manchester-city-2023-1698268619-120392.jpg?lm=1698268631' },
    { id: 25, name: 'Kilyan Mbappe', position: 'DC', jerseyNumber: 33, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/mbappe-kylian-2022-2023-psg-1032346914hjpg-1690297101-112393.jpg?lm=1690297120' },
    ];
interface PlayerSelectionProps {
    onSelect: (player: Player) => void;
}

const PlayerSelection: React.FC<PlayerSelectionProps> = ({ onSelect }) => {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const navigation = useNavigation();
    const handleSelectPlayer = (player: Player) => {
        if (selectedPlayer && selectedPlayer.id === player.id) {
            setSelectedPlayer(null); 
        } else {
            setSelectedPlayer(player); 
            onSelect(player); 
        }
    };

    const renderPlayers = () => {
        return players.map((player) => (
            <TouchableOpacity
                key={player.id}
                style={styles.playerContainer}
                onPress={() => handleSelectPlayer(player)}
            >
                <Image source={{ uri: player.imageUri }} style={styles.playerImage} />
                <Text style={styles.playerName}>{player.name}{"\n"}{player.position}</Text>
            </TouchableOpacity>
        ));
    };

    return (
        <View style={styles.container}>
            <IconButton
                    icon="arrow-left"
                    size={30}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Home' }))}
                    style={styles.homeButton}
                />
            <Text style={styles.title}>Elige tus GOATS</Text>
            {selectedPlayer && (
                <View style={styles.selectedPlayerContainer}>
                    <Text style={styles.selectedPlayerText}>Jugador Seleccionado:</Text>
                    <Image source={{ uri: selectedPlayer.imageUri }} style={styles.selectedPlayerImage} />
                    <Text style={styles.selectedPlayerName}>{selectedPlayer.name}</Text>
                    <Text style={styles.selectedPlayerDetails}>Posición: {selectedPlayer.position}</Text>
                    <Text style={styles.selectedPlayerDetails}>Número: {selectedPlayer.jerseyNumber}</Text>
                </View>
            )}
            <ScrollView contentContainerStyle={styles.galleryContainer}>
                {renderPlayers()}
            </ScrollView>
        </View>
    );
};

export default PlayerSelection;
