const Hostel = require('../models/Hostel')
const Room = require('../models/Room')


// check if superuser or isAdmin for specific controller or check role priviledges before performing further actions
module.exports = {
   create: async (req, res, next) => {
    Hostel?.exists({hostelNumber:req.body.hostelNumber}).then(async(result)=>{
        if(!result){
            try {
                const hostel = new Hostel({...req.body})
                await hostel.save().then(result=>res.status(201).send(result))
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
        await Hostel.find({}).lean().then(result=>res.status(200).send(result))
            .catch(err=>res.status(503).send(err))     
    },

    getOne: async(req,res) => {
        await Hostel.findOne({_id:req.params.id}).lean()
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    deleteOne: async(req,res) =>{
        // cascade rooms on delete, normally use fetch api here to get all rooms, store in an array
        await Room.deleteMany({hostelId:req.params.id}).then(result=>res.status(200).send(result))
            .catch(err=>res.status(503).send(err))  

        await Hostel.deleteOne({_id:req.params.id})
            .then(result=>res.status(200).send(result))
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    deleteAll: async(req,res) =>{
        await Hostel.deleteMany({})
            .then(result=>{
                Room.deleteMany({}).then(r=>console.log(r)).catch(err=>console.log(err))
                res.status(200).send({...result, info:"deleted all hostels. Associated rooms also deleted"})
            })
            .catch(err=>res.status(404).json({
                ...err,
                message: "Not found"
            }))
    },

    update: async(req,res) =>{
        Hostel?.exists({_id:req.params.id}).then(async(result)=>{
            if(result){
                try {
                    await Hostel.updateOne({_id:req.params.id},{
                        $set: req.body
                    }).then(result=>res.status(201).send({
                        ...result,
                        info: "successfully updated hostel"
                    }))
                    .catch(err=>res.status(501).send(err))
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
