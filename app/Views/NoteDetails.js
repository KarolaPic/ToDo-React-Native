import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Button } from 'native-base';
import { addNote } from '../store/noteSlice';
import { updateNote } from '../store/noteSlice';


const NoteDetails = ({ navigation, route }) => {
  const dispatch = useDispatch()
  const { notes } = useSelector(state => state.notes)
  const selectedNote = route.params?.note
  const [title, setTitle] = useState(selectedNote ? selectedNote.title : '')
  const [text, setText] = useState(selectedNote ? selectedNote.text : '')
 

  const handleSave = () => {
    if(selectedNote){
      const updNote = {
        id: selectedNote.id,
        title: title,
        text: text
      }
      console.log("note", updNote, text)
      dispatch(updateNote(updNote))
      navigation.goBack()
    }
    else{
      const newNoteId = !!notes.length
      ? notes[notes.length - 1].id + 1
      : 1
    const newNote = {
      id: newNoteId,
      title: title,
      text: text
    }
    console.log("note", newNote, text)
    dispatch(addNote(newNote))
    navigation.goBack()
    }
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notas 📝</Text>
      <Text style={styles.caption}>Título</Text>
      <TextInput
        style={styles.input}
        onChangeText={setTitle}
        value={title}
        placeholder="Inserta el título de la nota"
      />
      <Text style={styles.caption}>Descripcion</Text>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        multiline
        numberOfLines={10}
        placeholder="Agrega una descripcion para tu nota"
      />
      <Button
        style={styles.btn}
        onPress={handleSave}
      >Guardar</Button>
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
    marginBottom: 20,
  },
  caption: {
    color: 'rgba(0, 0, 0, 0.4)',
    fontSize: 12,
    marginLeft: 12,
    marginBottom: 4,
  },
  input: {
    height: 40,
    margin: 12,
    marginTop: 0,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 4,
    padding: 10,
  },
  textarea: {
    marginTop: 0,
    margin: 12,
  },
  btn: {
    width: 120,
    marginTop: 16,
    marginRight: 12,
    alignSelf: 'flex-end',
  },
});

export default NoteDetails;
