require ("dotenv").config();
const express = require ("express");
const path = require ("path");
const cors = require ("cors");
const port = process.env.PORT;
const app = express ();

//conexao com banco de dados
// para testar precisaremos de uma conta no Mongo DB <atlas></atlas>
require ("./config/db.js")


// Config JSON e form data
app.use (express.json());
app.use(express.urlencoded({extended:false}));

//Resolvendo Cors, rodaremos API na porta 500 e node WEB na porta 3000
app.use (cors({credentials:true, origin:"http://127.0.0.1:3000"}));

// Diretorio de upload
app.use ("/uploads",
express.static(path.join(__dirname,"/uploads")));

//Rotas
const router = require ("./routes/Routes.js")

app.use (router)
app.listen (port,()=>{
    console.log(`Aplicação rodando na porta ${port}`);
})