import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {logout} from '../api/Database';

const UserModal = value => {
  const {name, email, setLoginState} = value;
  const buttonMove = () => {
    logout();
    setLoginState(false);
  };
  return (
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.statusText}>Name: {name}</Text>
        <Text style={styles.statusText}>Email: {email}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => buttonMove()} style={styles.button}>
          <Text style={styles.buttonMsg}>logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserModal;

const styles = {
  wrapper: {
    width: '65%',
    backgroundColor: '#0052B2',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 20,
  },
  statusText: {
    color: 'white',
    fontSize: 20,
  },
  button: {
    width: '91%',
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonMsg: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
};
