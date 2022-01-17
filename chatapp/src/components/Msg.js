import React from 'react';
import {View, Text} from 'react-native';

const ChatMsg = ({value}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.time}>
        {value.sendTime}
        <Text style={styles.name}>{value.name}</Text>
      </Text>
      <View style={styles.msgWrapper}>
        <Text style={styles.msgContent}>{value.msg}</Text>
      </View>
    </View>
  );
};

export default ChatMsg;

const styles = {
  wrapper: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  msgWrapper: {
    backgroundColor: '#F89C86',
    borderTopLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: '#0052B2',
  },
  msgContent: {
    color: 'black',
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  time: {
    color: 'white',
  },
  name: {
    color: '#0052B2',
  },
};
