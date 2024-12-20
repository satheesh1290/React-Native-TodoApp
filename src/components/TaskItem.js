import React, {useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {SwipeRow} from 'react-native-swipe-list-view';
import Icon from 'react-native-vector-icons/MaterialIcons';

const {width} = Dimensions.get('window');

const TaskItem = ({task, onToggle, onDelete, onPress}) => {
  const rowRef = useRef(null);

  const closeRow = () => {
    if (rowRef.current) {
      rowRef.current.closeRow();
    }
  };

  const handleCheckboxPress = e => {
    e.preventDefault();
    e.stopPropagation();
    onToggle();
  };

  return (
    <SwipeRow
      ref={rowRef}
      rightOpenValue={-75}
      disableRightSwipe
      stopRightSwipe={-75}>
      {/* Hidden View (Delete Button) */}
      <View style={styles.rowBack}>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => {
            closeRow();
            onDelete();
          }}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>

      {/* Visible View (Task Item) */}
      <View style={styles.rowFront}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={handleCheckboxPress}
            style={styles.checkbox}>
            <Icon
              name={task.completed ? 'check-box' : 'check-box-outline-blank'}
              size={40}
              color={task.completed ? '#2196F3' : '#757575'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.textContainer} onPress={onPress}>
            <Text
              style={[styles.title, task.completed && styles.completedText]}>
              {task.title}
            </Text>
            <Text style={styles.date}>
              Due: {new Date(task.dueDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SwipeRow>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  rowFront: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  rowBack: {
    alignItems: 'flex-end',
    backgroundColor: '#ff4444',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#757575',
  },
  date: {
    fontSize: 12,
    color: '#757575',
    marginTop: 4,
  },
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: '100%',
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default TaskItem;
