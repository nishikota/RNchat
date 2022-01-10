import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {getDBdata, registrationDB} from '../api/Database';

const Chat = ({route, navigation}) => {
  const [inputContent, setInputContent] = useState('');
  const name = route.params;
  const buttonMove = () => {
    registrationDB(inputContent, name);
    getDBdata();
    setInputContent('');
  };
  return (
    <View>
      <Text>Chat</Text>
      <TextInput onChangeText={setInputContent} value={inputContent} />
      <TouchableOpacity onPress={() => buttonMove()}>
        <Text>Send</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Exit bye</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
