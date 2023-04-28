const { Photo, User } = require("../models")
class PhotoController {
static async getPhotos(req, res){
    try {
        const { id } = req.UserData
  
        const data = await Photo.findAll({
          where: {
            UserId: id
          },
          include: [
            {
              model: User
            }
          ]
        })
  
        res.status(200).json(data)
      } catch (error) {
        res.status(error?.code || 500).json(error)
      }
    }

static async getPhotoById(req,res){
    try {

        const { id } = req.params
  
        const { id: userId } = req.UserData
  
        const data = await Photo.findOne({
          where: {
            id,
          }
        })
  
        if (!data) {
          throw{
            code: 404,
            message: "data not found"
          }
        }
  
        if (data.UserId !== userId) {
          throw{
            code: 403,
            message: "forbiden"
          }
        } 
  
        res.status(200).json(data)
      } catch (error) {
        res.status(error?.code || 500).json(error)
      }
}

static createPhoto(req, res){
    const { title, caption, image_url } = req.body;
    Photo.create({
        title,
        caption,
        image_url
    })
    .then(result =>{
        res.status(201).json(result)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
}

static updateOnePhotoById(req,res){
    let id = req.params.id
    const {title, caption, image_url} = req.body
    let data = {title, caption, image_url}
    Photo.update(data,{
        where:{id},returning:true
    })
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
    
}

static deleteOnePhotoById(req,res){
    let id= req.params.id
    Photo.destroy({where:{id}}) 
    .then(result =>{
        res.status(200).json(result)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
    }
}




module.exports = PhotoController