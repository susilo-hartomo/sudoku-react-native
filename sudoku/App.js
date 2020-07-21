import * as React from 'react';
import { store } from './redux'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import { Welcome } from './pages/Welcome';
import { SudokuBoard } from './pages/SudokuBoard';
import { Finish } from './pages/Finish'

export default function App() {
  const Stack = createStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome}
            screenOptions={{
              headerShown: false
            }} />
          <Stack.Screen name="SudokuBoard" component={SudokuBoard} />
          <Stack.Screen name="Finish" component={Finish} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
