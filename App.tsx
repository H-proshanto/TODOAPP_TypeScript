import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from './src/screens/Route';
import {Home} from './src/screens/Home';
import {DashBoard} from './src/screens/DashBoard';
import {TodoForm} from './src/screens/TodoForm';
import {HeaderUI} from './src/components/HeaderUI';
import {store, persistor} from './src/app/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Router"
            screenOptions={{
              headerTintColor: 'white',
              headerStyle: {backgroundColor: 'orange'},
            }}>
            <Stack.Screen
              name="Router"
              component={Route}
              options={{
                headerTitle: '',
                headerStyle: {
                  backgroundColor: '#444444',
                  shadowColor: 'transparent',
                  elevation: 0,
                },
              }}
            />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
              name="DashBoard"
              component={DashBoard}
              options={({navigation}) => ({
                headerLeft: () => null,
                headerRight: () => <HeaderUI navigation={navigation} />,
              })}
            />
            <Stack.Screen
              name="TodoForm"
              component={TodoForm}
              options={({navigation}) => ({
                headerRight: () => <HeaderUI navigation={navigation} />,
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
