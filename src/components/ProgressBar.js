import { StyleSheet } from 'react-native';
import {
  View,
  Text,
} from 'react-native';

const ProgressBar = ({ color, progress }) => {
  return (
    <View style={St.progressContainer}>
      <View style={[
        St.progressBar,
        { backgroundColor: color + '40' }
      ]}>
        <View style={[
          {
            width: 160 * progress,
            backgroundColor: color,
          },
          St.progress
        ]} />
        <View style={[
          {
            left: 160 * progress - 3,
            transform: [{ translateY: -2 }],
            backgroundColor: color,
          },
          St.progressEnd
        ]} />
      </View>
    </View>
  )
}

export default ProgressBar;

const St = StyleSheet.create({
  progressContainer: {
    height: 4,
    marginVertical: 10,
  },
  progressBar: {
    borderRadius: 10,
    width: 160,
    flex: 1,
  },
  progress: {
    flex: 1,
    borderRadius: 10,
  },
  progressEnd: {
    position: 'absolute',
    width: 3,
    height: 6,
    borderRadius: 1,
  },
})