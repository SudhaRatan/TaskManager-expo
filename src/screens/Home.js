import {
  View,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useDrawerStatus } from '@react-navigation/drawer';
import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import { FlatList } from 'react-native-gesture-handler';
import TaskCard from '../components/TaskCard';
import { AnimatePresence, MotiView } from 'moti';
import { categories, tasks } from '../data/data';
import { insertCategory } from '../db-functions/db';
import Add from '../components/Add';

const Home = ({ navigation }) => {

  const [task, setTasks] = useState(tasks)

  const isDrawerOpen = useDrawerStatus() === 'open';

  useEffect(() => {
    drawerAnim();
  }, [isDrawerOpen])

  const drawerAnim = () => {
    if (!isDrawerOpen) {
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: true,
        duration: 200,
      }).start()
    } else {
      Animated.timing(scale, {
        toValue: 0.85,
        useNativeDriver: true,
        duration: 200,
      }).start()
    }
  }

  handleToggle = () => {
    navigation.toggleDrawer()
    Animated.timing(scale, {
      toValue: 0.85,
      useNativeDriver: true,
      duration: 200,
    }).start()
  }

  const scale = useRef(new Animated.Value(1)).current

  const { height } = Dimensions.get('window')

  const handleDelete = (id) => {
    setTasks(task.filter(task => task.id !== id))
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#111E53', height: height, overflow: 'hidden' }} >
      <Animated.ScrollView
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        style={[St.content, {
          transform: [{ scale }],
          borderRadius: scale.interpolate({
            inputRange: [0.9, 1],
            outputRange: [15, 0]
          }),
        }]}>
        <Header handleClick={handleToggle} />
        <View style={St.container}>
          {/* Greeting */}
          <View>
            <Text style={St.greeting}>What's up, Rohit!</Text>
          </View>
          {/* Categories */}
          <View
            style={St.categoriesContainer}>
            <Text style={St.categoriesText}>CATEGORIES</Text>
            <View style={St.catListCont}>
              <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={item => item.id}
                data={categories}
                renderItem={({ item }) => {
                  return (
                    <CategoryCard {...item} />
                  )
                }}
              />
            </View>
          </View>
          {/* Todays tasks */}
          <View
            style={St.taskContainer}>
            <Text style={St.taskText}>TODAY'S TASKS</Text>
            <View>
              {
                task.map((item, index) => {
                  return (
                    <AnimatePresence key={item.id}>
                      <MotiView
                        from={{
                          translateY: -50
                        }}
                        animate={{
                          translateY: 0
                        }}
                        transition={{
                          delay: 50 * index
                        }}
                      >
                        <TaskCard handleDelete={handleDelete} {...item} />
                      </MotiView>
                    </AnimatePresence>
                  )
                })
              }
            </View>
          </View>
        </View>
      </Animated.ScrollView>
      <Add />
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
    paddingRight: 20,
    paddingLeft: 20,
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
    fontWeight: 500,
    marginBottom: 10,
    color: '#C5C5D2'
  },
  catListCont: {
    height: 150
  },
  taskContainer: {
    marginBottom: 10,
  },
  taskText: {
    fontSize: 16,
    fontWeight: 500,
    marginBottom: 10,
    color: '#C5C5D2'
  }
})