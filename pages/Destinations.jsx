import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, Platform, TouchableOpacity } from 'react-native';
import { getDestinations, deleteDestination, toggleFavorite } from '../components/api';

const Destinations = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);
  const [sortByFavorites, setSortByFavorites] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDestinations();
      setDestinations(data);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDestination(id);
    setDestinations(destinations.filter(destination => destination.id !== id));
  };

  const handleToggleFavorite = async (id, isFavorite) => {
    await toggleFavorite(id, isFavorite);
    const updatedDestinations = destinations.map(destination => 
      destination.id === id ? { ...destination, favorites: isFavorite } : destination
    );
    setDestinations(updatedDestinations);
  };

  const handleSortByFavorites = () => {
    setSortByFavorites(!sortByFavorites);
    const sortedDestinations = [...destinations].sort((a, b) => b.favorites - a.favorites);
    setDestinations(sortedDestinations);
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={[styles.tag, styles[item.difficulty.toLowerCase()]]}>{item.difficulty}</Text>
      <TouchableOpacity style={styles.commonButton} onPress={() => navigation.navigate('AddEditDestination', { destination: item })}>
        <Text style={styles.commonButtonText}>Editar</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacer} />
      <TouchableOpacity style={styles.commonButton} onPress={() => handleDelete(item.id)}>
        <Text style={styles.commonButtonText}>Borrar</Text>
      </TouchableOpacity>
      <View style={styles.buttonSpacer} />
      <TouchableOpacity style={styles.commonButton} onPress={() => handleToggleFavorite(item.id, !item.favorites)}>
        <Text style={styles.commonButtonText}>{item.favorites ? "Desmarcar Favorito" : "Marcar Favorito"}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title={Platform.OS === 'ios' ? "Crear Destino" : "Agregar Destino"}
          onPress={() => navigation.navigate('AddEditDestination')}
          color={Platform.OS === 'ios' ? 'green' : 'blue'}
        />
        <View style={styles.buttonSpacer} />
        <Button
          title="Ordenar por Favoritos"
          onPress={handleSortByFavorites}
          color="green"
        />
      </View>
      <FlatList
        data={destinations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonSpacer: {
    width: 10,
  },
  list: {
    width: '85%',
    alignSelf: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
  },
  tag: {
    padding: 5,
    borderRadius: 5,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  fácil: {
    backgroundColor: 'green',
  },
  moderada: {
    backgroundColor: 'yellow',
  },
  difícil: {
    backgroundColor: 'red',
  },
  buttonSpacer: {
    margin: 5,
  },
  commonButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  commonButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Destinations;