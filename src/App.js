import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import HomeScreen from './screens/HomeScreen';
import TaskScreen from './screens/TaskScreen';
import {TaskProvider} from './context/TaskContext';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <TaskProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{title: 'My Tasks'}}
            />
            <Stack.Screen
              name="Task"
              component={TaskScreen}
              options={({route}) => ({
                title: route.params?.task ? 'Edit Task' : 'New Task',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </TaskProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
