import * as SQLite from 'expo-sqlite';
import { SECTION_LIST_MOCK_DATA } from './utils';

const db = SQLite.openDatabase('little_lemon');

export async function createTable() {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists menuitems (id integer primary key not null, uuid text, title text, price text, category text);'
        );
      },
      reject,
      resolve
    );
  });
}

export async function getMenuItems() {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('select * from menuitems', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}

export function saveMenuItems(menuItems) {
  const stringValues = menuItems.map((item) => {
    return `('${item.uuid}', '${item.title}', '${item.price}', '${item.category}')`;
  }).join(",");

  db.transaction((tx) => {
    tx.executeSql("INSERT INTO menuitems (uuid, title, price, category) VALUES " + String(stringValues)).then(([tx, results]) => {
      resolve(results);
    });
  }).then((result) => {
  }).catch((err) => {
    console.log(err);
  });
}

export async function filterByQueryAndCategories(query, activeCategories) {
  return new Promise((resolve) => {
    let newQuery = 'select * from menuitems where title like "%'+query+'%"';
    if (activeCategories.length > 0) {
      const categories = activeCategories.join('","');
      newQuery += ' AND category in ("'+ categories + '")';
    }

    db.transaction((tx) => {
      tx.executeSql(newQuery, [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });
}
