import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import AnnonceList from '../components/AnnonceList';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';
import { Button } from "@react-native-material/core";

type FavoritesScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Favorites'>;

const FavoritesScreen: React.FC<{ navigation: FavoritesScreenNavigationProp }> = ({ navigation }) => {
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredfarovites = favorites.filter(annonce =>
      annonce.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annonce.constructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      annonce.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Mes Favoris</Text>
        <TextInput
            style={styles.searchInput}
            placeholder="Rechercher..."
            value={searchQuery}
            onChangeText={setSearchQuery}
        />
        {favorites.length === 0 ? (
            <Text style={styles.emptyMessage}>Vous n'avez ajouté aucune annonce à vos favoris.</Text>
        ) : (
            <AnnonceList
                annonces={filteredfarovites}
                onPressAnnonce={(annonce) => navigation.navigate('Details', { annonce })}
            />
        )}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    marginTop: 15,
  },
});

export default FavoritesScreen;
