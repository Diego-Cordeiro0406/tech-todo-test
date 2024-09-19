"use client"
import React, { useState } from 'react'
import { useEffect } from "react";
import AddTask from './AddTask';
import RemoveTask from './RemoveTask';

type Task = {
  id: string
  title: string
  finished: boolean
}
export default function TasksList() {
  const [taskList, setTaskList] = useState<Task[]>([])
  const [adding, setAdding] = useState<boolean>(false)
  const [removing, setRemoving] = useState<boolean>(false)
  const [idToRemove, setIdToRemove] = useState<string>('')
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    const tasks = localStorage.getItem('tasks')
    if (tasks) {
      const parsed = JSON.parse(tasks)
      setTaskList(parsed)
    }
  }, [])

  const remove = (id: string) => {
    setRemoving(true)
    setIdToRemove(id)
  }

  const handleCheckbox = (id: string) => {
    // Atualiza o estado isChecked
    setIsChecked(!isChecked);
    const taskToUpdate = taskList.find((task) => task.id === id)
    if(taskToUpdate) {
      taskToUpdate.finished = !isChecked
    }
    console.log(taskToUpdate)
  };

  return (
    <section>
      <main>
        <section>
          <h3>Suas tarefas de hoje</h3>
          {
            taskList.length > 0 ? taskList
              .filter(({finished}) => finished === false)
              .map((task) => (
              <div key={task.id}>
                <input
                  checked={ isChecked }
                  onChange={ () => handleCheckbox(task.id) }
                  type="checkbox"
                />
                <p>{task.title}</p>
                <button onClick={ () => remove(task.id) }>deletar</button>
              </div>
            )) : <p>Você não tem nenhuma tarefa adicionada</p>
          }
        </section>
        <section>
          <h3>Tarefas finalizadas</h3>
          {
            taskList
              .filter(({finished}) => finished === true).length > 0 ?
            taskList
              .filter(({finished}) => finished === true).map((task) => (
              <div key={task.id}>
                <input type="checkbox" />
                <p>{task.title}</p>
                <button onClick={ () => remove(task.id) }>deletar</button>
              </div>
            )) : <p>Você ainda não tem nenhuma tarefa completa</p>
          }
        </section>
      </main>
      <button
        onClick={ () => setAdding(!adding) }
      >
        Adicionar nova tarefa
      </button>
      {
        adding && <AddTask />
      }
      {
        removing && <RemoveTask
          id={idToRemove}
          taskList={taskList}
          setRemoving={setRemoving}
          setTaskList={setTaskList} />
      }
    </section>
  )
}
