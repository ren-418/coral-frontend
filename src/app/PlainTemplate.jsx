import { useEffect } from 'react'

export default function PlainTemplate({ children }) {

  useEffect(()=>{
    //Line to prevent keeping the scroll across diferent routes
    window.scrollTo(0,0);
  }, [children])

  return (
    <>
        <main>
            {children}
        </main>
    </>
  )
}