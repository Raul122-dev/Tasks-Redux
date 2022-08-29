import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, editTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from 'react-router-dom'
import '../App.css'

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const params = useParams()
  const tasks = useSelector(state => state.tasks)

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(params.id){
      dispatch(editTask(task))
      navigate('/')
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }

   
    navigate('/')
  };

  useEffect(() => {

    if(params.id){
      setTask(tasks.find(task => task.id === params.id))
    }
    return () => {
      
    };
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="form-task">
      <label htmlFor="title" className="label-form">Task:</label>
      <input
        name="title"
        type="text"
        placeholder="title"
        onChange={handleChange}
        value={task.title}
        className="input-form"
      />

      <label htmlFor="description" className="label-form">Description:</label>
      <textarea
        name="description"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
        className="input-form"
      ></textarea>

      <button type="submit">Save</button>
    </form>
  );
}

export default TaskForm;
