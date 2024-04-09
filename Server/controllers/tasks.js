const Task = require('../models/Task')
const asyncWrapper = require('../AsyncWrapper')
const getAllTasks = asyncWrapper(async(req,res)=>{
        const tasks = await Task.find({})
         return res.status(200).json({tasks})
 
})


const createTask = asyncWrapper(async (req,res)=>{
    
    const task = await Task.create(req.body)
    return res.status(201).json(task)
}
)

const getTask = asyncWrapper(async(req,res,next)=>{

        const {id:taskID} = req.params
        console.log(taskID)
        const task = await Task.findOne({_id:taskID})
        if(!task){
            const error = new Error('Not Found')
            error.status=404
            return next(error)
        }
        return res.status(200).json({task})

   
    

})



const deleteTask = asyncWrapper(async(req,res,next)=>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndDelete({_id:taskID})
    if(!task){
        const error = new Error('Not Found')
        error.status = 404
        return next(error)
    }
    return res.status(200).json({task:null})

   
})

const updateTask = asyncWrapper(async(req,res,next)=>{
    const {id:taskID} = req.params
    const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
        new:true,
        runValidators:true
    })
    if(!task){
        const error = new Error('Not Found')
        error.status = 404
        return next(error)
    }
    return res.status(200).json({task:null})
   

})


module.exports={
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}