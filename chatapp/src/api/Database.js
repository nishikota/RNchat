import firestore from '@react-native-firebase/firestore';

export const registrationDB = async (msg, name) => {
  const nowTime = new Date().toLocaleString();
  console.log('registration:', msg);
  firestore()
    .collection('chat')
    .add({
      sendTime: nowTime,
      msg: msg,
      name: name.name,
    })
    .then(() => {
      console.log('add DB');
    });
};

export const getDBdata = async () => {
  console.log('get');
  await firestore()
    .collection('chat')
    .doc('gugV7yk4V1Wt08s2AYUL')
    .onSnapshot(documentSnapshot => {
      console.log('documentSnapshot:', documentSnapshot.data().msg);
    });
};
