import React from 'react'
import styles from './styles.module.scss'

type Task = {
  id: string
  title: string
  finished: boolean
}
interface Props {
  id: string,
  taskList: Task[],
  setRemoving: React.Dispatch<React.SetStateAction<boolean>>,
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>
}

export default function RemoveTask({ id, taskList, setRemoving, setTaskList }: Props) {
  const removeTask = () => {
    const updatedTasks = taskList.filter((task) => task.id !== id)
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setTaskList(updatedTasks)
    setRemoving(false)
  }

  return (
    <section className={styles.container}>
      <section className={styles.mainContainer}>
        <p className={styles.deleteTaskText}>Deletar tarefa</p>
        <p className={styles.adviceText}>Tem certeza que você deseja deletar essa tarefa?</p>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.buttonCancel}
            onClick={() => setRemoving(false)}
          >
            cancelar
          </button>
          <button
            className={styles.buttonRemove}
            onClick={ removeTask }
          >
            Deletar
          </button>
        </div>
      </section>
    </section>
  )
}
