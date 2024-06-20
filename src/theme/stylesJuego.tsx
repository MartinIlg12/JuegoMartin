import { StyleSheet } from 'react-native';


    export const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#ffffff',
            paddingHorizontal: 16,
            paddingTop: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            marginBottom: 16,
            textAlign: 'center',
        },
        galleryContainer: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        playerContainer: {
            width: '48%',
            aspectRatio: 1,
            marginBottom: 16,
            borderRadius: 8,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#ddd',
        },
        playerImage: {
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
        },
        
        playerName: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
            padding: 8,
            textAlign: 'center',
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
        },
        selectedPlayerContainer: {
            marginTop: 20,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#ddd',
            padding: 16,
        },
        selectedPlayerText: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 8,
        },
        selectedPlayerImage: {
            width: 150,
            height: 150,
            resizeMode: 'cover',
            borderRadius: 75,
            marginBottom: 8,
        },
        selectedPlayerName: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 4,
        },
        selectedPlayerDetails: {
            fontSize: 16,
            marginBottom: 4,
        },
        homeButton: {
            position: 'absolute',
            top: 10,
            left: 20,
            zIndex: 10,
            backgroundColor: 'white', 
            borderRadius: 25,
            width: 50,
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
        },
    });
    
    export default styles;
    