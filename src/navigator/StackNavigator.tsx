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

const Stack = createStackNavigator();

interface Routes {
    name: string;
    screen: () => JSX.Element;
}
const routesNoAuth: Routes[] = [
    { name: "Login", screen: LoginScreen },
    { name: "Register", screen: RegisterScreen }
];
const routesAuth: Routes[] = [
    { name: "Home", screen: HomeScreen }
];

export const StackNavigator = () => {
    const [isAuth, setIsAuth] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);


    useEffect(() => {
        setIsLoading(true);
        onAuthStateChanged(auth, (user) => {
            //Validar si está autenticado
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
                <Stack.Navigator>
                    {
                        !isAuth ?
                            routesNoAuth.map((item, index) => (
                                <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                            ))
                            :
                            routesAuth.map((item, index) => (
                                <Stack.Screen key={index} name={item.name} options={{ headerShown: false }} component={item.screen} />
                            ))
                    }
                </Stack.Navigator>
            )}
        </>
    );
}