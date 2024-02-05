import { View, StatusBar, } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './src/Pages/Home';
import Details from './src/Pages/Details';
import Search from './src/Pages/Search';
import Categories from './src/Pages/Categories';
import Favorites from './src/Pages/Favorites';

const Stack = createNativeStackNavigator()

export default function DevGames() {
  return (
    <NavigationContainer>
      <StatusBar  barStyle='light-content'/>
      <Stack.Navigator>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{
            headerShown: false,
            
          }}
        />

        <Stack.Screen
        name='Details'
        component={Details}
        options={{
          headerShown: false
        }}
        />

        <Stack.Screen
        name='Search'
        component={Search}
        options={{
          headerStyle: {
            backgroundColor: '#050B18'
          },
          headerTintColor: 'white'
        }}
        />

        <Stack.Screen
        name='Categories'
        component={Categories}
        options={{
          headerShown: false
        }}
        />
        <Stack.Screen
        name='Favorites'
        component={Favorites}
        options={{
          headerShown: false
        }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}