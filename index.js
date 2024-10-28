//Dependencias
const express = require('express')
const bodyParser = require('body-parser')
var jwt= require ('jsonwebtoken');

//modelos
const modelo= require("./modelo.js")

const app = express()

const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/', (req, res) => {
modelo.inicio('Sebastian',function(err,filas)
{
if(err){
    return res.status(500).json({error: "Ocurrió un error"});

}else
{
res.json (filas);
}
})


  //res.send('Hello World!')
})
app.get('/verificar',function(req,res){
    var email = req.query.email;
    var pass=req.query.pass;

    modelo.verificar(email,pass,function(err,filas){
        if (err){
            return res.status(500).json ({error:"Ocurrio un error"})
        }
        else {
            return res.json (filas);
        }
    })
})
app.post('/enviarCorreo',function(req,res){
var email= req.body.email;
var token=req.body.token;

modelo.enviarCorreo(email,token,function(err,filas){
    if (err){
        return res.status(500).json ({error:"Ocurrio un error"})
    }
    else {
        return res.json (filas);
    }
})

})

app.get('/verificarToken', function(req, res) {
    var token = req.query.token; // Obtén el token desde los parámetros de la URL

    jwt.verify(token, 'ClaveToken2024',function(err,filas){
        if(err){
            return res.status(500).json({status: "Ocurrio un error", mensaje: err})
        }
        else
        {
            return res.status(200).json({status: "Todo OK", mensaje: filas})
        }
    })
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

