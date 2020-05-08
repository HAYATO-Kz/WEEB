import * as React from 'react';
import {View} from 'react-native';
import {Icon} from 'native-base';
import database from '@react-native-firebase/database';
import Profile from './Profile';
import ReviewList from './ReviewList';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let type;

          if (route.name === 'ReviewList') {
            type = 'Entypo';
            iconName = focused ? 'open-book' : 'book';
          } else if (route.name === 'Profile') {
            type = 'FontAwesome';
            iconName = focused ? 'user' : 'male';
          }
          return <Icon type={type} name={iconName} style={{color: color}} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#4AD7D1',
        inactiveTintColor: 'white',
        style: {
          backgroundColor: '#212221',
        },
      }}>
      <Tab.Screen name="ReviewList" component={ReviewList} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
