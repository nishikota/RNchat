import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {userLogin} from '../api/database';
import auth from '@react-native-firebase/auth';

const Top = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSwitch, setLoginSwitch] = useState(true);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(async user => {
      if (user) {
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
    if (loginSwitch === true) {
      navigation.navigate('Chat');
    }
  };
  const loginButton = async () => {
    if (loginSwitch === false) {
      userLogin(email, password);
      setEmail('');
      setPassword('');
      await firstMove();
    }
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Do you have account ?</Text>
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
          secureTextEntry={true}
        />
      </View>
      <View style={styles.allButtonWrapper}>
        <View style={styles.inButtonWrapper}>
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
        </View>
      </View>
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
    marginTop: 30,
    marginBottom: 50,
    width: '90%',
    textAlign: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
  allButtonWrapper: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  inButtonWrapper: {
    flexDirection: 'row',
    marginTop: 50,
  },
  button: {
    backgroundColor: '#0052B2',
    width: '30%',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginVertical: 30,
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
    justifyContent: 'space-between',
    marginVertical: 30,
    marginHorizontal: 20,
  },
  inputText: {
    fontSize: 32,
    color: 'white',
  },
  inputArea: {
    backgroundColor: 'white',
    fontSize: 20,
    borderWidth: 1,
    width: '60%',
    padding: 2,
  },
};
