import user from '../model/userModel.js'


export const createUser = async(req,res) => {
    try {
        const userData = new user(req.body)
        const {email} = userData
        const userExist = await user.findOne({email})
        if(userExist){
            return res.status(400).json({message: ">> user already exists"})
        }
        const savedUser = await userData.save()
        res.status(200).json(savedUser)
    } catch (error) {
        res.status(500).json({error: ">> internal server error"})
    }
}


export const fetch = async(req,res) => {
    try {
        const userData = await user.find()
        if(!userData){
            return res.status(400).json({message: "users data found"})
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({error: ">> internal server error"})
    }
}

export const getone = async(req,res) => {
    try {
        const id = req.params.id
        const userData = await user.findById(id)
        if(!userData){
            return res.status(400).json({message: "user not found"})
        }
        res.status(200).json(userData)
    } catch (error) {
        res.status(500).json({error: ">> internal server error"})
    }
}

export const update = async(req,res) => {
    try {
        const id = req.params.id
        const userData = await user.findById(id)
        if(!userData){
            return res.status(400).json({message: "user not found"})
        }
        const updateData = await user.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json(updateData)
    } catch (error) {
        res.status(500).json({error: ">> internal server error"})
    }
}

export const deleteuser = async(req,res) => {
    try {
        const id = req.params.id
        const userData = await user.findById(id)
        if(!userData){
            return res.status(400).json({message: "user not found"})
        }
        await user.findByIdAndDelete(id, req.body, {new:true})
        res.status(200).json({message: "user deleted successfuly"})
    } catch (error) {
        res.status(500).json({error: ">> internal server error"})
    }
}




