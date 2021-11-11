const Room = require('../models/Room')

module.exports = {
   create: async (req, res, next) => {
    Room?.exists({number:req.body.number}).then(async(result)=>{
        if(!result){
            try {
                const Room = new Room({...req.body})
                await Room.save().then(result=>res.status(201).send(result))
                .catch(err=>res.status(409).send(err))
                console.log(req.body)
            } catch (error) {
                console.log(error)
            }
        } else {
            res.status(409).json({
                message: "Resource Exist"
            })
        }
        
    }).catch(err=>console.error(err))
    },

    getAll: async (req, res, next) => {
        await Room.find({}).lean().then(result=>res.status(200).send(result))
            .catch(err=>res.status(503).send(err))     
    },

    getOne: async(req,res) => {
        await Room.findOne({_id:req.params.id}).lean()
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    deleteOne: async(req,res) =>{
        await Room.deleteOne({_id:req.params.id})
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    deleteAll: async(req,res) =>{
        await Room.deleteAll({})
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    update: async(req,res) =>{
        Room?.exists({_id:req.params.id}).then(async(result)=>{
            if(result){
                try {
                    await Room.updateOne({_id:req.params.id},{
                        $set: req.body
                    }).then(result=>res.status(201).send(result))
                    .catch(err=>res.status(409).send(err))
                } catch (error) {
                    console.log(error)
                }
            } else {
                res.status(404).json({
                    message: "Resource Doesn't Exist"
                })
            }
            
        }).catch(err=>console.error(err))
    }

}
