import { useEffect } from 'react'
import './HeaderTemplate.scss'

export default function HeaderTemplate({ children, title }) {

  useEffect(()=>{
    //Line to prevent keeping the scroll across diferent routes
    window.scrollTo(0,0);
  }, [children])

  return (
    <>
        <header>
            <h3>{title}</h3>    
        </header>
        <main>
            {children}
        </main>
    </>
  )
}