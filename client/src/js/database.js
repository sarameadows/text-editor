import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accepts some content and adds it to the database
export const putDb = async (content) => {
  // create connection to the IndexedDB database and the version we want to use
  const jateDb = await openDB('jate', 1);
  // create a new transaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readwrite');
  // open up the desired object store
  const store = tx.objectStore('jate');
  // use the .delete() method to get all data in the database
  const request = store.put({jate: content});
  // get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// Gets all the content from the database
export const getDb = async () => {
  // create connection to the IndexedDB database and the version we want to use
  const jateDb = await openDB('jate', 1);
  // create a new transaction and specify the store and data privileges
  const tx = jateDb.transaction('jate', 'readonly');
  // open the desired object store
  const store = tx.objectStore('jate');
  // use the .getAll() method to get all data in the database
  const request = store.getAll();
  // get confirmation of the request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();