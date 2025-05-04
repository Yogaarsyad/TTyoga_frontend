import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const priorityColors = {
  high: 'bg-red-100 border-red-300',
  medium: 'bg-yellow-100 border-yellow-300',
  low: 'bg-green-100 border-green-300'
};

const priorityText = {
  high: 'High',
  medium: 'Medium',
  low: 'Low'
};

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { user } = useAuth();

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/todos?user_id=${user.id}`, {
        withCredentials: true
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`, {
        withCredentials: true
      });
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, {
        completed: !isCompleted
      }, {
        withCredentials: true
      });
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  return (
    <div className="space-y-3">
      {todos.length === 0 ? (
        <div className="text-center py-6 bg-white rounded-lg shadow">
          <p className="text-gray-500">No todos found. Add your first todo!</p>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className={`flex items-start justify-between p-4 rounded-lg shadow border-l-4 ${priorityColors[todo.priority]}`}
          >
            <div className="flex items-start space-x-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id, todo.completed)}
                className="mt-1"
              />
              <div className="flex-1">
                <p className={`${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                  {todo.text}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 text-sm">
                  <span className={`px-2 py-1 rounded-full ${priorityColors[todo.priority]} text-xs font-medium`}>
                    {priorityText[todo.priority]}
                  </span>
                  {todo.due_date && (
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                      Due: {new Date(todo.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;