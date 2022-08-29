import { useSelector, useDispatch } from 'react-redux'
import { deleteTask } from '../features/tasks/taskSlice'
import { Link } from 'react-router-dom'
import '../App.css'

function TasksList() {

  const tasks = useSelector(state => state.tasks)
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteTask(id))
  }

  return (
    <div className="tasks-list-container">

      <header className='header-tasks'>
        <h1>Tasks {tasks.length}</h1>
        <Link className='link-create' to='/create-task' >
          Create Task
        </Link>
      </header>

      <div className='tasks-list'>
        {tasks.map((task) =>(
          <div key={task.id} className="card-task">
            <header className='header-task-card'>
              <h3>{task.title}</h3>
              <div className='card-actions'>
                <Link className='btn-edit' to={`/edit-task/${task.id}`}>Edit</Link>
                <button className='btn-delete' onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            </header>
            
            <p>{task.description}</p>
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default TasksList