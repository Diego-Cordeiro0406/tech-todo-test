import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

type Task = {
  id: string
  title: string
  finished: boolean
}

export default function AddTask() {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [taskToAdd, setTaskToAdd] = useState<string>('')

  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      const parsed = JSON.parse(tasks)
      setTaskData(parsed)
    }
  }, [])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const novoValor = event.target.value;
    setTaskToAdd(novoValor);
  };

  const addTask = () => {
    const tasks = localStorage.getItem('tasks')
    const id = uuidv4();
    if (tasks) {
      const updatedTasks = [...taskData, {
        id,
        title: taskToAdd,
        finished: false
      }]
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    } else {
      localStorage.setItem('tasks', JSON.stringify([{
      id,
      title: taskToAdd,
      finished: false
    }]))
    }
    
  }

  return (
    <form>
      <h3>Nova Tarefa</h3>
      <label>
        Titulo
        <input
          name="title"
          value={taskToAdd}
          onChange={ handleInputChange }
          type="text"
        />
      </label>
      <button>cancelar</button>
      <button onClick={ addTask }>Adicionar</button>
    </form>
  )
}
