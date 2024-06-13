

//CONEXÃO COM BANCO
import { set, connect } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: './.env' })


async function main(){
try {
    set("strictQuery", true)
await connect(process.env.DATABASE)
console.log("Conexão com banco funcionando")
} catch (error) {

console.error(`Error ${error}`)

}

}

export default main




