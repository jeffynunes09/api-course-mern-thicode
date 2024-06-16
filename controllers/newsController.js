import {deleteLikeNewsService, byUserService, countNews, createService,deletePostService,findByIdService,getAllService,likeNewsService,searchByTitleService,topNewsService, updateService } from "../services/news.service.js"

const create = async (req,res) => {

try {
 
 const {title,text,banner} = req.body
 
 if( !title || !text || !banner) {
    res.status(400).json({
        message: 'Submit all fieds for registration!'
    })
 }

 const userID =  req.userId  
 console.log(userID)
  const news = await createService({
 title,
 text,
 banner,
 user: userID
 

 })

 res.status(200).json({
 news
 })



} catch (error) {
    console.log(error)
    
}

}



const getAll = async (req, res) => {
    try {
        let { limit, offset } = req.query;
        limit = Number(limit) ;
        offset = Number(offset);

        if(!limit) {
            limit = 5
        }
        if(!offset){
            
            offset  = 0
        }

        const news = await getAllService(limit, offset);
        const total = await countNews();
        const currentUrl = req.baseUrl;

        const next = offset + limit;
        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            return res.status(400).send({
                message: 'There are no registered users'
            });
        }

        res.status(200).json({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,
            results: news.map((item) => ({
                _id: item._id,
                title: item.title,
                text: item.text,
                banner: item.banner,
                likes: item.likes,
                comments: item.comments,
                user: {
                    name: item.user.name,
                    userName: item.user.userName,
                    avatar: item.user.avatar
                }
            }))
        });
    } catch (error) {
        console.log(error)
    }
};


const topNews = async(req,res,next) => {
 try{
 const news = await topNewsService()

 if(!news){
    return res.status(400).json({
        message: 'There is no registered post!'
    })
 }

 res.status(200).json({
    news: {
        
            _id: news._id,
            title: news.title,
            text: news.text,
            banner: news.banner,
            likes: news.likes,
            comments: news.comments,
            user: {
                name: news.user.name,
                userName: news.user.userName,
                avatar: news.user.avatar
            }
    }
 })}

 catch(error){
    console.log(error)
 }

}

const findById = async (req,res,next) => {
    
try {
    const{ id } = req.params
    const news = await findByIdService(id)
    

return res.status(200).json({
    news: {
        
        _id: news._id,
        title: news.title,
        text: news.text,
        banner: news.banner,
        likes: news.likes,
        comments: news.comments,
        user: {
            name: news.user.name,
            userName: news.user.userName,
            avatar: news.user.avatar
        }
}
})


} catch (error) {
    console.log(error)
}



}

const searchByTitle = async (req, res, next) => {
    try {
        const { title } = req.query;
        console.log('Title:', title); 
        const news = await searchByTitleService(title);

        if (news.length === 0) {
            return res.status(400).json({
                message: 'There are no news with this title'
            });
        }

        // Mapeie os resultados para retornar o formato desejado
        const formattedNews = news.map(item => ({
            _id: item._id,
            title: item.title,
            text: item.text,
            banner: item.banner,
            likes: item.likes,
            comments: item.comments,
            user: {
                name: item.user.name,
                userName: item.user.userName,
                avatar: item.user.avatar
            }
        }));

        return res.status(200).json({
            news: formattedNews
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


const byUser = async (req,res,next) => {

    const id = req.userId;

    try {
      const posts = await byUserService(id);
      return res.status(200).send(posts);
    } catch (e) {

      return res.status(500).send(e.message);
    }
      }



const update =  async (req,res,next) => {

try {
    
    const {title,text,banner} = req.body
    const {id }= req.params

    if( !title || !text || !banner) {
        res.status(400).json({
            message: 'Submit all fieds for registration!'
        })
     }
   
     const news = await findByIdService(id)

     if(news.user._id.toString() != req.userID){
        return res.status(403).send({
            message : "You don't have permission to update this post"
        })
     } 

     await updateService(id,title,text,banner)

     return res.send({
        message: "Post successfully updated!"
     })

} catch (error) {
    
    res.status(200).send({
        message:error.message
    })
}



}



 const  deletePostController = async  (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const news = await findByIdService(id);
  
      if (news.user._id.toString() !== userId) {
        return res.status(403).send({
          message: "You don't have permission to delete this post"
        });
      }
  
      await deletePostService(id, userId);
  
      return res.send({ message: "Post deleted successfully" });
    } catch (err) {
      return res.status(500).send({ message: err.message });
    }
  }
  



  const likeNews = async (req, res) => {
    try {
        const { id } = req.params;
        const userID = req.userId;

        // Certifique-se de que id e userID não sejam undefined
        if (!id || !userID) {
            return res.status(400).json({ error: 'Missing id or userID' });
        }

        const newLiked = await likeNewsService(id, userID);

        if (!newLiked) {
            await deleteLikeNewsService(id, userID);
            return res.status(200).send({
                message: 'Like successfully removed!'
            });
        } else {
            res.json({ message: 'Like added successfully', data: newLiked });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

async function commentPostController(req, res) {
    const { id: postId } = req.params;
    const { message } = req.body;
    const userId = req.userId;
  
    try {
      await postService.commentPostService(postId, message, userId);
  
      return res.send({
        message: "Comment successfully completed!",
      });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }
  
  async function commentDeletePostController(req, res) {
    const { id: postId, idComment } = req.params;
    const userId = req.userId;
  
    try {
      await postService.commentDeletePostService(postId, userId, idComment);
  
      return res.send({ message: "Comment successfully removed" });
    } catch (e) {
      return res.status(500).send(e.message);
    }
  }



export default searchByTitle;


export {
    getAll,
    create,
    topNews,
    findById,
    searchByTitle,
    byUser,
    update,
    deletePostController,
    likeNews,
    commentPostController,
    commentDeletePostController
};
