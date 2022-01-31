import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import {getMsgId, deleteMsg} from '../api/database';

const ChatMsg = ({value, email, setDeleteSwitch}) => {
  const [modalSwitch, setModalSwitch] = useState(false);
  const [msgId, setMsgId] = useState('');

  const handleModal = async () => {
    if (value.email !== email) {
      setModalSwitch(false);
    } else {
      setModalSwitch(true);
      const id = await getMsgId(value);
      setMsgId(id);
    }
  };
  const deleteMoving = async () => {
    await deleteMsg(msgId);
    setDeleteSwitch(true);
    setModalSwitch(false);
  };
  const modal = () => {
    return (
      <View>
        <Text>このメッセージを削除しますか？</Text>
        <TouchableOpacity onPress={() => deleteMoving(msgId)}>
          <Text>はい</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalSwitch(false)}>
          <Text>いいえ</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onLongPress={() => handleModal()}>
        <Text style={value.email !== email ? styles.time : styles.myTime}>
          {value.sendTime}
          <Text style={value.email !== email ? styles.name : styles.myName}>
            {value.name}
          </Text>
        </Text>
        <View
          style={
            value.email !== email ? styles.msgWrapper : styles.myMsgWrapper
          }>
          <Text style={styles.msgContent}>{value.msg}</Text>
        </View>
      </TouchableOpacity>
      {modalSwitch === true ? modal() : null}
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
  myTime: {
    color: 'white',
    marginLeft: '20%',
  },
  name: {
    color: '#0052B2',
  },
  myName: {
    color: '#F5273F',
  },
};
