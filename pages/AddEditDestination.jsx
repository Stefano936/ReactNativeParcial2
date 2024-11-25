import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { addDestination, editDestination } from '../components/api';

const AddEditDestination = ({ route, navigation }) => {
  const { destination } = route.params || {};
  const [name, setName] = useState(destination ? destination.name : '');
  const [description, setDescription] = useState(destination ? destination.description : '');
  const [difficulty, setDifficulty] = useState(destination ? destination.difficulty : 'Fácil');

  const handleSubmit = async () => {
    const newDestination = { name, description, difficulty };
    if (destination) {
      await editDestination(destination.id, newDestination);
    } else {
      await addDestination(newDestination);
    }
    navigation.navigate('Destinations');
  };

  return (
    <View style={styles.container}>
      <Text>Nombre del destino:</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text>Descripción breve:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />
      <Text>Nivel de dificultad:</Text>
      <TextInput style={styles.input} value={difficulty} onChangeText={setDifficulty} />
      <Button title="Guardar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});

export default AddEditDestination;