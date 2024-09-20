import React, { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.scss'

type Task = {
  id: string
  title: string
  finished: boolean
}

interface Props {
  setRemoving: React.Dispatch<React.SetStateAction<boolean>>,
}

export default function AddTask({ setRemoving }: Props) {
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
    <section className={styles.container}>
      <form className={styles.mainContainer}>
        <div className={styles.formContainer}>
          <div className={styles.newTaskContainer}>
            <h3 className={styles.newTaskText}>Nova Tarefa</h3>  
          </div>
        <label className={styles.inputContainer}>
          Titulo
            <input
              className={styles.inputForm}
              placeholder='Digite'
              // required
              name="title"
              value={taskToAdd}
              onChange={ handleInputChange }
              type="text"
            />
          </label>
        </div>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.buttonCancel}
            onClick={() => setRemoving(false)}
          >
            cancelar
          </button>
          <button
            className={styles.buttonAdd}
            onClick={ addTask }
          >
            Adicionar
          </button>
        </div>
      </form>
    </section>
    
  )
}
