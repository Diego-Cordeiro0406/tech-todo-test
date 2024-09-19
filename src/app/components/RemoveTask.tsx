import React from 'react'

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
    <section>
      <h3>Deletar tarefa</h3>
      <p>Tem certeza que você deseja deletar essa tarefa?</p>
      <button onClick={() => setRemoving(false)}>cancelar</button>
      <button onClick={ removeTask }>Deletar</button>
    </section>
  )
}
