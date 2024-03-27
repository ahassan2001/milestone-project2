import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'
import TaskCard from './components/TaskCard';
import Users from './components/Users';
import SignIn from './components/SignIn';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 1,
    category: '',
    dueDate: '',
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    axios.get('https://milestone-project2-seven.vercel.app/api/tasks')
    .then(res => setTasks(res.data))
    .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
      axios.post('https://milestone-project2-seven.vercel.app/api/tasks', newTask)
        .then(res => {
          setTasks([...tasks, res.data]);
          setNewTask({
            title: '',
            description: '',
            priority: 1,
            category: '',
            dueDate: '',
          });
        })
        .catch(err => console.log(err));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
      axios.put(`https://milestone-project2-seven.vercel.app/api/tasks/${newTask._id}`, newTask)
        .then(res => {
          const updatedTasks = tasks.map(task =>
            task._id === newTask._id ? res.data : task
          );
          setTasks(updatedTasks);
          setNewTask({
            title: '',
            description: '',
            priority: 1,
            category: '',
            dueDate: '',
          });
        })
        .catch(err => console.log(err));
      }

  const editTask = (task) => {
    setNewTask(task);
  };

  const deleteTask = (taskId) => {
    axios.delete(`https://milestone-project2-seven.vercel.app/api/tasks/${taskId}`)
      .then(() => {
        const updatedTasks = tasks.filter(task => task._id !== taskId);
        setTasks(updatedTasks);
      })
      .catch(err => console.log(err));
  };

  const handleSignIn = () => {
    setIsSignedIn(true);
    setUsername(username);
  };

  return (
    <div className="container">
      {!isSignedIn && <SignIn onSignIn={handleSignIn} />}
      {isSignedIn && (
        <>
          <h1>Task Manager</h1>
          <form onSubmit={handleNewSubmit}>
            <label>Title:</label>
            <input type="text" name="title" value={newTask.title} onChange={handleChange} required />
            <label>Description:</label>
            <textarea name="description" value={newTask.description} onChange={handleChange} required />
            <label>Priority:</label>
            <input type="number" name="priority" value={newTask.priority} onChange={handleChange} required/>
            <br/>
            <br/>
            <label>Category:</label>
            <input type="text" name="category" value={newTask.category} onChange={handleChange} />
            <label>Due Date:</label>
            <input type="date" name="dueDate" value={newTask.dueDate} onChange={handleChange} />
            <br/>
            <br/>
            <button type="submit" className="add-button">Add Task</button>
          </form>
          {tasks.map((task, index) => ( 
            <TaskCard key={index} task={task} handleDelete={deleteTask} handleEdit={handleEditSubmit} />
          ))}
        </>
      )}
    </div>
  );
}

export default App; 