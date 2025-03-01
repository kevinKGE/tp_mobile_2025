import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../features/favoritesSlice';
import { RootState } from '../store';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from "@react-native-material/core";

type AnnonceDetailsRouteProp = RouteProp<RootStackParamList, 'Details'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

interface AnnonceDetailsProps {
    route: AnnonceDetailsRouteProp;
}

const AnnonceDetails: React.FC<AnnonceDetailsProps> = ({ route }) => {
    const { annonce } = route.params;
    const dispatch = useDispatch();
    const navigation = useNavigation<NavigationProp>();
    const isFavorite = useSelector((state: RootState) =>
        state.favorites.favorites.find((fav) => fav.id === annonce.id)
    );

    const handleAddFavorite = () => {
        dispatch(addFavorite(annonce));
        navigation.navigate('Favorites');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.model}>{annonce.model}</Text>
            <Text style={styles.price}>Prix: {annonce.price}€</Text>
            <Text style={styles.os}>Système d'exploitation: {annonce.os}</Text>
            <Text style={styles.constructor}>Marque: {annonce.constructor}</Text>
            <Text style={styles.releaseDate}>Année de sortie: {annonce.releaseDate}</Text>
            <Text style={styles.titre}>Vendeur:</Text>
            <View style={styles.header}>
                <Image source={{ uri: annonce.salerAvatar }} style={styles.avatar} />
                <View style={styles.infoContainer}>
                    <Text style={styles.saler}>{annonce.salerGender === 'Female' ? 'Mme.' : 'M.'} {annonce.saler}</Text>
                    <Text style={styles.location}>Pays: {annonce.salerCountry}, Ville: {annonce.salerCity}</Text>
                    <Text style={styles.phone}>Tel: {annonce.phone}</Text>
                </View>
            </View>
            <Text style={styles.titre}>Description:</Text>
            <Text style={styles.description}>{annonce.description}</Text>
            {isFavorite ? (
                <Button title="Supprimer des favoris" onPress={() => dispatch(removeFavorite(annonce.id))} />
            ) : (
                <Button title="Ajouter aux favoris" onPress={handleAddFavorite} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    model: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    releaseDate: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    price: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    os: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    constructor: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    saler: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    location: {
        fontSize: 16,
        color: '#555',
        marginBottom: 5,
    },
    phone: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    titre: {
        fontSize: 16,
        color: '#555',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default AnnonceDetails;