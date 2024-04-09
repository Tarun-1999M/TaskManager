import React, { useEffect,useState } from 'react'
import { useParams,Navigate } from 'react-router-dom'
import DisplayMessage from './components/DisplayMessage'
const IndividualTask = () => {
   const [formData,setFormData] = useState({name:"",completed:false})
   const [message,setMessage] = useState("")
   const {id} = useParams()
   const [isValid,setIsValid] = useState(true)
   const url = `/api/v1/tasks/${id}`;

   useEffect(()=>{
    const fetchData = async(id)=>{
        try{
            const res = await fetch(url)
    
            if(res.ok){
                const {task} = await res.json()
                console.log(task)
                setFormData((prevValue)=>({...prevValue,name:task.name,completed:task.completed==="true"}))
            }
            else{
                const {msg} = await res.json
                console.error('Error while fetching data',res.status)
                if(res.status===404){
                    alert('Cannot find the selected Task')
                }
                else if(res.status===500){
                    console.log('Error in fetching the data')
                     setIsValid(false);
                    
                }
            }
    
        }
        catch(err){
            console.error('Error',err)

        }
       }
       fetchData()
   },[])
   

   if(!isValid){
    return <Navigate to="/not-found" replace/>
   }
   async function handleSubmit(e){
    e.preventDefault()
    const url=`/api/v1/tasks/${id}`
    
    try{
    const res = await fetch(url,{
        method:"PATCH",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    if(res.ok){
        const {success} = await res.json()
        setMessage("Updated Sucessfully")
    }
    else {
        console.error('Error status',res.status)
        if(res.status===404){
            alert('No task found with given id')
        }
        else if(res.status===500){
            const {msg} = await res.json()
            setMessage(msg)
        }
    }
}
catch(error){
    console.error('Error',err)
}  }


  return (
    <div className='flex justify-center items-center h-screen '>
    <div className='flex flex-col  gap-4 border-2 border-black p-4 shadow-xl rounded-md w-[500px] bg-cyan-200 text-xl'>
      <h1 className='text-2xl font-bold text-center'>Edit task</h1>
      <form onSubmit={handleSubmit}>

      <div className='flex justify-between items-center'>
        <h1>Task ID</h1>
        <h1>{id}</h1>
      </div>

      <div className='flex justify-between items-center'>
        <label>Name</label>
        <div className='border-2 border-black rounded-sm'>
            <input type="text" value={formData['name']} onChange={(e)=>setFormData((prevValue)=>({...prevValue,name:e.target.value}))}/>
        </div>
      </div>

      <div className='flex justify-between items-center'>
        <label>Completed</label>
        <div className='h-9 w-9 text-2xl'><input type="checkbox" checked={formData.completed} onChange={(e)=>setFormData((prevValue)=>({...prevValue,completed:e.target.checked}))}/></div>
      </div>
      <div className='text-center'>
        <button type="submit" className='border-2 border-black p-2 bg-white rounded-sm'>Edit task</button>
        {message  && <DisplayMessage message={message} />}
        </div>
      </form>
    </div>
    </div>
  )
}

export default IndividualTask
