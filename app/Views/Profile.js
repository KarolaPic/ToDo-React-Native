import { AddIcon, Box } from 'native-base';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Button } from 'native-base';
import { launchImageLibrary } from 'react-native-image-picker';
import { addProfile } from '../store/profileSlice';


const Profile = ({ route }) => {
 // const [phone, setPhone] = React.useState(null)
  //const [description, setDescription] = React.useState('')
  const [resourcePath, setResourcePath] = React.useState({})

  const selectFile = () => {
    let options = {
      title: 'Select Image',
      customButtons: [
        {
          name: 'customOptionKey',
          title: 'Choose file from Custom Option'
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else {
        let source = res.assets[0];
        setResourcePath(prev => source)
      }
    });
  };

  const dispatch = useDispatch()
  const { profiles } = useSelector(state => state.profiles)
  const selectedPr = route.params?.profile

 
  //const [resourcePath, setResourcePath] = React.useState({})
  const [phone, setPhone] = useState(selectedPr ? selectedPr.phone : '')
  const [description, setDescription] = useState(selectedPr ? selectedPr.description : '')

  const handleSave = () => {
      const newProId = !!profiles.length
      ? notes[notes.length - 1].id + 1
      : 1
    const newP = {
      id: newProId,
      phone: phone,
      description: description
    }
    console.log("profile", newP, description)
    dispatch(addProfile(newP))
    navigation.goBack()
    
    
  }

  return (
    <ScrollView>
      <Box position="relative" w="100%" h={200}>
        <Image source={{ uri: resourcePath.uri }} style={styles.image} />
        <TouchableOpacity onPress={selectFile} style={styles.button}  >
          <AddIcon size="4" color="white" />
        </TouchableOpacity>
      </Box>
      <Text style={styles.title}>{route.params.name}</Text>
      <Text style={styles.caption}>Phone</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPhone}
        value={phone}
        placeholder="Phone number"
        keyboardType="numeric"
      />
      <Text style={styles.caption}>Description</Text>
      <TextInput
        style={styles.input}
        onChangeText={setDescription}
        value={description}
        placeholder="Something about you"
      />
      <Button
        style={styles.btn}
      >Guardar</Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#435460',
    textAlign: 'center',
  },
  image: {
    marginTop: 30,
    marginBottom: 20,
    resizeMode: 'cover',
    width: 140,
    height: 140,
    borderRadius: 999,
    alignSelf: 'center',
    backgroundColor: '#d2d2d2',
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
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    padding: 10,
  },
  button: {
    position: 'absolute',
    width: 35,
    height: 35,
    left: '50%',
    bottom: 25,
    marginLeft: 30,
    borderRadius: 999,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
});

export default Profile;
