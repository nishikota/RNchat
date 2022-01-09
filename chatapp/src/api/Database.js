import firestore from '@react-native-firebase/firestore';

export const registrationDB = async msg => {
  // const nowTime = new Date().toLocaleString();
  console.log('DBfunction');
  // console.log(msg);
  const firebase = await firestore()
    .collection('chat')
    .doc('gugV7yk4V1Wt08s2AYUL')
    .onSnapshot(documentSnapshot => {
      console.log('documentsnapshot:', documentSnapshot.data().msg);
    });
  // console.log('firebase', firebase);
  // .add({
  //   sendTime: nowTime,
  //   msg: msg,
  // })
  // .then(() => {
  //   console.log('add DB');
  // });
};

export const getDBdata = async () => {
  await firestore()
    .collection('chat')
    .doc('gugV7yk4V1Wt08s2AYUL')
    .onSnapshot(documentSnapshot => {
      console.log('documentsnapshot:', documentSnapshot.data().msg);
    });
};
