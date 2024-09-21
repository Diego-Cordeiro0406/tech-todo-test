import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import styles from './styles.module.scss'

type Task = {
  id: string
  title: string
  finished: boolean
}

interface Props {
  setCancel: React.Dispatch<React.SetStateAction<boolean>>,
  adding: boolean
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function AddTask({ setCancel, adding, setTasks }: Props) {
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [taskToAdd, setTaskToAdd] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Estado para mensagem de erro

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
    if (errorMessage) {
      setErrorMessage(null); // Remove a mensagem de erro ao começar a digitar
    }

  };

  const cancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    setCancel(!adding)
  }

  const addTask = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!taskToAdd.trim()) {
      setErrorMessage('*O campo título é obrigatório'); // Define a mensagem de erro se o campo estiver vazio
      return;
    }
    const tasks = localStorage.getItem('tasks')
    const id = uuidv4();
    if (tasks) {
      const updatedTasks = [...taskData, {
        id,
        title: taskToAdd,
        finished: false
      }]
      localStorage.setItem('tasks', JSON.stringify(updatedTasks))
      setTasks(updatedTasks)
      setCancel(false)
    } else {
      localStorage.setItem('tasks', JSON.stringify([{
      id,
      title: taskToAdd,
      finished: false
    }]))
      setTasks([{
        id,
        title: taskToAdd,
        finished: false
      }])
      setCancel(false)
    }
    setTaskToAdd('');
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
              data-testid="input-task"
              className={styles.inputForm}
              placeholder='Digite'
              name="title"
              value={taskToAdd}
              onChange={ handleInputChange }
              type="text"
            />
          </label>
          {
            errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )
          }
        </div>
        <div className={styles.buttonsContainer}>
          <button
            data-testid="remove-button"
            className={styles.buttonCancel}
            onClick={ cancel }
          >
            Cancelar
          </button>
          <button
            data-testid="add-button"
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
