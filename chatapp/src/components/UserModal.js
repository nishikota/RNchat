import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {logout} from '../api/database';

const UserModal = value => {
  const {name, email} = value;
  return (
    <View style={styles.wrapper}>
      <View style={styles.status}>
        <Text style={styles.statusText}>
          Name: <Text style={styles.user}>{name}</Text>
        </Text>
        <Text style={styles.statusText}>
          Email: <Text style={styles.user}>{email}</Text>
        </Text>
      </View>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => logout()} style={styles.button}>
          <Text style={styles.buttonMsg}>logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserModal;

const styles = {
  wrapper: {
    width: '60%',
    backgroundColor: '#0052B2',
    borderRadius: 10,
    padding: 5,
    marginHorizontal: 20,
    marginTop: 5,
  },
  buttonWrapper: {},
  status: {},
  user: {
    color: 'white',
  },
  statusText: {
    color: 'black',
    fontSize: 20,
  },
  button: {
    width: '90%',
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
