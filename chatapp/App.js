/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import Top from './src/screens/Top';
import {createStackNavigator} from '@react-navigation/stack';

const App = () => {
  return (
    <SafeAreaView>
      <Top />
    </SafeAreaView>
  );
};

export default App;
