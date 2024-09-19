import React from 'react'
import Image from 'next/image'
import logo from '../assets/logo.png'

export default function Header() {
  return (
    <section>
      <Image src={logo} alt="logo"/>
      <div>
        <p>Bem-vindo de volta, Marcus</p>
      </div>
      <div>
        <p>Segunda, 01 de dezembro de 2025</p>
      </div>
    </section>
  )
}
