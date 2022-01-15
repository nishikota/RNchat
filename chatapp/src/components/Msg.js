import React from 'react';
import {View, Text} from 'react-native';

const ChatMsg = value => {
  console.log(value);
  return (
    <View>
      <Text>1111</Text>
      <Text>
        {value.value.sendTime}
        <Text>{value.value.name}</Text>
      </Text>
      <Text style={styles.msgContent}>{value.value.msg}</Text>
    </View>
  );
};

export default ChatMsg;

const styles = {
  msgContent: {
    color: 'black',
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
