import 'react-native-reanimated'
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import MainNavigation from './src/navigation/MainNavigation';

function App() {
  return (
    <>
      <MainNavigation />
      <StatusBar style='light' />
    </>
  );
}

export default App;
