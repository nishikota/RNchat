import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getDBdata = async () => {
  console.log('getData');
  let refData = [];
  await firestore()
    .collection('chat')
    .limit(20)
    .orderBy('sendTime', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        refData.push(doc.data());
      });
    });
  return refData;
};
export const getDBUser = async email => {
  console.log('getUser');
  let refData = [];
  await firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        refData.push(doc.data());
      });
    });
  return refData;
};

export const registrationDB = (name, msg, email) => {
  console.log('registrationDB');
  const nowTime = new Date().toLocaleString();
  firestore().collection('chat').add({
    sendTime: nowTime,
    name: name,
    msg: msg,
    email: email,
  });
};

export const getMsgId = async value => {
  console.log('getId');
  let refData;
  await firestore()
    .collection('chat')
    .where('email', '==', value.email)
    .where('sendTime', '==', value.sendTime)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        refData = doc.id;
      });
    });
  return refData;
};

export const deleteMsg = async id => {
  console.log('delete');
  await firestore()
    .collection('chat')
    .doc(id)
    .delete()
    .then(() => {
      console.log('delete complete', id);
    });
};

const registrationUser = (name, email) => {
  console.log('registrationUser');
  firestore().collection('users').add({
    name: name,
    email: email,
  });
};
export const userRegistration = (name, email, password) => {
  console.log('createUser');
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      registrationUser(name, email);
      console.log(`${email} registration success`);
      return 'success';
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
        return error;
      }
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
        return error;
      }
      console.log(error);
      return error;
    });
};

export const userLogin = (email, password) => {
  console.log('login');
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {});
};

export const logout = () => {
  console.log('logout');
  auth()
    .signOut()
    .then(() => {});
};

export const checkUserLogin = () => {
  console.log('loginCheck');
  const user = auth().currentUser;
  return user;
};
