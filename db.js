const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue } = require('firebase/database');
const fs = require('fs');

const firebaseConfig = {
  databaseURL: 'https://instagram-unfollowers-4368c-default-rtdb.asia-southeast1.firebasedatabase.app'
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const db = getDatabase();
const starCountRef = ref(db, '/');

onValue(starCountRef, (data) => {
  const responseData = data.val();;
  // const followers = responseData.followers.map(entry => console.log(entry.value))
  // fs.writeFileSync('firebaseData.json', JSON.stringify(responseData, null, 2), 'utf-8');
});


