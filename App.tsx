import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from './store';
import HomeScreen from './screens/HomeScreen';
import AnnonceDetails from './screens/AnnonceDetails';
import FavoritesScreen from './screens/FavoritesScreen';
import {Annonce} from './components/Annonce';

export type RootStackParamList = {
    Home: undefined;
    Details: { annonce: Annonce };
    Favorites: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                        <Stack.Screen name="Home" component={HomeScreen}/>
                        <Stack.Screen name="Details" component={AnnonceDetails}/>
                        <Stack.Screen name="Favorites" component={FavoritesScreen}/>
                    </Stack.Navigator>
                </NavigationContainer>
        </Provider>
    );
}