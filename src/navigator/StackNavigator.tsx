import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/Register';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../configs/firebaseConfig';
import { View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { styles } from '../theme/styles';
import { DetailMessageScreen } from '../screens/HomeScreen/DetailMessageScreen';
import { Juego } from '../screens/Juego/Juego';
import { PlayerScreen } from '../screens/Juego/PlayerScreen';
import SelectedPlayersScreen from '../screens/Juego/SelectedPlayersScreen';


const Stack = createStackNavigator();


interface Routes {
    name: string;
    screen: React.ComponentType<any>;
    headerShow?: boolean;
}


const routes: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen },
    { name: "Home", screen: HomeScreen },
    { name: "Detail", screen: DetailMessageScreen, headerShow: false },
    { name: "Juego", screen: Juego },
    { name: "PlayerScreen", screen: PlayerScreen },
    {name: "SelectedPlayersScreen", screen: SelectedPlayersScreen}
];

export const StackNavigator = () => {
    
    const [isAuth, setIsAuth] = useState<boolean>(false);

    
    const [isLoading, setIsLoading] = useState<boolean>(false);

    
    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            
            if (user) {
                setIsAuth(true);
            }
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.root}>
                    <ActivityIndicator size={40} />
                </View>
            ) : (
                <Stack.Navigator initialRouteName={isAuth ? 'Home' : 'Login'}>
                    {routes.map((item, index) => (
                        <Stack.Screen
                            key={index}
                            name={item.name}
                            options={{ headerShown: item.headerShow ?? false }}
                            component={item.screen}
                        />
                    ))}
                </Stack.Navigator>
            )}
        </>
    );
};
