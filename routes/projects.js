import express from 'express'

const router = express.Router()

//in memory torage for now 
let projects = [
    {id: 1 , title: 'build a website ', client:'ahmed',budget:5000, status : 'active'},
    {id: 2 , title: 'ai application', client:'jon',budget:2000, status : 'pending'}]


//get all the projects 
router.get('/', (req , res) => {
    res.json({success: true, data: projects })
})

//get single project
router.get('/:id', (req, res) => {
    const project = projects.find(p=>p.id === parseInt(req.params.id))
    if(!project) return res.status(404).json({success: 'fail', message:'server not found'})
    res.json({success:true, data: project})
})

//POST create project
router.post('/', (req, res) => {
    const {title, client, budget} = req.body
    if (!title||!client||!budget) {
        return res.status(400).json({success:'fail', message:'need client title and budget '})
    }
    const newProject = {
        id: Date.now(),
        title,
        client,
        budget,
        status:'pending'
    }
    projects.push(newProject)
    res.status(201).json({success: true, data: newProject })
})

//put update a project status
router.put('/:id', (req, res) => {
    const project = projects.find(p=>p.id === parseInt(req.params.id))
    if(!project) return res.status(404).json({success:'fail', message:'server not found'})
    project.status = req.body.status || project.status
    res.json({success:true, data: project})
})


// delete a project
router.delete('/:id', (req, res) => {
    const index = projects.findIndex(p => p.id === parseInt(req.params.id))
    if(index === -1) return res.status(404).json({status:false, message:'id not found'})
    projects.splice(index, 1)
    res.json({success: true, message:'project deleted'})
})
export default router