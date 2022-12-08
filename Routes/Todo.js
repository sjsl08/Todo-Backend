const router = require("express").Router()
const JWT_auth = require("../MiddleWare/JWT_AUTH")

const TODO = require("../Models/TodoModel")

router.post("/createTodo", JWT_auth, async (req, res) => {

    const { task, user } = req.body
    console.log(req.body);
    try {
        const newTodo = new TODO({ task, user })
        const result = await newTodo.save()
        res.status(200).json({ res: result })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.get("/getTodo/:id", async (req, res) => {

    const { id } = req.params
    console.log(id);

    try {
        const result = await TODO.find({ user: id })
        if (result.length === 0) {
           return res.status(200).json({ res: undefined })
        }
        res.status(200).json({ res: result })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})

router.delete("/delete/:id", async (req, res) => {

    const { id } = req.params
    console.log(id);

    try {
        const result = await TODO.deleteOne({ _id: id })
        res.status(200).json({ res: result })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


router.put("/edit/:id", async (req, res) => {

    const { id } = req.params
    console.log(id);
    const { isCompleted } = req.body
    console.log(isCompleted);

    try {
        const result = await TODO.updateOne({ _id: id }, { $set: { isCompleted: isCompleted } })
        res.status(200).json({ res: result })
    } catch (error) {
        res.status(400).json({ message: error })
    }
})


router.put("/editSave/:id", async (req, res) => {

    const { id } = req.params
    console.log(id);
    // const { editedTask } = req.body
    console.log(req.body);

    try {
        const result = await TODO.replaceOne({ _id: id }, req.body)
        res.status(200).json({ res: result })
    } catch (error) {
        res.status(400).json({ error })
    }
})


module.exports = router;
