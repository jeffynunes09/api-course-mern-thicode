import { countNews, createService,findByIdService,getAllService,searchByTitleService,topNewsService } from "../services/news.service.js"

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

export default searchByTitle;


export {
    getAll,
    create,
    topNews,
    findById,
    searchByTitle
};
