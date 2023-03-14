import { StatusBar, StyleSheet } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Animated,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CircularProgressBase from 'react-native-circular-progress-indicator';
import { TouchableOpacity } from 'react-native';
import { useRef } from 'react';

const Category = ({ route, navigation }) => {

  const val = useRef(new Animated.Value(0)).current
  const maxHeaderHeight = 160
  const minHeaderHeight = 150

  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  const { height, width } = Dimensions.get('window')

  return (
    <View>
      <StatusBar backgroundColor={route.params.color} />
      <View style={{ height: StatusBar.currentHeight, backgroundColor: route.params.color }} />
      <Animated.View style={[
        St.Header,
        {
          height: minHeaderHeight,
          backgroundColor: route.params.color
        }
        // { borderColor: route.params.color + '80' },
      ]}>
        <TouchableOpacity
          style={St.backCont}
          onPress={() => navigation.goBack()}
        >
          <Entypo name='chevron-left' size={40} />
        </TouchableOpacity>
        <View style={[
          St.CatCont,
        ]}>
          <View style={St.titleCont}>
            <Text style={St.title}>{route.params.name}</Text>
          </View>
          <View style={St.progressCont}>
            <CircularProgressBase
              radius={16}
              value={route.params.progress * 100}
              inActiveStrokeOpacity={0.4}
              progressValueColor={'#00000000'}
              activeStrokeColor={'#000'}
              duration={600}
            />
          </View>
        </View>
      </Animated.View>
      <ScrollView
        // scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: val } } }],
          { useNativeDriver: false },
        )}
      >
        {
          data.map((item) => {
            return (
              <View key={item} style={{
                backgroundColor: '#456678',
                width: width,
                height: 100,
                marginVertical: 5
              }} />
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default Category;

const St = StyleSheet.create({
  Header: {
    // flexDirection:'row',
    borderBottomWidth: 1,
    justifyContent: 'center',
    // alignItems:'center'
  },
  title: {
    fontSize: 28,
    fontWeight: 600,
  },
  backCont: {
    paddingLeft: 15,
    paddingRight: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  titleCont: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-end',
  },
  progressCont: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'flex-start',
  },
  CatCont: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  }
})