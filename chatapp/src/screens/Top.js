import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {getDBdata} from '../api/Database';

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

const Top = ({navigation}) => {
  const [name, setName] = useState('');
  const buttonMove = async () => {
    const firstDBdata = await getDBdata();
    if (firstDBdata) {
      navigation.navigate('Chat', {name: name, firstDBdata: firstDBdata});
    }
  };
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Who are you ?</Text>
      <View style={styles.inputWrapper}>
        <Text style={styles.inputText}>I'm...</Text>
        <TextInput
          onChangeText={setName}
          value={name}
          style={styles.inputArea}
        />
      </View>
      {welcomeMsg(name)}
      {name ? (
        <TouchableOpacity onPress={() => buttonMove()} style={styles.button}>
          <Text style={styles.buttonMsg}>Enter</Text>
        </TouchableOpacity>
      ) : (
        <Text style={styles.buttonMsg}>Tell me your name !</Text>
      )}
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
