import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4 max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Todo List App
        </h1>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <TodoForm />
                <TodoList />
              </>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;