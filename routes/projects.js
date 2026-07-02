import express from 'express'
import Project from '../models/Project.js'

const router = express.Router()


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})


router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})


router.post('/', async (req, res) => {
  try {
    const { title, client, budget } = req.body
    if (!title || !client || !budget) {
      return res.status(400).json({ success: false, message: 'All fields required' })
    }
    const project = new Project({ title, client, budget })
    const saved = await project.save()
    res.status(201).json({ success: true, data: saved })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    )
    if (!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, data: project })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})


router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Not found' })
    res.json({ success: true, message: 'Project deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
})

export default router