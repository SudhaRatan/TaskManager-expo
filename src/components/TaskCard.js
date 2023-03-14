import {
  View,
  Text,
  Dimensions,
  Animated as Anim,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { AnimatePresence } from 'moti';
import CheckBox from './checkBox';
import CheckBox1 from './checkBox1';
import { getCategoryColor } from '../db-functions/db';
import { handleCheck as hc } from '../db-functions/db';
import Animated, { BounceInLeft, BounceOut, BounceOutRight, FadeIn, FadeInLeft, JumpingTransition, Layout, SlideInLeft, SlideOutLeft, SlideOutRight, ZoomInLeft, ZoomOut, ZoomOutLeft, ZoomOutRight } from 'react-native-reanimated';

const TaskCard = ({ name, checked, _id, index, handleDelete, categoryId, changeState }) => {
  const { width, height } = Dimensions.get('window')
  const addButtonHeight = Math.floor(width < height ? height * 0.075 : width * 0.075)
  const [check, setCheck] = useState(checked)
  const [color, setColor] = useState(null)

  const pressInOut = (val) => {
    Anim.spring(scale1, {
      toValue: val,
      useNativeDriver: true,
    }).start()
  }
  const scale1 = useRef(new Anim.Value(1)).current

  const handleCheck = () => {
    hc(_id, check)
    setCheck(!check)
    changeState()
  }

  const getColor = async () => {
    setColor(await getCategoryColor(categoryId))
  }

  useEffect(() => {
    getColor()
  }, []);

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0.4, 0.9],
      extrapolate: 'clamp',
    })
    return (
      <Anim.View
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
      </Anim.View>
    )
  }

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.9, 0.4],
      extrapolate: 'clamp',
    })
    return (
      <Anim.View
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
        <Pressable
          onPress={() => handleDelete(_id)}
        >
          <MaterialCommunityIcons name="delete" size={50} color="white" />
        </Pressable>
      </Anim.View>
    )
  }

  return (
    <Animated.View
      entering={SlideInLeft.delay(index * 50).springify().damping(13)}
      exiting={SlideOutLeft}
      layout={Layout.springify().damping(13)}
    >
      <Swipeable renderLeftActions={leftSwipe} renderRightActions={rightSwipe}>
        <Pressable
          onPressIn={() => pressInOut(0.92)}
          onPressOut={() => pressInOut(1)}
          onPress={handleCheck}
        >
          <Anim.View style={[
            {
              width: width - 40,
              transform: [{ scale: scale1 }],
              height: addButtonHeight,
            },
            St.taskContainer
          ]}>
            <AnimatePresence>
              {!check && <CheckBox color={color} handleCheck={handleCheck} />}
              {check && <CheckBox1 color={color} handleCheck={handleCheck} />}
            </AnimatePresence>
            <Text style={[
              {
                color: check ? '#808080' : '#5F5F63',
                textDecorationLine: check ? 'line-through' : 'none'
              },
              St.taskText
            ]}>
              {name}
            </Text>
          </Anim.View>
        </Pressable>
      </Swipeable>
    </Animated.View>
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