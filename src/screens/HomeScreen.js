import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useTasks} from '../context/TaskContext';
import TaskItem from '../components/TaskItem';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({navigation}) => {
  const {tasks, dispatch} = useTasks();

  const handleDeleteTask = taskId => {
    Alert.alert('Delete Task', 'Are you sure you want to delete this task?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        onPress: () => dispatch({type: 'DELETE_TASK', payload: taskId}),
        style: 'destructive',
      },
    ]);
  };

  const handleToggleTask = taskId => {
    dispatch({type: 'TOGGLE_TASK', payload: taskId});
  };

  const renderItem = ({item}) => (
    <TaskItem
      task={item}
      onToggle={() => handleToggleTask(item.id)}
      onDelete={() => handleDeleteTask(item.id)}
      onPress={() => navigation.navigate('Task', {task: item})}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('Task')}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default HomeScreen;
