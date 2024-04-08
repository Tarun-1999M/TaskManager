import React from 'react'
import deleteicon from "../assets/deleteicon.png"
import editicon from "../assets/editicon.png"
import { NavLink } from 'react-router-dom'

const DisplayCard = ({tasks}) => {

 async function handleDelete(id){
    try{
    const res = await fetch(`/api/v1/tasks/${id}`,{
        method:"DELETE",
    })
    if(res.ok){
        const data =await res.json()
        console.log(data)
    }
    else{
        console.error('deletion failed with status',res.status)
        if(res.status===404){
            alert('No Task Found with given id for deletion')
        }
        else if(res.status===500){
            alert('Server Error, please try again')
        }

    }

    }
    catch(err){
        console.error("Network Error",err)
        alert('Failed to connect to server')
    }
 }



  return (
    <div>
     {
        tasks && tasks.map((task)=>{
         return <div className={` w-[500px] p-6 shadow-xl flex justify-between border-2 border-black font-bold rounded-sm mb-4 
         ${task.completed==="true"? "line-through" : ""}`}>
            {task.name}
            <div className='flex gap-4'>
           <NavLink to={`/${task._id}`} target='_blank'>
                <img src={editicon} alt="edit icon" className='w-[25px] h-[25px] cursor-pointer'/>
            </NavLink>
            <div onClick={()=>handleDelete(task._id)}>
                <img src={deleteicon} alt="delete icon" className='w-[25px] h-[25px] cursor-pointer'/>
            </div>
            </div>
            </div>
        })
      }
    </div>
  )
}

export default DisplayCard
