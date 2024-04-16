import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import store from './redux/store';
import { Provider } from 'react-redux';
import StackNavigator from './components/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
        <StackNavigator />
        <StatusBar style="auto" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


