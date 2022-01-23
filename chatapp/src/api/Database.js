import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const getDBdata = async () => {
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

export const registrationDB = (msg, name, email) => {
  const nowTime = new Date().toLocaleString();
  firestore().collection('chat').add({
    sendTime: nowTime,
    msg: msg,
    name: name,
    email: email,
  });
};

export const userRegistration = (email, password) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log(`${email} registration success`);
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
  // console.log(user);
  return user;
};
