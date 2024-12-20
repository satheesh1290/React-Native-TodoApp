import React, {createContext, useReducer, useContext} from 'react';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return [...state, {...action.payload, id: Date.now().toString()}];
    case 'UPDATE_TASK':
      return state.map(task =>
        task.id === action.payload.id ? action.payload : task,
      );
    case 'DELETE_TASK':
      return state.filter(task => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map(task =>
        task.id === action.payload
          ? {...task, completed: !task.completed}
          : task,
      );
    default:
      return state;
  }
};

export const TaskProvider = ({children}) => {
  const [tasks, dispatch] = useReducer(taskReducer, [
    // Sample data
    {
      id: '1',
      title: 'Complete React Native Project',
      description: 'Finish the todo app implementation',
      dueDate: new Date().toISOString(),
      completed: false,
    },
  ]);

  return (
    <TaskContext.Provider value={{tasks, dispatch}}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
