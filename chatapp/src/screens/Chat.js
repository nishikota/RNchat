import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {getDBdata, registrationDB} from '../api/Database';
import ChatMsg from '../components/Msg';

const Chat = ({route}) => {
  const {name, firstDBdata} = route.params;
  const [inputContent, setInputContent] = useState('');
  const [msg, setMsg] = useState(firstDBdata);

  const getNewMsg = async () => {
    const newMsg = await getDBdata();
    setMsg(newMsg);
  };

  const buttonMove = () => {
    registrationDB(inputContent, name);
    setInputContent('');
  };

  useEffect(() => {
    if (inputContent === '') {
      console.log('effect');
      getNewMsg();
    }
  }, [inputContent]);
  const msgRope = data => {
    return (
      <View>
        {data.map((value, i) => (
          <ChatMsg value={value} key={i} />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {msg !== firstDBdata ? msgRope(msg) : msgRope(firstDBdata)}
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
