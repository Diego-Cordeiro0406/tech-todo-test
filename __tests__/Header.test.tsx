import "@testing-library/jest-dom"
import { expect, test, describe } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../src/app/components/Header'

describe('Testando componente <Header />', () => {
  test('Testando se componente e seus atributos são renderizados', () => {
    render(<Header />)
    const logo = screen.getByTestId("logo")
    const greetings = screen.getByTestId("greetings-text")
    const date = screen.getByTestId("date-text")

    expect(greetings).toBeInTheDocument()
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src')
    expect(date).toBeInTheDocument()
  })
})
