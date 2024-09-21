"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import logo from '../../assets/logo.png'
import styles from './styles.module.scss'

export default function Header() {
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const today = new Date();

    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long', // Exibe o dia da semana por extenso
      day: '2-digit',  // Exibe o dia com dois dígitos
      month: 'long',   // Exibe o mês por extenso
      year: 'numeric'  // Exibe o ano com quatro dígitos
    };

    const formattedDate = today.toLocaleDateString('pt-BR', options);
    setCurrentDate(formattedDate);
  }, []);

  return (
    <section className={styles.container}>
      <section className={styles.mainContainer}>
        <section className={styles.headerContainer}>
          <div className={styles.textContainer}>
            <Image
              width={150}
              height={36}
              src={logo}
              alt="logo"
              data-testid="logo"
            />
          </div>
          <div className={styles.textContainer}>
            <p
              data-testid="greetings-text"
              className={styles.greetingsText}
            >
              Bem-vindo de volta, Marcus
            </p>
          </div>
          <div className={styles.textContainer}>
            <p
              data-testid="date-text"
              className={styles.headerText}
            >
              {currentDate}
            </p>
          </div>
        </section>
      </section>
      
    </section>
    
  )
}
