import { useState,useEffect } from "react";
import DisplayCard from "./components/DisplayCard";


function App() {
  const [task, setTask] = useState('');
  const [tasks,setTasks] = useState([])

  function handleChange(event) {
    setTask(() => event.target.value);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/v1/tasks');
        const data = await res.json();
          setTasks(data['tasks'])
        
      } catch (err) {
        console.log(err);
      }
    };
  
    fetchData();
  }, [tasks]);
  

  async function handleSubmit(event) {
    event.preventDefault();
    try{
    const response = await fetch('/api/v1/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'name': task,
      }),
    });
    const data = await response.json();
  }
  catch(error){
    console.log(error)
  }
  setTask("")
  }

  return (
    <div className=' w-[500px] min-h-screen mx-auto flex flex-col gap-4 justify-center items-center'>
      
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4 border-2 border-black p-4 shadow-xl rounded-md w-[500px] bg-cyan-200">
      <h1 className="text-4xl text-bold">Task Manager</h1>
      <h1 className="text-2xl text-bold">Include your tasks!</h1>
        <div className='border-2 border-black rounded-sm'>
          <input
            type="input"
            placeholder='e.g., wash dishes'
            onChange={handleChange}
            value={task}
            className="p-2"
          />
        </div>
        <button type="submit" className='border-2 border-black p-1 bg-violet-600 rounded-sm text-white'>Submit</button>
      </form>
      <div className="text-2xl font-bold underline">TASKS</div>
      {tasks && tasks.length>0?  <DisplayCard tasks={tasks}/> : <div className="text-2xl">No Tasks to show</div>}
    </div>
  );
}

export default App;
