// controllers here
import { Images } from '../models/imageModel.js';
import { v2 as cloudinary } from 'cloudinary';

// upload a image 
export const postImage = async (req, res) => {


    try {
       
        const myCloud = await cloudinary.uploader.upload(req.body.imageData, {
            folder: "sampleFolder",


        });

        await Images.create({

            public_id: myCloud.public_id,
            url: myCloud.secure_url,
            caption: req.body.caption,
            user: req.user

        });
        const allImages = await Images.find({ user: req.user });
        res.status(200).
            json({
                success: true,
                message: 'Image uploaded successfully',
                allImages
            })
    } catch (error) {

        res.status(400).json({
            success: false,
            message: "Can't post a image"
        })
    }
}

// get all images 
export const getAllImages = async (req, res) => {
    try {
        const allImages = await Images.find({ user: req.user });
        res.status(200).json({ success: true, allImages })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "No Images Found!"
        })
    }
}

//get unique Image using image Id
export const getImamgById = async (req, res) => {
    const { id } = req.params
    try {
        const Image = await Images.findById(id)
        res.status(200).json({
            success: true,
            Image
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: "No Images Found!",
        })
    }

}

//delete data 

export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params

        const image = await Images.findById(id)

        cloudinary.uploader.destroy(image.public_id, (error, result) => {
            if (error) {
                console.error(error);
            }

        });

        await Images.findByIdAndDelete(id)
        const allImages = await Images.find({ user: req.user });

        res.status(200).json({
            success: true,
            allImages,
            message: 'Image deleted succesfully'
        })
    }
    catch (err) {
        res.status(400).json({
            success: false,
            message: err.message
        })
    }

}