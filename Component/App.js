import 'react-native-gesture-handler';
import React from 'react';
import CreateAccount from './CreateAccount';
import HomeScene from './HomeScene';
import MainPage from './MainPage';
import WriteBlog from './WriteBlog';
import Review from './Review';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  console.disableYellowBox = true;
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Home" component={HomeScene} />
        <Stack.Screen name="Main" component={MainPage} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="Write" component={WriteBlog} />
        <Stack.Screen name="Review" component={Review} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
