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
    nationality: string;
    team: string;
    rating: number;
    }


    const players: Player[] = [
        { id: 1, name: 'Alisson Becker', position: 'PO', jerseyNumber: 1, imageUri: 'https://backend.liverpoolfc.com/sites/default/files/styles/xl/public/acquiadam/2022-11/alisson-becker-brazil-24112022-v2.jpg?itok=mt4ZKD3d', nationality: 'Brasil', team: 'Liverpool', rating: 4.5 },
        { id: 2, name: 'Emiliano Martínez', position: 'PO', jerseyNumber: 22, imageUri: 'https://radiohuancavilca.com.ec/wp-content/uploads/2023/05/dibu3jpg.webp', nationality: 'Argentina', team: 'Aston Villa', rating: 4.0 },
        { id: 3, name: 'Pervis Estupiñán', position: 'LI', jerseyNumber: 77, imageUri: 'https://www.sisepuedeecuador.com/wp-content/uploads/wTbjGDTs_400x400.jpg', nationality: 'Ecuador', team: 'Villarreal', rating: 4.0 },
        { id: 4, name: 'Alphonso Davies', position: 'LI', jerseyNumber: 19, imageUri: 'https://www.telecomasia.net/upload/iblock/99a/99ab86d99de3733d49bbeb9c5d41ade8.jpg', nationality: 'Canadá', team: 'Bayern Múnich', rating: 4.0 },
        { id: 5, name: 'Virgil van Dijk', position: 'DFC D', jerseyNumber: 4, imageUri: 'https://i2-prod.liverpool.com/article29105074.ece/ALTERNATES/s615/0_GettyImages-2149558157.jpg', nationality: 'Países Bajos', team: 'Liverpool', rating: 4.9 },
        { id: 6, name: 'Ronald Araújo', position: 'DFC D', jerseyNumber: 5, imageUri: 'https://media.elobservador.com.uy/p/bcad2e9ab2b02d35b772ae80777a989e/adjuntos/364/imagenes/100/400/0100400676/1000x0/smart/1711370335700webp.webp', nationality: 'Uruguay', team: 'Barcelona', rating: 4.0 },
        { id: 7, name: 'Piero Hincapié', position: 'DFC I', jerseyNumber: 3, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/piero-hincapie-1697649381-119813.jpg?lm=1697649404', nationality: 'Ecuador', team: 'Bayern Leverkusen', rating: 4.2 },
        { id: 8, name: 'John Stones', position: 'DFC I', jerseyNumber: 6, imageUri: 'https://cdn1.manchestercity.news/uploads/30/2024/02/GettyImages-1763568372-1140x781.jpg', nationality: 'Inglaterra', team: 'Manchester City', rating: 4.3 },
        { id: 9, name: 'Alexander-Arnold', position: 'LD', jerseyNumber: 66, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/trent-alexander-arnold-liverpool-2022-1667320000-95423.jpg?lm=1667320011', nationality: 'Inglaterra', team: 'Liverpool', rating: 4.8 },
        { id: 10, name: 'Reece James', position: 'LD', jerseyNumber: 24, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/reece-james-chelsea-2023-24-1696599017-118596.jpg?lm=1696599037', nationality: 'Inglaterra', team: 'Chelsea', rating: 4.2 },
        { id: 11, name: 'Moisés Caicedo', position: 'MCD', jerseyNumber: 25, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/moises-caicedo-1693438397-115429.jpg?lm=1693438417', nationality: 'Ecuador', team: 'Chelsea', rating: 4.6 },
        { id: 12, name: 'Declan Rice', position: 'MCD', jerseyNumber: 41, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/declan-rice-1589794490-38849.jpg?lm=1589794491', nationality: 'Inglaterra', team: 'Arsenal', rating: 4.0 },
        { id: 13, name: 'Enzo Fernández', position: 'MCO D', jerseyNumber: 17, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/fernandez-enzo-2022-23-argentina-1669743888-97704.jpg?lm=1669743899', nationality: 'Argentina', team: 'Chelsea', rating: 4.0 },
        { id: 14, name: 'Jude Bellingham', position: 'MCO D', jerseyNumber: 22, imageUri: 'https://i2-prod.football.london/incoming/article27646001.ece/ALTERNATES/s1200c/1_GettyImages-1656777561.jpg', nationality: 'Inglaterra', team: 'Real Madrid', rating: 4.6 },
        { id: 16, name: 'Cole Palmer', position: 'MCO I', jerseyNumber: 20, imageUri: 'https://i2-prod.football.london/incoming/article27700557.ece/ALTERNATES/s615/0_GettyImages-1655017744.jpg', nationality: 'Inglaterra', team: 'Chelsea', rating: 4.7 },
        { id: 17, name: 'Pedri', position: 'MCO I', jerseyNumber: 8, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/pedri-fc-barcelona-2022-2023-1682349156-106037.jpg?lm=1682349250', nationality: 'España', team: 'Barcelona', rating: 4.0 },
        { id: 18, name: 'Vinícius JR', position: 'EI', jerseyNumber: 20, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/vinicius-junior-brazil-2022-1668948325-97017.jpg?lm=1668948359', nationality: 'Brasil', team: 'Real Madrid', rating: 4.8 },
        { id: 19, name: 'Jack Grealish', position: 'EI', jerseyNumber: 30, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/jack-grealish-manchester-city-2023-24-1696588596-118559.jpg?lm=1696588609', nationality: 'Inglaterra', team: 'Manchester City', rating: 4.6 },
        { id: 20, name: 'Phil Foden', position: 'ED', jerseyNumber: 17, imageUri: 'https://unanimodeportes.com/wp-content/uploads/2022/11/Foden-casi-no-ha-tenido-participacion-con-Inglaterra-en-la-Copa-del-Mundo-de-Qatar-2022-e1669416035117.jpg', nationality: 'Inglaterra', team: 'Manchester City', rating: 4.0 },
        { id: 21, name: 'Rodrygo Goes', position: 'ED', jerseyNumber: 29, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/rodrygo-brazil-2022-1669733560-97681.jpg?lm=1669733608', nationality: 'Brasil', team: 'Real Madrid', rating: 4.2 },
        { id: 22, name: 'Lionel Messi', position: 'DC', jerseyNumber: 10, imageUri: 'https://media.tycsports.com/files/2023/06/18/582719/lionel-messi-seleccion-argentina_862x485.webp', nationality: 'Argentina', team: 'Inter Miami', rating: 4.5},
        { id: 23, name: 'Cristiano Ronaldo', position: 'DC', jerseyNumber: 7, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/cristiano-ronaldo-al-nassr-2023-1692731063-114594.jpg?lm=1692731118', nationality: 'Portugal', team: 'Al Nassr', rating: 4.0 },
        { id: 24, name: 'Erling Haaland', position: 'DC', jerseyNumber: 9, imageUri: 'https://tmssl.akamaized.net/images/foto/galerie/erling-haaland-manchester-city-2023-1698268619-120392.jpg?lm=1698268631', nationality: 'Noruega', team: 'Manchester City', rating: 4.7 },
        { id: 25, name: 'Kylian Mbappé', position: 'DC', jerseyNumber: 33, imageUri: 'https://i.pinimg.com/1200x/7c/46/f7/7c46f714f0e0f8ba8c618b451193c12e.jpg', nationality: 'Francia', team: 'Real Madrid', rating: 4.9 },
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
