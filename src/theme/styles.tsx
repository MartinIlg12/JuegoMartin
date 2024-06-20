import { StyleSheet } from "react-native"
export const styles=StyleSheet.create({
    root:{
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        gap:10,
    },
    headerContainer: {
        position: 'absolute',
        top: 40,
        right: 40,
        alignItems: 'center',
    },
    headerContainerImage: {
        top: 90,
        marginRight:-430,
        alignItems: 'center',
    },
    iconText: {
        right: 100,
        top: 40,
        alignItems: 'center',
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 25)',
        borderRadius: 5, 
        fontWeight: 'bold',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'center', 
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    inputs: {
        backgroundColor: 'black', 
        width: '90%', 
        color: '#000',
        borderRadius: 10,
    },
    text:{
        marginTop:80,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#ffffff',
        fontFamily: 'Roboto', 
        marginBottom: 20,
        textAlign: 'center',
        textShadowColor: '#00000', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5, 
    },
    button:{
        width: '90%',
        marginTop: 20,
        borderRadius: 20,
        height: 50,
        justifyContent: 'center',
        backgroundColor: 'white', 
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    textRedirect:{
        marginTop: 20,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
    },
    routeHome:{
        flex:1,
        marginVertical:55,
        marginHorizontal:15,
    },
    header:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        gap:15
    },
    iconEnd:{
        flex:1,
        alignItems:'flex-end'
    },
    modal:{
    backgroundColor: 'black', 
    padding: 20,
    margin: 20,
    borderRadius: 10,
    },
    headerModal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconEndModal: {
        alignSelf: 'flex-end',
    },
    textInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)', 
        marginBottom: 10,
    },
    textInputLabel: {
    color: '#333', 
    },
    textInputOutline: {
        borderRadius: 10, 
        borderColor: '#333', 
    },
    ModalText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        marginBottom: 20,
        padding: 10,
    },
    buttonModal: {
        backgroundColor: '#333333',  
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
    },
    buttonTextModal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF',  
        textAlign: 'center',
    },
    routeMessage:{
        borderRadius:20,
        flexDirection:'row',
        paddingHorizontal:15,
        paddingVertical:20,
        alignItems:'center'
    },
    fabMessage:{
        backgroundColor: '#000',  
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    rootDetail:{
        flex:1,
        paddingHorizontal:20,
        paddingVertical:20,
        backgroundColor:'#fff',
        gap:20
    },
    textDeatil:{
        fontWeight:'bold',
        fontSize:18
    },
    inconSingOut:{
        marginTop:25,
        alignItems:'center'
    },
    avatar: {
        backgroundColor: '#ffffff',
    },
    avatarLogOut: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-end',
        marginTop: 20,
        marginRight: 11,
    },
    textContainer: {
        marginLeft: 20,
    },
    iconImage: {
        width: 80,  
        height: 80,  
        marginLeft: 80,
        borderRadius: 80,
    },
    iconImageProfile: {
        width: 80,  
        height: 80,  
        borderRadius: 30,
    },
    bodySmall: {
        fontSize: 14,
        color: '#666666',
    },
    labelLarge: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#333333',
    },
    labelLargeGoats: {
        fontSize: 17,
        color: '#fff',
        backgroundColor: 'rgba(0, 0, 0, 25)',
        borderRadius: 5, 
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        marginTop:50,
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        position: 'absolute',
        top: 10,
        right: 20,
    },
    icon: {
        color: '#333333',
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    cardContent: {
        flex: 1,
        marginTop: 10,
    },
    labelLargeCard: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    bodyMedium: {
        fontSize: 16,
        color: '#666666',
    },
    iconContainerCard: {
        marginLeft: 10,
    },
    textContainerCards: {
       marginTop: 100,
       fontSize: 25,
        color: '#fff',
    },
    backgroundImageDetail: {
        flex: 1,
        resizeMode: 'cover', 
        justifyContent: 'center', 
        paddingHorizontal: 20, 
        paddingTop: 20, 
    },
    rootDetail2: {
        backgroundColor: 'black', 
        padding: 20,
        borderRadius: 10,
    },
    headlineSmall: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    bodyLarge: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginTop: 10,
    },
    bodyText: {
        fontSize: 14,
        color: '#ffffff',
        marginBottom: 10,
    },
    divider: {
        backgroundColor: '#ffffff',
        marginVertical: 10,
    },
    textLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    input: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', 
        color: '#ffffff',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        fontSize: 14,
    },
    buttonDetailAdd: {
        marginTop: 20,
        backgroundColor: '#3498db', 
    },
    buttonDetailDelete: {
        marginTop: 20,
        backgroundColor: '#e74c3c', 
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    iconLeft: {
        position: 'absolute',
        left: 20,
    },
    textJuego: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#Fff', 
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 4,
        textAlign: 'center',
        margin: 20,
    },
    buttonJuego: {
        backgroundColor: '#1E90FF',  
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#4682B4',  
        shadowOpacity: 0.8,
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 4,
        elevation: 5,  
        justifyContent: 'center', 
      },
      buttonTextJuego: {
        fontSize: 18,
        color: 'white', 
        fontWeight: 'bold',
        textAlign: 'center',
        textTransform: 'uppercase', 
      },
      emoji: {
        fontSize: 20,
    color: '#FFFFFF', 
  }, 
  buttonText: {
    fontSize: 20,
    color: '#333', 
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase', 
  },
  iconCabra: {
    width: 20, 
    height: 20, 
    marginRight: 8, 
  },
})