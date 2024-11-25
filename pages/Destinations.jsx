import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { getDestinations } from '../components/api';

const Destinations = ({ navigation }) => {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDestinations();
      const sortedDestinations = data.sort((a, b) => b.favorites - a.favorites);
      setDestinations(sortedDestinations);
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={[styles.tag, styles[item.difficulty.toLowerCase()]]}>{item.difficulty}</Text>
      <Button
        title="Edit"
        onPress={() => navigation.navigate('AddEditDestination', { destination: item })}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        title="Add Destination"
        onPress={() => navigation.navigate('AddEditDestination')}
      />
      <FlatList
        data={destinations}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
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
  },
  fácil: {
    backgroundColor: 'green',
  },
  moderada: {
    backgroundColor: 'yellow',
  },
  difícil: {
    backgroundColor: 'purple',
  },
});

export default Destinations;