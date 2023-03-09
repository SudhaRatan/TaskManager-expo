import Datastore from "react-native-local-mongodb";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ct = new Datastore({ filename: 'categories', storage: AsyncStorage, autoload: true });
const tt = new Datastore({ filename: 'tasks', storage: AsyncStorage, autoload: true });


// categories //
const insertCategory = async (cat) => {
  try {
    await ct.insertAsync(cat)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const getCategories = async () => {

}

// tasks //

const checkCat = async () => {
  var catLength = await ct.findAsync()
  if (catLength.length > 0) return true
  else return false
}

const insertTask = async (task) => {
  if (checkCat) {
    tt.insertAsync({})
  }
}

const getTasks = async () => {
  const tasks = await tt.findAsync()
  if (tasks.length > 0) return {
    stat: true,
    tasks
  }
  else return { stat: false }
}

const updateTask = async () => {

}

const deleteTask = async () => {

}

export {
  ct,
  tt,
  insertCategory,

}