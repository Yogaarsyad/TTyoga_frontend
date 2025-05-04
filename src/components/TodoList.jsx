import { useState, useEffect } from 'react';
import axios from 'axios';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      fetchTodos(); // Refresh list setelah delete
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="space-y-2">
      {todos.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No todos found. Add your first todo!</p>
      ) : (
        todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <span className="text-gray-700">{todo.text}</span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default TodoList;