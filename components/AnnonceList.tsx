import React from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Annonce } from './Annonce';

interface AnnonceListProps {
  annonces: Annonce[];
  onPressAnnonce: (annonce: Annonce) => void;
}

const AnnonceList: React.FC<AnnonceListProps> = ({ annonces, onPressAnnonce }) => {
  return (
    <FlatList
      data={annonces}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPressAnnonce(item)}>
          <View>
            <View style={styles.infoContainer}>
              <Text style={styles.model}>{item.model}</Text>
              <Text style={styles.releaseDate}>{item.releaseDate}, {item.price}€</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  model: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  releaseDate: {
    fontSize: 14,
    color: '#555',
  },
  price: {
    fontSize: 14,
    color: '#555',
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default AnnonceList;
