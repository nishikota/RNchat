import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  Text,
} from 'react-native';
import {
  getDBdata,
  registrationDB,
  checkUserLogin,
  getDBUser,
} from '../api/database';
import ChatMsg from '../components/Msg';
import UserModal from '../components/UserModal';

const Chat = () => {
  const [inputContent, setInputContent] = useState('');
  const [msg, setMsg] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [deleteSwitch, setDeleteSwitch] = useState(false);
  const [userState, setUserState] = useState(false);

  useEffect(() => {
    const user = checkUserLogin();
    setUserEmail(user.email);
    return () => {
      checkUserLogin;
    };
  }, []);
  useEffect(() => {
    const nameHandler = async () => {
      const userName = await getDBUser(userEmail);
      setName(userName[0].name);
    };
    if (userEmail !== '') {
      nameHandler();
    }
    return () => {
      nameHandler;
    };
  }, [userEmail]);

  const getNewMsg = async () => {
    const newMsg = await getDBdata();
    const sortNewMsg = newMsg.reverse();
    setMsg(sortNewMsg);
  };
  const buttonMove = () => {
    registrationDB(name, inputContent, userEmail);
    setInputContent('');
    Keyboard.dismiss();
  };
  useEffect(() => {
    if (deleteSwitch === true) {
      getNewMsg();
      setDeleteSwitch(false);
    }
  }, [deleteSwitch]);

  useEffect(() => {
    if (inputContent === '') {
      getNewMsg();
    }
    return () => {
      getNewMsg;
    };
  }, [inputContent]);

  const msgRope = data => {
    return (
      <View>
        {data !== ''
          ? data.map((value, i) => (
              <ChatMsg
                value={value}
                key={i}
                email={userEmail}
                setDeleteSwitch={setDeleteSwitch}
              />
            ))
          : null}
      </View>
    );
  };
  const modalHandler = () => {
    if (userState === false) {
      setUserState(true);
    } else {
      setUserState(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View>
        <TouchableOpacity
          onPress={() => modalHandler()}
          style={styles.statusButton}>
          <Text style={styles.statusText}>MY PROFILE</Text>
        </TouchableOpacity>
        {userState === true ? (
          <UserModal name={name} email={userEmail} />
        ) : null}
      </View>
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

const styles = {
  wrapper: {
    backgroundColor: '#81CFFF',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    height: 770,
    borderRadius: 10,
  },
  statusButton: {
    position: 'absolute',
    right: 5,
    backgroundColor: '#0052B2',
    borderRadius: 10,
    marginTop: 5,
  },
  statusText: {
    color: 'white',
    margin: 5,
    fontSize: 15,
  },
  scroll: {
    height: '81%',
    paddingVertical: 5,
    marginTop: 30,
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
