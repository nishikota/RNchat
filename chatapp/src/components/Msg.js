import React from 'react';
import {View, Text} from 'react-native';

const ChatMsg = ({value, email}) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.time}>
        {value.sendTime}
        <Text style={value.email !== email ? styles.name : styles.myName}>
          {value.name}
        </Text>
      </Text>
      <View
        style={value.email !== email ? styles.msgWrapper : styles.myMsgWrapper}>
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
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderWidth: 1,
    borderColor: '#0052B2',
    marginRight: '20%',
  },
  myMsgWrapper: {
    backgroundColor: '#92F5B1',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: '#0052B2',
    marginLeft: '20%',
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
  myName: {
    color: '#F5273F',
  },
};
