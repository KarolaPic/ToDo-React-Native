import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../components/ListItem';
import { removeNote } from '../store/noteSlice';
import { updateNote } from '../store/noteSlice';


/**
 * NOTE
 * id: int
 * title: string
 * text: string
 */

const Home = ({ navigation }) => {
  const { notes } = useSelector(state => state.notes)
  const dispatch = useDispatch()

  const deleteNote = (noteId) => {
    dispatch(removeNote(noteId))
  }
  const updateNote = (note) => {
    navigation.navigate('Details', { note: note })
  }

  const goToNoteDetails = (note) => {
    navigation.navigate('Details', { note: note })
  }

  return (
    <View style={styles.container}>
      <Button
        title="Go to profile"
        onPress={() =>
          navigation.navigate('Profile', { name: 'Karol Piñon' })
        }
      />
      <Text style={styles.title}>Bloc de notas!</Text>
      <Image source={{ uri: 'https://static.vecteezy.com/system/resources/previews/000/504/617/non_2x/notes-icon-design-vector.jpg' }} style={styles.image} />
      <Button
        title="Nueva nota"
        onPress={() =>
          navigation.navigate('Details')
        }
      />
      <View style={styles.listContainer}>
        <FlatList
          data={notes}
          renderItem={({ item }) => <ListItem
            note={item}
            onNoteSelect={goToNoteDetails}
            onDelete={deleteNote}
            onEdit={updateNote}
          />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  listContainer: {
    flex: 1,
  },
});

export default Home;
