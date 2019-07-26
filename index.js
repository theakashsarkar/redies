const express    = require('express');
const rc         = require('./redis');
const bodyParser = require('body-parser');
const app        = express();

app.use(bodyParser.json());

app.post('task',(req,res)=>{
    if(req.body.task){
        rc.lpushAsync('my_task',req.body.task)
        .then(e=>res.end({message:"data added"}))
    }
    else{
        res.json({
            error:true,
            message:'please specify task'
        }).status(401); 
    }
});
app.get('/task',(req,res)=>{
    rc.lrangeAsync('my_task',0,-1)
    .then(d=>{
        res.json({
            data:d
        })
    }).catch(e=>{
        res.json({
            error:true,
            message:'Cloud not found'
        })
    }).status(5000);
})