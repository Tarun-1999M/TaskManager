import { useState } from "react";


function App() {
  const [task, setTask] = useState('');
  const [serverResponse, setServerResponse] = useState('')
  function handleChange(event) {
    setTask(() => event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try{
    const response = await fetch('/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'task': task,
      }),
    });
    const data = await response.json();
    setServerResponse(data.message)
  }
  catch(error){
    setServerResponse('Error fetching the data')
    console.log(error)
  }
  }

  return (
    <div className=' w-[500px] min-h-screen mx-auto flex justify-center items-center'>
      
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center gap-4">
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
      <div>{serverResponse}</div>
    </div>
  );
}

export default App;
