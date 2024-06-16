import express, { json } from 'express';
const app = express()

import routerUser from './routes/routes.user.js';
import routerAuth from '.routes/auth.user.js';
import newsRoute from '.routes/news.route.js'
const port = 3000

app.use(json());

//TESTE
app.get('/home', (req, res) => {

    res.send('Hello World')
})
app.use('/news',newsRoute)
app.use('/user', routerUser)
app.use('/auth', routerAuth)

//CONEXÃO COM O MONGO DB
import connect from "./DB/dataBase.js";
connect()


//SERVER
app.listen("3000" || port, () => {
    console.log("servidor rodando")
})