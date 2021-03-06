const express= require('express');
const hbs=require('hbs');
const fs=require('fs');
var app=express();
const port=process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine',hbs);
app.use(express.static(__dirname + '/public'));


hbs.registerHelper('currentYear',()=>{
return new Date().getFullYear()
})

// app.use((req,res,next)=>{
//     res.render('maintainance.hbs',{
//     })
//    })

app.get('/',(req,res)=>{
res.render('home.hbs',{
    welcomeMessage:'Hello Welcome to NodeJS',
    pageTitle: 'Home page'})
});

app.use((req,res,next)=>{
 var now=new Date().toString();
 var log= `${now} , ${req.method} , ${req.url}`
 fs.appendFile('server.log',log + '\n',(err)=>{
     if(err){
         console.log('Unable to save file at server.log');
     }
 });
    console.log(log);
    next();
})


app.get('/about',(req,res)=>{
res.render('about.hbs' , {
    pageTitle: 'About page'
});

});

app.get('/bad',(req,res)=>{
    res.send({
        Bad :'Service' ,
        name:'andre'
    });
});
app.listen(port ,()=>{
    console.log(`server is up on ${port}`)
}
);