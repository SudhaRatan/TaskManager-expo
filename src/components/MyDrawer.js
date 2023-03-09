import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { StyleSheet } from 'react-native';

const MyDrawer = (props) => {
  return (
    <View style={St.drawerContainer}>
      <DrawerContentScrollView {...props} >
        <View>
          <View style={St.profileIconContainer}>
            <MaterialCommunityIcons name="account-circle-outline" size={120} color="#d0fCf1" />
          </View>
          <Text style={St.nameContainer}>Ratan Kumar</Text>
        </View>
        <DrawerItemList  {...props} />
      </DrawerContentScrollView>
      <Pressable
        onPress={() => { props.navigation.dispatch(DrawerActions.closeDrawer()) }}
        style={St.backIconContainer}>
        <Entypo name="chevron-with-circle-left" size={40} color="#d0fCf1" />
      </Pressable>
    </View>
  )
}

export default MyDrawer;

const St = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  profileIconContainer: {
    flexDirection: 'row',
  },
  nameContainer: {
    fontSize: 28,
    margin: 10,
    color: '#F8FCFF'
  },
  backIconContainer: {
    marginTop: StatusBar.currentHeight,
  }
})