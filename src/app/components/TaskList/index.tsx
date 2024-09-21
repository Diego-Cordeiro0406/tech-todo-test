"use client"
import React, { useState } from 'react'
import { useEffect } from "react";
import Image from 'next/image'

import AddTask from '../AddTask';
import RemoveTask from '../RemoveTask';
import styles from './styles.module.scss'
import trashIcon from '../../assets/trash.png'

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
  // const [isChecked, setIsChecked] = useState<boolean>(false);

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
    const updatedTasks = taskList.map((task) => {
      if(task.id === id) {
        return {...task, finished: !task.finished}
      } 
      return task
    })

    setTaskList(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks))
  };

  const tasksFinished = taskList
  .filter(({finished}) => finished === true)
  const tasksNotFinished = taskList
  .filter(({finished}) => finished === false)

  return (
    <section className={styles.container}>
      <main className={styles.mainContainer}>
        <p className={styles.text}>Suas tarefas de hoje</p>
        <section className={styles.tasksToDoContainer}>
          {
            tasksNotFinished.length > 0 ? tasksNotFinished
              .map((task) => (
              <div className={styles.tasksToDo} key={task.id}>
                <div onClick={ () => handleCheckbox(task.id) } className={styles.toDoContainer}>
                  <label>
                    <input
                      checked={ task.finished }
                      onChange={ () => handleCheckbox(task.id) }
                      type="checkbox"
                    />
                    <span className={styles.customCheckbox} />
                  </label>
                  <p className={styles.taskTitle}>{task.title}</p>
                </div>
                  <Image
                    onClick={ () => remove(task.id) }
                    src={trashIcon}
                    alt="trash-logo"
                  />
              </div>
            )) : <p>Você não tem nenhuma tarefa adicionada</p>
          }
        </section>
        <p className={styles.text}>Tarefas finalizadas</p>
        <section className={styles.tasksToDoContainer}>
          {
            tasksFinished.length > 0 ?
            tasksFinished.map((task) => (
              <div className={styles.tasksToDo} key={task.id}>
                <div onClick={ () => handleCheckbox(task.id) } className={styles.toDoContainer}>
                  <label>
                    <input
                      checked={ task.finished }
                      onChange={ () => handleCheckbox(task.id) }
                      type="checkbox"
                    />
                  <span className={styles.customCheckbox} />
                  </label>
                  <p className={styles.textTitleFinished}>{task.title}</p>
                </div>
              <div
                onClick={ () => remove(task.id) }
              >
                <Image
                    onClick={ () => remove(task.id) }
                    src={trashIcon}
                    alt="trash-logo"
                  />
              </div>
            </div>
            )) : <p>Você ainda não tem nenhuma tarefa completa</p>
          }
        </section>
      </main>
      <div className={styles.buttonContainer}>
        <button
          className={styles.newTaskButton}
          onClick={ () => setAdding(!adding) }
        >
          Adicionar nova tarefa
        </button>
      </div>
      
      {
        adding && (
        <AddTask
          setCancel={setAdding}
          adding={adding}
          setTasks={setTaskList}
        />
      )
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
