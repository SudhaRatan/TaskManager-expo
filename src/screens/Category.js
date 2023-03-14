import { StatusBar, StyleSheet } from 'react-native';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import CircularProgressBase from 'react-native-circular-progress-indicator';
import { TouchableOpacity } from 'react-native';

const Category = ({ route, navigation }) => {

  const { height } = Dimensions.get('window')

  return (
    <ScrollView style={{ flex: 1, height: height * 2 }}>
      <View style={{ height: StatusBar.currentHeight }} />
      <View style={[
        St.Header,
        {borderColor: route.params.color + '80' },
      ]}>
        <TouchableOpacity
          style={St.backCont}
          onPress={() => navigation.goBack()}
        >
          <Entypo name='chevron-left' size={40} />
        </TouchableOpacity>
        <View style={St.CatCont}>
          <View style={St.titleCont}>
            <Text style={St.title}>{route.params.name}</Text>
          </View>
          <View style={St.progressCont}>
            <CircularProgressBase
              radius={20}
              value={route.params.progress * 100}
              inActiveStrokeOpacity={0.4}
              progressValueColor={'#00000000'}
              activeStrokeColor={route.params.color}
              // inActiveStrokeWidth={8}
              duration={500}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Category;

const St = StyleSheet.create({
  Header: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    height: null,
    fontWeight: 600,
    flex: 1,
    
  },
  titleCont: {
    flex: 1,
    justifyContent:"center",
    alignItems:"flex-start",
  },
  backCont: {
    paddingLeft: 15,
    paddingRight: 5,
    flex: 1,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  progressCont: {
    paddingRight: 15,
    paddingLeft: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  CatCont: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  }
})