import Datastore from "react-native-local-mongodb";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ct = new Datastore({ filename: 'categories', storage: AsyncStorage, autoload: true });
const tt = new Datastore({ filename: 'tasks', storage: AsyncStorage, autoload: true });


// categories //
const insertCategory = async (cat) => {
  try {
    if (cat.name !== '') {
      const checkDup = await ct.findOneAsync({ name: cat.name })
      const res = await ct.findAsync({})
      // console.log(res)
      if (checkDup) return { stat: false, message: "Category already exists" }
      else {
        await ct.insertAsync(cat)
        return { stat: true, message: "Created category!" }
      }
    } else return { stat: false, message: "Enter a name" }
  } catch (error) {
    console.log(error)
    return { stat: false, message: "Error Occured" }
  }
}

const getCategories = async () => {
  const res = await ct.findAsync({})
  if (res.length > 0) return {
    stat: true,
    res
  }
  else return { stat: false }
}

const deleteCategory = async (id) => {
  await ct.removeAsync({ _id: id })
  await tt.removeAsync({ categoryId: id }, { multi: true })
}

const getCategoryColor = async (id) => {
  const res = await ct.findOneAsync({ _id: id })
  return res.iconColor
}

const getTaskDetails = async (id) => {
  const total = await tt.findAsync({categoryId: id})
  const checkedCount = await tt.findAsync({ categoryId: id, checked: true })
  const uncheckedCount = await tt.findAsync({ categoryId: id, checked: false })
  return {
    checked: checkedCount.length,
    unchecked: uncheckedCount.length,
    progress: (checkedCount.length / total.length)
  }
}

// tasks //

const checkCat = async () => {
  var catLength = await ct.findAsync()
  if (catLength.length > 0) return false
  else return true
}

const insertTask = async (task) => {
  if (checkCat) {
    if (task.name !== '') {
      if (task.categoryId !== null) {
        await tt.insertAsync(task)
        return { stat: true, message: "Added task!" }
      } else {
        return { stat: false, message: "Select a category" }
      }
    } else {
      return { stat: false, message: "Enter a task" }
    }
  }
}

const getLatestTasks = async () => {
  tt.find({}).sort({ Date: 1 }).limit(2).exec((err, res) => {
    console.log(res)
  })
}

const handleCheck = async (id, check) => {
  await tt.updateAsync({ _id: id }, { $set: { checked: !check } })
}

const updateTask = async () => {

}

const deleteTask = async (id) => {
  const res = await tt.removeAsync({ _id: id })
  if (res === 1) return { stat: true }
  else return { stat: false }
}

export {
  ct,
  tt,
  insertCategory,
  getCategories,
  deleteCategory,
  insertTask,
  getLatestTasks,
  updateTask,
  deleteTask,
  handleCheck,
  getCategoryColor,
  getTaskDetails,
}