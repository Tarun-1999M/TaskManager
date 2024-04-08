import React, { useEffect, useState } from 'react'

const DisplayMessage = ({message}) => {
    const [display,setDisplay] = useState(true)

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setDisplay(false)
        },1000)

    return ()=>{clearTimeout(timer)}
    },[])
 

  return (
    <div>
      {display && <h1 className='text-green-500'>{message}</h1> }
    </div>
  )
}

export default DisplayMessage
