import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import AnnonceList from '../components/AnnonceList';
import { Annonce } from '../components/Annonce';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Text, Button } from "@react-native-material/core";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
    const [annonces, setAnnonces] = useState<Annonce[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [sortOrder, setSortOrder] = useState<'none' | 'asc' | 'desc'>('none');

    const navigation = useNavigation<HomeScreenNavigationProp>();

    const favoritesCount = useSelector((state: RootState) => state.favorites.favorites.length);

    useEffect(() => {
        const fetchAnnonces = async () => {
            try {
                const data = require('../donnees/phone.json');
                setAnnonces(data || []);
            } catch (error) {
                console.error('Error fetching annonces:', error);
                setAnnonces([]);
            }
        };

        fetchAnnonces();
    }, []);

    const handlePressAnnonce = (annonce: Annonce) => {
        navigation.navigate('Details', { annonce });
    };

    const toggleSortOrder = () => {
        setSortOrder(prevOrder => {
            if (prevOrder === 'none') return 'asc';
            if (prevOrder === 'asc') return 'desc';
            return 'none';
        });
    };

    const filteredAnnonces = annonces
        .filter(annonce =>
            annonce.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
            annonce.constructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            annonce.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortOrder === 'none') return 0;
            const orderMultiplier = sortOrder === 'asc' ? 1 : -1;
            return a.model.localeCompare(b.model) * orderMultiplier;
        });

    return (
        <View style={styles.container}>
            <Button
                title={`Mes favoris (${favoritesCount})`}
                onPress={() => navigation.navigate('Favorites')}
            />
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <Button
                title={`Trier par modèle (${sortOrder})`}
                onPress={toggleSortOrder}
            />
            <Text style={styles.annonceCount}>Nombre d'annonces: {filteredAnnonces.length}</Text>
            <AnnonceList annonces={filteredAnnonces} onPressAnnonce={handlePressAnnonce} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: 15,
    },
    annonceCount: {
        fontSize: 16,
        marginBottom: 10,
    }
});

export default HomeScreen;
