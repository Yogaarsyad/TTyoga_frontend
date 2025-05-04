import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const TodoForm = ({ onTodoAdded }) => {
  const [formData, setFormData] = useState({
    text: '',
    priority: 'medium',
    due_date: ''
  });
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.text.trim()) return;

    try {
      await axios.post('http://localhost:5000/todos', {
        ...formData,
        user_id: user.id
      }, {
        withCredentials: true
      });
      setFormData({
        text: '',
        priority: 'medium',
        due_date: ''
      });
      onTodoAdded();
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded-lg shadow">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Todo Text</label>
          <input
            type="text"
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            placeholder="What needs to be done?"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-2">Priority</label>
            <select
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({...formData, due_date: e.target.value})}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;