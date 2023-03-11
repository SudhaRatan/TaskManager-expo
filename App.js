import 'react-native-reanimated'
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import MainNavigation from './src/navigation/MainNavigation';

function App() {
  return (
    <>
      <StatusBar style='dark' />
      <MainNavigation />
    </>
  );
}

export default App;
