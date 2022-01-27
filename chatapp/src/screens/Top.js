import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {userLogin, logout} from '../api/database';
import auth from '@react-native-firebase/auth';

const Top = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSwitch, setLoginSwitch] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
        console.log('true');
        setLoginSwitch(true);
        navigation.navigate('Chat');
      } else {
        setLoginSwitch(false);
      }
    });
    return () => {
      subscriber();
    };
  });

  const firstMove = async () => {
    console.log('firstMove');
    if (loginSwitch === true) {
      console.log('moving display');
      navigation.navigate('Chat');
    }
  };
  const loginButton = async () => {
    if (loginSwitch === false) {
      console.log('LoginMove');
      userLogin(email, password);
      await firstMove();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Who are you ?</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.inputArea}
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Pass</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.inputArea}
          autoCapitalize="none"
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignUp')}
        style={styles.button}>
        <Text style={styles.buttonMsg}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => loginButton(email, password)}
        style={styles.button}>
        <Text style={styles.buttonMsg}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()} style={styles.button}>
        <Text style={styles.buttonMsg}>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Top;

const styles = {
  wrapper: {
    backgroundColor: '#81CFFF',
    marginLeft: 10,
    marginRight: 10,
    marginVertical: 10,
    height: 770,
    borderRadius: 10,
  },
  title: {
    backgroundColor: '#0052B2',
    color: 'white',
    fontSize: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginVertical: 20,
    width: '80%',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: '#0052B2',
    width: '30%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginVertical: 15,
    borderRadius: 20,
    padding: 3,
  },
  buttonMsg: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  inputText: {
    fontSize: 32,
    color: 'white',
  },
  inputArea: {
    backgroundColor: 'white',
    fontSize: 25,
    borderWidth: 1,
    width: '50%',
    padding: 2,
  },
  welcomeMsgWrapper: {
    marginVertical: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  welcomeMsgName: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  welcomeMsgFirst: {
    color: 'white',
    fontSize: 30,
    marginLeft: 70,
    width: '80%',
  },
  welcomeMsgSecond: {
    color: 'white',
    fontSize: 30,
    marginLeft: 180,
  },
};
