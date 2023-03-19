import { Pressable, StatusBar, StyleSheet } from 'react-native';
import {
  View,
  Text,
  Dimensions,
  Animated,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CircularProgressBase from 'react-native-circular-progress-indicator';
import { useRef, useState, useEffect } from 'react';
import { tt, deleteTask, getTaskDetails, insertTask } from '../db-functions/db';
import TaskCard from '../components/TaskCard';
import AddTask from '../components/addTaskInp';

const Category = ({ route, navigation }) => {

  const [tasks, setTasks] = useState(null)
  const [loadingTasks, setLoadingTasks] = useState(true)
  const [change, setChange] = useState(false)
  const [progress, setProgress] = useState(0)
  const [newTask, setNewTask] = useState('')

  const handleInput = (e) => {
    setNewTask(e)
  }

  const changeState = () => {
    setChange(!change)
  }

  const getTasks = async () => {
    tt.find({ categoryId: route.params.id }).sort({ Date: -1 }).exec((err, res) => {
      if (res.length > 0) setTasks(res)
      else setTasks(null)
      setLoadingTasks(false)
    })
  }

  const getTD = async () => {
    const res = await getTaskDetails(route.params.id);
    if (res.progress) setProgress(res.progress)
    else setProgress(0)
  }

  useEffect(() => {
    getTD()
    getTasks();
  }, [change])

  const handleDelete = async (_id) => {
    const res = await deleteTask(_id)
    if (res.stat) {
      getTD()
      setTasks(tasks.filter(task => task._id !== _id))
    } else { ToastAndroid("Error occured", 1000) }
  }

  const val = useRef(new Animated.Value(0)).current
  const minHeaderHeight = 150

  const { height, width } = Dimensions.get('window')

  const addButtonHeight = Math.floor(width < height ? height * 0.08 : width * 0.08)

  const AddTaskFunc = async () => {
    setNewTask('')
    const res = await insertTask({ name: newTask, categoryId: route.params.id, checked: false, Date: Date.now() })
    if (newTask !== '') {
      changeState()
    }
    ToastAndroid.show(res.message, 2000)
  }

  return (
    <View style={{ backgroundColor: '#F9FAFE', flex: 1 }}>
      <StatusBar backgroundColor='#F9FAFE' />
      <View style={{
        height: StatusBar.currentHeight,
        backgroundColor: '#F9FAFE'
      }} />
      <Pressable
        style={St.backCont(route.params.color)}
        onPress={() => navigation.navigate('Home')}
      >
        <Entypo name='chevron-left' size={40} />
      </Pressable>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: val } } }],
          { useNativeDriver: true },
        )}
      >
        <Animated.View style={[
          St.Header,
          {
            height: minHeaderHeight,
            transform: [{
              translateY: val.interpolate({
                inputRange: [0, minHeaderHeight],
                outputRange: [0, minHeaderHeight],
                extrapolate: 'clamp'
              })
            }],
          }
        ]}>
          <Animated.View style={[
            St.CatCont,
            {
              transform: [{
                translateY: val.interpolate({
                  inputRange: [0, minHeaderHeight],
                  outputRange: [0, -minHeaderHeight / 2],
                  extrapolate: 'clamp'
                })
              }],
            }
          ]}>
            <View style={St.titleCont}>
              <Text style={St.title}>{route.params.name}</Text>
            </View>
            <View style={St.progressCont}>
              <CircularProgressBase
                radius={24}
                value={progress * 100}
                inActiveStrokeOpacity={0.4}
                progressValueColor={'#00000000'}
                activeStrokeColor={route.params.color}
                // delay={100}
                duration={600}
              />
            </View>
          </Animated.View>
        </Animated.View>
        <View style={{ backgroundColor: '#F9FAFE', paddingHorizontal: 20 }}>
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
                        <TaskCard key={item._id} index={index} handleDelete={handleDelete} {...item}
                          change={change}
                          changeState={changeState}
                        />
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
      </Animated.ScrollView>
      <Animated.View style={[
        {
          transform: [{
            translateY: val.interpolate({
              inputRange: [0, minHeaderHeight / 2],
              outputRange: [0, addButtonHeight * 2],
              extrapolate: 'clamp'
            })
          }],
        }
      ]}>
        <AddTask name={newTask} AddTaskFunc={AddTaskFunc} handleInput={handleInput} />
      </Animated.View>
    </View>
  )
}

export default Category;

const St = StyleSheet.create({
  Header: {
    justifyContent: 'center',
    backgroundColor: '#F9FAFE',
  },
  title: {
    fontSize: 34,
    fontWeight: 600,
  },
  backCont: iconColor => ({
    paddingLeft: 15,
    paddingRight: 5,
    backgroundColor: '#F9FAFE',
  }),
  titleCont: {
  },
  progressCont: {
  },
  CatCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }
})