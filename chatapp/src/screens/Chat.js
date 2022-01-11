import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {getDBdata, registrationDB} from '../api/Database';

const Chat = ({route}) => {
  const [inputContent, setInputContent] = useState('');
  const name = route.params;
  const buttonMove = () => {
    registrationDB(inputContent, name);
    getDBdata();
    setInputContent('');
  };
  return (
    <View style={styles.wrapper}>
      <Text>Chat</Text>
      <TextInput onChangeText={setInputContent} value={inputContent} />
      <TouchableOpacity onPress={() => buttonMove()}>
        <Text>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;

const styles = {
  wrapper: {
    backgroundColor: '#81CFFF',
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    backgroundColor: '#0052B2',
    color: 'white',
    fontSize: 30,
    margin: 'auto',
  },
  button: {
    backgroundColor: '#0052B2',
  },
  buttonMsg: {
    fontSize: 20,
    color: 'white',
  },
};
