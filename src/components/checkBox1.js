import { Pressable } from 'react-native';
import { MotiView } from 'moti';
import { MaterialIcons } from '@expo/vector-icons';

const CheckBox1 = ({ handleCheck }) => {


  return (
    <Pressable onPress={handleCheck}>
      <MotiView style={{
        backgroundColor: '#000fff00',
        marginRight: 10,
      }}
        from={{
          scale: 0.3
        }}
        animate={{
          scale: 1
        }}
        exit={{
          scale: 0.4,
        }}
      >
        <MaterialIcons name="check-circle" size={25} color="green" />
      </MotiView>

    </Pressable>
  )
}

export default CheckBox1;