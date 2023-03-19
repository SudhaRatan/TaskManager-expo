import {
  View,
  Text,
  Animated as Anim,
  Dimensions,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useCallback, useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import TaskCard from '../components/TaskCard';
import { getCategories } from '../db-functions/db';
import Add from '../components/Add';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { deleteCategory, tt, deleteTask } from '../db-functions/db';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SQLite from 'react-native-sqlite-storage';

// SQLite.enablePromise(true)

const db = SQLite.openDatabase(
  { name: 'Main1.db', location: 'default' },
  () => { },
  err => {
    console.log(err)
  }
)

const Home = ({ navigation }) => {

  const CreateCatTable = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE if not exists categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          iconColor VARCHAR,
          iconName VARCHAR,
          name VARCHAR
        );`,
        [],
        (tx, res) => {
          // console.log(tx, res)
        },
        err => {
          console.log(err)
        }
      )
    })
  }

  const insertVals = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `insert into categories (name, iconColor, iconName) values ( "Work","#F08A5D","briefcase" );`, []
      );
      tx.executeSql(
        `insert into categories (name, iconColor, iconName) values ( "Hostel","#3067C0","home" );`, [],
        (res, ress) => {
          console.log(res, ress)
        },
        err => console.log(err)
      );
    })
  }

  const getCats = () => {
    setLoading(true)
    setCategories(null)
    db.transaction((tx) => {
      tx.executeSql(
        `select * from categories`, [],
        (tx, res) => {
          console.log(res.rows.item)
          let len = res.rows.length
          if (len > 0) {
            let results = []
            for (let i = 0; i < len; i++) {
              // console.log(res.rows.item(i))
              results.push(res.rows.item(i))
            }
            setCategories(results)
            setLoading(false)
          }
        },
        err => {
          console.log(err)
        }
      )
    })
  }

  const getCatsAsync = () => {
    return new Promise((resolve, reject) => {
      db.transaction((tx) => {
        tx.executeSql(
          `select * from categories`, [],
          (tx, res) => {
            let len = res.rows.length
            if (len > 0) {
              let results = []
              for (let i = 0; i < len; i++) {
                results.push(res.rows.item(i))
              }
              resolve(results)
            }
          },
          err => {
            console.log(err)
            reject(err)
          }
        )
      })
    })
  }

  const gca = async () => {
    setLoading(true)
    setCategories(null)
    const results = await getCatsAsync();
    setCategories(results)
    setLoading(false)
  }

  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    drawerAnim();
    // CreateCatTable();
    // insertVals();
  }, [isDrawerOpen]);

  useFocusEffect(useCallback(() => {
    getCategoriesFunc();
    getLatestTasks();
    gca();
    // getCats();
  }, []))

  const [tasks, setTasks] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [categories, setCategories] = useState(null)
  const [change, setChange] = useState(false)

  const changeState = () => {
    setChange(!change)
  }

  const getCategoriesFunc = async () => {
    // setCategories(null)
    // setLoading(true)
    // const res = await getCategories()
    // if (res.stat) {
    //   // const ress = await AsyncStorage.setItem('Categories', JSON.stringify(res.res))
    //   setCategories(res.res)
    // }
    // else setCategories(null)
    // const res = JSON.parse(await AsyncStorage.getItem('Categories'))
    // setCategories(res)
    // setLoading(false)
  }

  const enableTaskButton = () => {
    if (categories === null) return false
    else return true
  }

  const getLatestTasks = async () => {
    setLoadingTasks(true)
    setTasks(null)
    // tt.find({}).sort({ Date: -1 }).limit(10).exec(async(err, res) => {
    //   if (res.length > 0) {
    //     setTasks(res)
    //     // const ress = await AsyncStorage.setItem('Tasks', JSON.stringify(res))
    //   }
    //   else setTasks(null)
    //   setLoadingTasks(false)
    // })
    const res = JSON.parse(await AsyncStorage.getItem('Tasks'))
    // console.log(res)
    setTasks(res)
    setLoadingTasks(false)

  }


  const drawerAnim = () => {
    if (!isDrawerOpen) {
      Anim.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    } else {
      Anim.spring(scale, {
        toValue: 0.85,
        useNativeDriver: true,
      }).start()
    }
  }

  const handleToggle = () => {
    navigation.toggleDrawer()
    Anim.spring(scale, {
      toValue: 0.85,
      useNativeDriver: true,
    }).start()
  }

  const scale = useRef(new Anim.Value(1)).current

  const { height, width } = Dimensions.get('window')
  const addButtonHeight = Math.floor(width < height ? height * 0.075 : width * 0.075)

  const handleDelete = async (_id) => {
    const res = await deleteTask(_id)
    if (res.stat) {
      changeState()
      setTasks(tasks.filter(task => task._id !== _id))
    } else { ToastAndroid("Error occured", 1000) }
  }

  const deleteCategoryById = async (id) => {
    await deleteCategory(id)
    getCategoriesFunc();
    getLatestTasks();
  }



  return (
    <View style={{ flex: 1, backgroundColor: '#111E53', height: height, }} >
      <Anim.ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={[St.content, {
          transform: [{ scale }],
          borderRadius: scale.interpolate({
            inputRange: [0.9, 1],
            outputRange: [15, 0],
          }),
        }]}>
        <Header handleClick={handleToggle} />
        <View style={[
          St.container,
        ]}>
          {/* Greeting */}
          <View>
            <Text style={St.greeting}>What's up, Rohit!</Text>
          </View>
          {/* Categories */}
          <View
            style={St.categoriesContainer}>
            <Text style={St.categoriesText}>CATEGORIES</Text>
            <View style={[
              St.catListCont,
              { width: width - 40 }
            ]}>
              {
                loading
                  ?
                  <View style={St.loadingSt}>
                    <ActivityIndicator size="large" />
                  </View>
                  :
                  categories
                    ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      {
                        categories.map((item, index) => {
                          return (
                            <CategoryCard key={item.id} {...item} index={index} deleteCategory={deleteCategoryById} change={change} changeState={changeState} />
                          )
                        })
                      }
                    </ScrollView>
                    :
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                      <Text style={St.categoriesText}>Add Categories to display here</Text>
                    </View>
              }

            </View>
          </View>
          {/* Todays tasks */}
          <View
            style={[St.taskContainer, { width: width - 40 }]}>
            <Text style={St.taskText}>RECENTLY ADDED TASKS</Text>
            <View>
              {
                loadingTasks
                  ?
                  <View style={St.loadingSt}>
                    <ActivityIndicator size="large" />
                  </View>
                  :
                  tasks
                    ?
                    <View>
                      {
                        tasks.map((item, index) => {
                          return (
                            <TaskCard key={item._id} index={index} handleDelete={handleDelete} {...item} change={change} changeState={changeState} />
                          )
                        })
                      }
                      <View style={{ height: addButtonHeight }} />
                    </View>
                    :

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 }}>
                      <Text style={St.categoriesText}>Add Tasks to display here</Text>
                    </View>
              }
            </View>
          </View>
        </View>
      </Anim.ScrollView>
      <Add enableTaskButton={enableTaskButton} />
    </View>
  )
}

export default Home;

const St = StyleSheet.create({
  content: {
    backgroundColor: '#F9FAFE',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
  },
  greeting: {
    fontSize: 34,
    marginBottom: 40,
    color: '#242946',
    fontWeight: 800,
  },
  categoriesContainer: {
    marginBottom: 10,
  },
  categoriesText: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#C5C5D2'
  },
  catListCont: {
    height: 150,
  },
  taskContainer: {
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 600,
    marginBottom: 10,
    color: '#C5C5D2',
  },
  loadingSt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})