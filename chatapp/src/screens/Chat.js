import React, {useState, useEffect, useRef} from 'react';
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

const Chat = ({navigation}) => {
  const [inputContent, setInputContent] = useState('');
  const [msg, setMsg] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [name, setName] = useState('');
  const [deleteSwitch, setDeleteSwitch] = useState(false);
  const [userState, setUserState] = useState(false);
  const [loginState, setLoginState] = useState(true);

  const scrollViewRef = useRef(null);

  const scrollView = () => {
    scrollViewRef.current.scrollToEnd({animated: false});
  };

  useEffect(() => {
    const user = checkUserLogin();
    setUserEmail(user.email);
    return () => {
      checkUserLogin;
    };
  }, []);
  useEffect(() => {
    if (loginState === false) {
      navigation.navigate('Login');
    } else {
      null;
    }
  });
  useEffect(() => {
    scrollView();
  }, [msg]);

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

  useEffect(() => {
    if (deleteSwitch === true) {
      getNewMsg();
      setDeleteSwitch(false);
      scrollView();
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

  const getNewMsg = async () => {
    const newMsg = await getDBdata();
    const sortNewMsg = newMsg.reverse();
    setMsg(sortNewMsg);
  };
  const buttonMove = () => {
    registrationDB(name, inputContent, userEmail);
    setInputContent('');
    Keyboard.dismiss();
    scrollView();
  };

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
      <View style={styles.scroll}>
        <ScrollView ref={scrollViewRef}>{msgRope(msg)}</ScrollView>
      </View>
      <View style={styles.statusWrapper}>
        <TouchableOpacity
          onPress={() => modalHandler()}
          style={styles.statusButton}>
          <Text style={styles.statusText}>{name}</Text>
        </TouchableOpacity>
        {userState === true ? (
          <UserModal
            name={name}
            email={userEmail}
            setLoginState={setLoginState}
          />
        ) : null}
      </View>
      <View style={styles.sendArea}>
        <TextInput
          onChangeText={setInputContent}
          value={inputContent}
          autoCapitalize="none"
          style={styles.inputArea}
          keyboardType="default"
          textAlignVertical="top"
          multiline={true}
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
  statusWrapper: {
    position: 'absolute',
    top: 5,
    width: '100%',
  },
  statusButton: {
    position: 'absolute',
    right: 5,
    backgroundColor: '#0052B2',
    borderRadius: 10,
    Top: 5,
  },
  statusText: {
    color: 'white',
    margin: 5,
    fontSize: 15,
  },
  scroll: {
    height: '83%',
    paddingVertical: 5,
    marginTop: 5,
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
    padding: 3,
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
