import React from 'react'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import styles from './styles.module.scss'

export default function Header() {
  return (
    <section className={styles.container}>
      <section className={styles.mainContainer}>
        <section className={styles.headerContainer}>
          <div className={styles.textContainer}>
            <Image src={logo} alt="logo"/>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.greetingsText}>Bem-vindo de volta, Marcus</p>
          </div>
          <div className={styles.textContainer}>
            <p className={styles.headerText}>Segunda, 01 de dezembro de 2025</p>
          </div>
        </section>
      </section>
      
    </section>
    
  )
}
