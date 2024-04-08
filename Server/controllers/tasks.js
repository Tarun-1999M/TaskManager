const Task = require('../models/Task')

const getAllTasks = async(req,res)=>{
    try{
        const tasks = await Task.find({})
        res.status(200).json({tasks})
    }
    catch(err){
        res.status(500).json({msg:err})
    }
    
}


const createTask = async (req,res)=>{
    try{
    const task = await Task.create(req.body)
    res.status(201).json(task)
    }catch(err){
        res.status(500).json({msg:err})
    }
}

const getTask = async(req,res)=>{
    try{
        const {id:taskID} = req.params
        console.log(taskID)
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return res.status(404).send(`No Task found with ${taskID}`)
        }
        return res.status(200).json({task})

    }
    catch(err){
        res.status(500).json({msg:err})
    }

}



const deleteTask = async(req,res)=>{
   try{
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        return res.status(404).send(`No Task found with id:${taskID}`)
    }
    return res.status(200).json({task:null, status: "success"})

   }
   catch(err){
    res.status(500).json({msg:err})
   }
}

const updateTask = async(req,res)=>{
    try{
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true
    })
    if(!task){
        return res.status(404).send(`No Task found with id:${taskID}`)
    }
    return res.status(200).json({success:true})
    }
    catch(err){
        res.status(500).json({msg:err.errors.name.message})

    
    }


}


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}