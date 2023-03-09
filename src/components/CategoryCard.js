import { StyleSheet } from 'react-native';
import {
  View,
  Text,
} from 'react-native';
import ProgressBar from './ProgressBar';

const CategoryCard = ({ name, tasks, color, progress }) => {
  return (
    <View style={St.categoryContainer}>
      <Text style={St.numTasks}>
        {tasks} Tasks
      </Text>
      <Text style={St.categoryName}>{name} </Text>
      <View>
        <ProgressBar progress={progress} color={color} />
      </View>
    </View>
  )
}

export default CategoryCard;

const St = StyleSheet.create({
  categoryContainer: {
    backgroundColor: '#fff',
    height: 120,
    width: 200,
    margin: 10,
    elevation: 4,
    borderRadius: 24,
    padding: 20,
  },
  numTasks: {
    flex: 1,
    color: '#A7A7B7',
  },
  categoryName: {
    fontSize: 20,
    fontWeight: 500,
    color: '#292C38',
    flex: 1,
  },
})