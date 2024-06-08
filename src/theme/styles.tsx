import { StyleSheet } from "react-native"
export const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        backgroundColor: 'black',
        color: 'white'
    },
    inputs: {
        width: "89%",
        maxWidth: '90%',
        backgroundColor: 'black',
        borderColor: 'grey',
        borderRadius: 20 ,
        color: 'white'
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    textGame: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginRight: 10,
      },
    textHome: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        width: "90%",
        backgroundColor: 'grey',
    },
    button2: {
        width: "90%",
        backgroundColor: 'black',
    },
    textRedirect: {
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white'
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    routeHome: {
        flex: 1,
        backgroundColor:'black',
        color:'white'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        color:'white',
        marginTop: 50,
    },
    iconEnd: {
        gap: 20,
        flex: 1,
        alignItems: 'flex-end',
        
    },
    icon: {
        gap: 20,
        marginLeft:20,
        backgroundColor:'#0CBBBB'
    },
    iconEdit: {
        backgroundColor:'white'
    },
    modal: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'grey',
        gap: 10
    },
    routeMessage: {
        borderRadius: 20,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 20,
        alignItems: 'center',
        backgroundColor: '#D5E4E4',
    },
    fabMessage: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        backgroundColor: 'grey'
    }
})
