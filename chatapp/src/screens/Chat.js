import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Dimensions,
} from 'react-native';
import {getDBdata, registrationDB} from '../api/Database';
import ChatMsg from '../components/Msg';

const Chat = ({route}) => {
  const {name, firstDBdata} = route.params;
  const sortedDBdata = firstDBdata.reverse();
  const [inputContent, setInputContent] = useState('');
  const [msg, setMsg] = useState([sortedDBdata]);

  const getNewMsg = async () => {
    const newMsg = await getDBdata();
    const sortNewMsg = newMsg.reverse();
    setMsg(sortNewMsg);
  };

  const buttonMove = () => {
    registrationDB(inputContent, name);
    setInputContent('');
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (inputContent === '') {
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
      <View style={styles.scroll}>
        <ScrollView>{msgRope(msg)}</ScrollView>
      </View>
      <View style={styles.sendArea}>
        <TextInput
          onChangeText={setInputContent}
          value={inputContent}
          autoCapitalize="none"
          style={styles.inputArea}
          keyboardType="phone-pad"
        />
        <TouchableOpacity onPress={() => buttonMove()} style={styles.button}>
          <View style={styles.buttonBack} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Chat;

const {height} = Dimensions.get('window');

const styles = {
  wrapper: {
    backgroundColor: '#81CFFF',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    height: 770,
    borderRadius: 10,
  },
  scroll: {
    height: '85%',
  },
  sendArea: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'flex-end',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    height: '15%',
    backgroundColor: '#81CFFF',
  },
  inputArea: {
    backgroundColor: 'white',
    color: 'black',
    fontSize: 20,
    borderRadius: 10,
    width: '80%',
    height: '100%',
    marginRight: 10,
  },
  buttonBack: {
    backgroundColor: 'transparent',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 30,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    transform: [{rotate: '90deg'}],
    borderBottomColor: '#0052B2',
    marginLeft: 30,
  },
};
