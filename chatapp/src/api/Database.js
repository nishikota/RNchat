import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getDBdata = async () => {
  console.log('getDB');
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
  console.log('userDB', email);
  let refData = [];
  await firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        refData.push(doc.data());
        console.log(doc);
      });
    });
  return refData;
};

export const registrationDB = (name, msg, email) => {
  const nowTime = new Date().toLocaleString();
  firestore().collection('chat').add({
    sendTime: nowTime,
    name: name,
    msg: msg,
    email: email,
  });
};

const registrationUser = (name, email) => {
  console.log('userRegister');
  firestore().collection('users').add({
    name: name,
    email: email,
  });
};
export const userRegistration = (name, email, password) => {
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
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signIn success');
    });
};

export const logout = () => {
  auth()
    .signOut()
    .then(() => {
      console.log('logout');
    });
};

export const checkUserLogin = () => {
  const user = auth().currentUser;
  return user;
};
