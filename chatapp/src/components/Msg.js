import React from 'react';
import {View, Text} from 'react-native';

const ChatMsg = ({value}) => {
  return (
    <View>
      <Text>
        {value.sendTime}
        <Text>{value.name}</Text>
      </Text>
      <Text style={styles.msgContent}>{value.msg}</Text>
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
