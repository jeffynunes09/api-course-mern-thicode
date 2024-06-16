
import News from '../models/News.js'
import mongoose from 'mongoose'

const createService = (body) => News.create(body)


const getAllService = (offset,limit) => News.find().sort({_id: -1}).skip(offset).limit(limit).populate('user')


const countNews = () => News.countDocuments()

const topNewsService = () => News.findOne().sort({_id: -1}).populate('user')

const findByIdService = (id) => News.findById(id).populate('user').populate('user')


const searchByTitleService = (title) => {
    return News.find({
        title: { $regex: title || '', $options: 'i' }
    })
    .sort({ _id: -1 })
    .populate('user');
};

const byUserService = (id) => News.find({
    user: id
}).sort({_id: -1}).populate('user')



 const updateService = (id,title,text,banner) => {
    News.findOneAndUpdate(
        {_id: id},
        {title,text,banner},
        {rawResult: true})


 }


const deletePostService = (id) => { News.findByIdAndDelete({_id: id})}
  


const likeNewsService = async (idNews, userId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(idNews);

        const result = await News.findByIdAndUpdate(
            { _id: objectId, "likes.userId": { $nin: [userId] } }, 
            { $push: { likes: { userId, created: new Date() } } },
            { new: true } // Retorna o documento atualizado
        );

        return result;
    } catch (error) {
        console.error("Error in likeNewsService:", error);
        throw error;
    }
};


const deleteLikeNewsService = async (idNews, userId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(idNews);

        const result = await News.findByIdAndUpdate(
            { _id: objectId }, 
            { $pull: { likes: { userId } } },
            { new: true } // Retorna o documento atualizado
        );

        return result;
    } catch (error) {
        console.error("Error in deleteLikeNewsService:", error);
        throw error;
    }
};



async function commentPostService(postId, message, userId) {
    if (!message) throw new Error("Write a message to comment");
  
    const post = await postRepositories.findPostByIdRepository(postId);
  
    if (!post) throw new Error("Post not found");
  
    await postRepositories.commentsRepository(postId, message, userId);
  }
  
  async function commentDeletePostService(postId, userId, idComment) {
    const post = await postRepositories.findPostByIdRepository(postId);
  
    if (!post) throw new Error("Post not found");
  
    await postRepositories.commentsDeleteRepository(postId, userId, idComment);
  }
  
export {
    deleteLikeNewsService, commentPostService,commentDeletePostService,
    byUserService, createService,countNews,getAllService,topNewsService,findByIdService,searchByTitleService,updateService,deletePostService,likeNewsService}