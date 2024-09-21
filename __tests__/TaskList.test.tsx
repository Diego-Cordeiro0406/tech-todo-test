import "@testing-library/jest-dom"
import { expect, test, describe, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import TaskList from '../src/app/components/TaskList'

import userEvent from '@testing-library/user-event';

describe('Testando componente <TaskList />', () => {
  beforeEach(() => {
    // Simulando tarefas no localStorage
    const mockTasks: never[] = [];
    localStorage.setItem('tasks', JSON.stringify(mockTasks));
  });
  test('Testando se componente e seus atributos são renderizados', () => {
    render(<TaskList />)
    const messages = screen.getAllByTestId('task-message')
    const emptyFinishedMessage = screen.getByTestId('empty-finished-message')
    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const addTaskButton = screen.getByTestId('add-task-button')

    expect(messages[0]).toBeInTheDocument()
    expect(messages[1]).toBeInTheDocument()
    expect(emptyFinishedMessage).toBeInTheDocument()
    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()
  })

  test('Testando se o componente <AddTask /> é renderizado ao clicar no botão', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const addTaskButton = screen.getByTestId('add-task-button')

    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)
    const input = screen.getByTestId('input-task')
    expect(input).toBeInTheDocument()
  })

  test('Testando se é possivel adicionar uma tarefa', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const addTaskButton = screen.getByTestId('add-task-button')

    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)
    const input = screen.getByTestId('input-task')
    expect(input).toBeInTheDocument()

    await user.type(input, 'Lavar roupa')

    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
    await user.click(addButton)

    await waitFor(
      () => expect(emptyOpenMessage).not.toBeInTheDocument()
    );
  })

  test('Testando se é possivel cancelar a adição de uma tarefa', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const addTaskButton = screen.getByTestId('add-task-button')

    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)

    const removeButton = screen.getByTestId('remove-button')
    expect(removeButton).toBeInTheDocument()
    await user.click(removeButton)

    await waitFor(
      () => expect(removeButton).not.toBeInTheDocument()
    );
  })

  test('Testando se é possivel deletar uma tarefa', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const addTaskButton = screen.getByTestId('add-task-button')

    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)
    const input = screen.getByTestId('input-task')
    expect(input).toBeInTheDocument()

    await user.type(input, 'Lavar roupa')

    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
    await user.click(addButton)

    await waitFor(
      () => expect(emptyOpenMessage).not.toBeInTheDocument()
    );

    const deleteButton = screen.getByTestId('delete-button-open')
    expect(deleteButton).toBeInTheDocument()
    
    user.click(deleteButton)
    await waitFor( 
      () => {
        expect(screen.getByTestId('delete-confirmation-button'))
        .toBeInTheDocument()
      }
    );

    user.click(screen.getByTestId('delete-confirmation-button'))
    await waitFor(
      () => expect(screen.getByTestId('empty-open-message')).toBeInTheDocument()
    );
  })

  test('Testando se é possivel cancelar a remoção uma tarefa', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const addTaskButton = screen.getByTestId('add-task-button')

    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)
    const input = screen.getByTestId('input-task')
    expect(input).toBeInTheDocument()

    await user.type(input, 'Lavar roupa')

    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
    await user.click(addButton)

    await waitFor(
      () => expect(emptyOpenMessage).not.toBeInTheDocument()
    );

    const deleteButton = screen.getByTestId('delete-button-open')
    expect(deleteButton).toBeInTheDocument()
    
    user.click(deleteButton)
    await waitFor( 
      () => {
        expect(screen.getByTestId('delete-cancel-button'))
        .toBeInTheDocument()
      }
    );

    user.click(screen.getByTestId('delete-cancel-button'))
    await waitFor(
      () => expect(emptyOpenMessage)
        .not.toBeInTheDocument()
    );
  })

  test('Testando se é possivel finalizar uma tarefa', async() => {
    render(<TaskList />)
    const user = userEvent.setup()

    const emptyOpenMessage = screen.getByTestId('empty-open-message')
    const emptyFinishedMessage = screen.getByTestId('empty-finished-message')
    const addTaskButton = screen.getByTestId("add-task-button")

    expect(emptyOpenMessage).toBeInTheDocument()
    expect(addTaskButton).toBeInTheDocument()

    await user.click(addTaskButton)
    const input = screen.getByTestId('input-task')
    expect(input).toBeInTheDocument()

    await user.type(input, 'Lavar roupa')

    const addButton = screen.getByTestId('add-button')
    expect(addButton).toBeInTheDocument()
    await user.click(addButton)

    await waitFor(
      () => expect(emptyOpenMessage).not.toBeInTheDocument()
    );
    
    const taskContainer = screen.getByTestId('task-container')
    expect(taskContainer).toBeInTheDocument()

    user.click(taskContainer)
    await waitFor(() => expect(screen.getByTestId('empty-open-message'))
      .toBeInTheDocument())
    
    expect(emptyFinishedMessage).not.toBeInTheDocument()
  })

  afterEach(() => {
    // Limpando o localStorage após cada teste
    localStorage.clear();
  });
})
