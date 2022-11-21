import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Plant from './app/components/Plant/Plant';
import PlantList from './app/components/Plant/PlantList';
import Homescreen from './app/screens/Homescreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { config } from './config';
const Stack = createNativeStackNavigator();
import { LogBox } from 'react-native';
export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications 

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Greenhouse status" component={Homescreen} />
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
