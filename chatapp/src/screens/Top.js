import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';

const Top = ({navigation}) => {
  const [name, setName] = useState('');
  return (
    <View>
      <Text>Who are you ?</Text>
      <View>
        <Text>I'm</Text>
        <TextInput onChangeText={setName} value={name} />
      </View>
      <Text>{`OK ${name} !`}</Text>
      <Text>Let's Talk ! Have fun !</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat', {name: name})}>
        <Text>Enter</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Top;
