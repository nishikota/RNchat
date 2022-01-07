import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Top = ({navigation}) => {
  return (
    <View>
      <Text>Are you OK ?</Text>
      <Text>Let's Talk !</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
        <Text>OK!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Top;
