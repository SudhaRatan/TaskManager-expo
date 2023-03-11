import { StatusBar } from 'react-native';
import {
  View,
  Text,
} from 'react-native';

const Category = ({ route }) => {
  console.log(route)
  return (
    <View style={{flex:1, justifyContent:"center",alignItems:'center'}}>
      <View style={{ height: StatusBar.currentHeight }} />
      <Text>Category screen</Text>
    </View>
  )
}

export default Category;