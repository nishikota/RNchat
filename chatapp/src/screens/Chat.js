import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {getDBdata} from '../api/Database';

const Chat = () => {
  const [inputContent, setInputContent] = useState('');
  return (
    <View>
      <Text>Chat</Text>
      <TextInput onChangeText={setInputContent} value={inputContent} />
      <TouchableOpacity onPress={() => getDBdata()}>
        <Text>送信</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;
