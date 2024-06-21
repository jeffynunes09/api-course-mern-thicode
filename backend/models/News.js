import mongoose from "mongoose";




const NewsSchema = new mongoose.Schema({


    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    createdAt :{
        type:Date,
        default:Date.now()
    },
    user :{

        type: mongoose.Schema.ObjectId,
        ref:'Usuario',
        required:true

    },
    likes: {

           type: Array,
           required:true 
    },
    comments:{

        
        type: Array,
        required:true
    }



})




const News = mongoose.model('News', NewsSchema  )

export default News