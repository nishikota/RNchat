import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {getDBdata} from '../api/database';
import {userRegistration, checkUserLogin, logout} from '../api/database';

const welcomeMsg = name => {
  if (name) {
    return (
      <View style={styles.welcomeMsgWrapper}>
        <Text style={styles.welcomeMsgName}>{`OK ${name} !`}</Text>
        <Text style={styles.welcomeMsgFirst}>Let's Talk !</Text>
        <Text style={styles.welcomeMsgSecond}>Have fun !</Text>
      </View>
    );
  } else {
    return (
      <View>
        <Text />
        <Text />
      </View>
    );
  }
};

const SignUp = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const SignUpButton = async () => {
    console.log('signUpMove');
    userRegistration(email, password);
    const userState = await checkUserLogin();
    console.log('check', userState);
    if (userState) {
      console.log('return userState:', userState);
      const firstDBdata = await getDBdata();
      if (firstDBdata) {
        console.log('moving display:', firstDBdata);
        navigation.navigate('Chat', {
          name: name,
          firstDBdata: firstDBdata,
          email: email,
        });
      }
    }
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Who are you ?</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Name</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          style={styles.inputArea}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.inputArea}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={styles.inputArea}
        />
      </View>
      {welcomeMsg(name)}
      <TouchableOpacity onPress={() => SignUpButton()} style={styles.button}>
        <Text style={styles.buttonMsg}>SignUp</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => logout()} style={styles.button}>
        <Text style={styles.buttonMsg}>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

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
