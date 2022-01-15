import firestore from '@react-native-firebase/firestore';

export const registrationDB = (msg, name) => {
  const nowTime = new Date().toLocaleString();
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
  let refData = [];
  await firestore()
    .collection('chat')
    .limit(3)
    .orderBy('sendTime', 'desc')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        refData.push(doc.data());
      });
    });
  return refData;
};
