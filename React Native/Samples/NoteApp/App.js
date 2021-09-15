import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, TouchableOpacity, Touchable, TextInput, AsyncStorageStatic } from 'react-native';


export default function App() {

  const [state, setState] = useState('read');
  const [note, setNote] = useState('');

  useEffect(() => {

    (async () => {
      try{
        const noteRead = await AsyncStorage.getItem('note');
        setNote(noteRead);
      }catch(error){

      }
    })();
    
  },[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('note', note);
    }catch(error){

    }

    alert('Your note is saved sucessfully');
  }

  function updateText(){
    setState('read');
  }

  if(state == 'read'){
    return(
      <View style={{flex:1}}>
        <StatusBar style="light" />
        <View style={styles.header}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
            Note App
          </Text>
        </View>
        
        {
          (note != '')?
          <View style={{padding: 20}}>
            <Text style={styles.note}>
              {note}              
            </Text>            
          </View>
          :
          <View style={{padding: 20}}>
            <Text style={{opacity: 0.3}}>
              Empty              
            </Text>            
          </View>
        }

        <TouchableOpacity onPress={() => setState('updating')} style={styles.btnNote}>
          {
            (note == "")?
            <Text style={styles.btnNoteText}>
              +
            </Text>
          :
          <Text style={{fontSize: 12, color: 'white', textAlign: 'center',marginTop: 16}}>
            Edit
          </Text>
          }
        </TouchableOpacity>

      </View>
    )
  }else if(state == 'updating'){
    return(
      <View style={{flex: 1}}>
      <StatusBar style ="light" />
        <View style={styles.header}>
          <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
            Note App
          </Text>
        </View>

        <TextInput autoFocus={true} onChangeText={(text) => setNote(text)} style={{padding: 20, height: 300, textAlignVertical: 'top'}} multiline={true} numberOfLines={5} value={note}>
        
        </TextInput>

        <TouchableOpacity onPress={() => setState('read')} style={styles.btnSave}>
          <Text style={{textAlign: 'center', color: 'white'}}>
            Save
          </Text>
        </TouchableOpacity>

      </View>
    )


  }
  
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: '#069'
  },

  note:{
    fontSize: 14
  },

  btnNote:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 50,
    height: 50,
    backgroundColor: '#069',
    borderRadius: 25
  },

  btnNoteText:{
    color: 'white',
    position: 'relative',
    textAlign: 'center',
    top: 3,
    fontSize: 30
  },

  btnSave:{
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,    
    backgroundColor: '#069',
    borderRadius: 25
  }
});