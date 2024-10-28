const {call} = require('function-bind');
var mysql      = require('mysql');
var jwt= require ('jsonwebtoken');
var nodemailer=require ('nodemailer');
let modelo= {};
var hostDB ='localhost';
var userDB='root';
var passDB='';
var databaseDB ='prueba';
modelo.inicio= function(nombre1,callback)
{
callback(null,{nombre: nombre1,status:"Conectado"})
}
modelo.verificar=function(email,pass,callback)
{
var conexion = mysql.createConnection({
    host: hostDB,
    user: userDB,
    password:passDB,
    database: databaseDB
});
conexion.connect((err)=>
{if (err) {console.log(err);
            }

});
if (conexion)
{
    var consulta="SELECT * FROM usuarios WHERE correo= '"+email+" 'and pass='"+pass+"' ";

    conexion.query (consulta,function(err, fila){
        if(fila.length>=1){
            var token=jwt.sign({email:email},'ClaveToken2024');
            callback (null,{status:"OK",datos:fila, toke:token,mensaje:"Usuario encontrado"})
        }
        else 
        {
            callback (null,{status:"OK",datos:null,mensaje:"Usuario NO encontrado"})    
        }


    });
}
conexion.end();
}

modelo.enviarCorreo= function (email,token,callback)
{
    let transporter= nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure: true,
        auth:{
            user:'erramiz.ramirez9@gmail.com',
            pass:'hjxdaaorzcruepze'
        
        }
    })
    let mailOptions={
        from:'erramiz.ramirez9@gmail.com',
        to: email,
        subject:'Confirmación del correo',
        html:'<p>Has click en el siguiente link <a href="http://localhost:3000/verificarToken?token='+token+'"> Has click aquí </a> </p>'
    }

    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Correo enviado exitosamente");
            callback(null,{status:'OK',mensaje:"Correo enviado exitosamente"})
        }

    })

}


module.exports=modelo;
