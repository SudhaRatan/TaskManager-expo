import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  { name: 'Main.db', location: "default" },
  () => { },
  err => console.log(err)
)

export const CreateCategoriesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "categories" (
        "id"	INTEGER NOT NULL,
        "iconColor"	VARCHAR NOT NULL,
        "iconName"	VARCHAR NOT NULL,
        "name"	VARCHAR NOT NULL UNIQUE,
        PRIMARY KEY("id" AUTOINCREMENT)
      );`, [],
      () => { },
      err => console.log(err)
    )
  })
}

export const CreateTasksTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS "tasks" (
        "id"	INTEGER NOT NULL,
        "categoryId"	INTEGER NOT NULL,
        "name"	TEXT NOT NULL,
        "checked"	INTEGER DEFAULT 0,
        "Date" INTEGER NOT NULL,
        PRIMARY KEY("id" AUTOINCREMENT)
        FOREIGN KEY(categoryId) REFERENCES categories(id)
        ON DELETE CASCADE
      );`, [],
      () => { },
      err => console.log(err)
    )
  })
}

export const insertCategory = ({ name, iconName, iconColor }) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `insert into categories (
          name,
          iconColor,
          iconName
          ) values (?, ?, ?);`,
        [name, iconColor, iconName],
        () => {
          resolve({
            stat: true,
            message: "Category added"
          })
        },
        err => {
          // console.log(err)
          reject({
            stat: false,
            message: "Category already exists"
          })
        }
      )
    })
  })
}

export const insertTask = (name, categoryId) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `insert into tasks (
          categoryId,
          name,
          "Date"
          ) values (?,?,?);`,
        [categoryId, name, Date.now()],
        () => {
          resolve({ stat: true, message: 'Task added' })
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}

export const SelectCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from categories order by id desc;`,
        [],
        (tx, res) => {
          let len = res.rows.length
          if (len > 0) {
            let results = []
            for (let i = 0; i < len; i++) {
              results.push(res.rows.item(i))
            }
            resolve({
              stat: true,
              res: results
            })
          } else {
            reject({ stat: false })
          }
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}

export const SelectCategoryColor = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select iconColor from categories where id = ?;`,
        [id],
        (tx, res) => {
          let len = res.rows.length
          if (len === 1) {
            // console.log(res.rows.item(0).iconColor)
            resolve(res.rows.item(0).iconColor)
          } else {
            reject({ stat: false })
          }
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}



export const SelectLatestTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `select * from tasks order by "Date" desc limit 10;`,
        [],
        (tx, res) => {
          let len = res.rows.length
          if (len > 0) {
            let results = []
            for (let i = 0; i < len; i++) {
              results.push(res.rows.item(i))
            }
            resolve({
              stat: true,
              res: results
            })
          } else {
            reject({ stat: false })
          }
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}

export const dropCategories = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `drop table categories`,
        [],
        (tx, res) => {
          resolve({
            stat: true
          })
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}

export const dropTasks = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `drop table tasks`,
        [],
        (tx, res) => {
          resolve({
            stat: true
          })
        },
        err => {
          console.log(err)
          reject({ stat: false })
        }
      )
    })
  })
}

