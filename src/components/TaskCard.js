import {
  View,
  Text,
  Dimensions,
  Animated,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useState, useRef } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatePresence } from 'moti';
import CheckBox from './checkBox';
import CheckBox1 from './checkBox1';

const TaskCard = ({ task, checked, id, handleDelete, color }) => {
  const { width, height } = Dimensions.get('window')
  const addButtonHeight = Math.floor(width < height ? height * 0.075 : width * 0.075)
  const [check, setCheck] = useState(checked)

  const pressInOut = (val) => {
    Animated.spring(scale1, {
      toValue: val,
      useNativeDriver: true,
    }).start()
  }
  const scale1 = useRef(new Animated.Value(1)).current

  const handleCheck = () => {
    setCheck(!check)
  }

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0.4, 0.9],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          {
            transform: [{ scale: scale }],
            backgroundColor: 'green',
            width: addButtonHeight,
            height: addButtonHeight,
          },
          St.swipeContainer
        ]}
      >
        <MaterialIcons name="edit" size={50} color="white" />
      </Animated.View>
    )
  }

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.9, 0.4],
      extrapolate: 'clamp',
    })
    return (
      <Animated.View
        style={[
          {
            transform: [{ scale: scale }],
            backgroundColor: 'red',
            width: addButtonHeight,
            height: addButtonHeight,
          },
          St.swipeContainer
        ]}
      >
        <Pressable onPress={() => handleDelete(id)}>
          <MaterialCommunityIcons name="delete" size={50} color="white" />
        </Pressable>
      </Animated.View>
    )
  }

  return (
    <View>
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
        <Pressable
          onPressIn={() => pressInOut(0.94)}
          onPressOut={() => pressInOut(1)}
        >
          <Animated.View style={[
            {
              width: width - 40,
              transform: [{ scale: scale1 }],
              // width:addButtonHeight,
            height:addButtonHeight,
            },
            St.taskContainer
          ]}>
            <AnimatePresence>
              {!check && <CheckBox color={color} handleCheck={handleCheck} />}
              {check && <CheckBox1 handleCheck={handleCheck} />}
            </AnimatePresence>
            <Text style={[
              {
                color: check ? '#808080' : '#5F5F63',
                textDecorationLine: check ? 'line-through' : 'none'
              },
              St.taskText
            ]}>
              {task}
            </Text>
          </Animated.View>
        </Pressable>
      </Swipeable>
    </View>
  )
}

export default TaskCard;

const St = StyleSheet.create({
  swipeContainer: {
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  taskContainer: {
    backgroundColor: '#fff',
    flex: 1,
    marginVertical: 5,
    elevation: 1,
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
  },
  taskText: {
    flex: 1,
    fontSize: 18,
  }
})