import express from "express";
import mongoose, { mongo } from "mongoose";
import {Hand} from './db.mjs';
import handRoute from './routes/handRoute.js';
import './config.js'
import cors from 'cors';
import basicAuth from 'express-basic-auth';

const app = express();
app.use(express.urlencoded({ extended: false }));

import url from 'url';
import path, { dirname } from 'path';
export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + "/public"));


const users = {
    'admin': 'password123',
    'guest': 'blackjack',
};

app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
    })
);
    
app.use(basicAuth({
    users: users,
    challenge: true,
    unauthorizedResponse: 'Unauthorized',
    clearUnauthorizedResponse: true,
  }));


app.get('/css/styles.css', (req, res) => {
    res.setHeader('Content-Type', 'text/css');
    res.sendFile(__dirname + '/public/css/styles.css');
  });


app.get('/', async (req, res) => {
    try {
        const hand = await Hand.find();        
        res.render("home", { Hands: hand });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

app.get('/handHistory/addHand', (req,res)=>{
    res.render('addHand');
  });
  
app.post('/handHistory/addHand', async (req, res) => {
    
    const newHand = new Hand(req.body);
    await newHand.save();
    res.redirect('/');
  });

app.get('/handHistory/test', (req,res) => {
    Hand.find().then((hand)=>{
        res.render("test", {Hands: hand});
    });
});

app.get('/handHistory/solutions', (req,res) => {
    Hand.find().then((hand)=>{
        res.render("solutions", {Hands: hand});
    });
});



app.post('/', async (req, res) => {
    try{
        if(!req.body.dealerHand){ 
            return res.status(400).send({
            message: 'Hand History Invalid',
        });
    }
    return res.redirect('/');
}catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message});
}
});


app.get('/handHistory', async (req, res) => {
    try{
        const hands = await Hand.find({});
        return res.status(200).json({});
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.get('/clearData', async (req, res) =>{
    await Hand.deleteMany({});
    res.redirect('/');
})

app.post('/handHistory/test', async (req, res) => {
    try{
        if(!req.body.dealerHand){ 
            return res.status(400).send({
            message: 'Hand History Invalid',
        });
    }
    return res.redirect('/handHistory/test');
}catch(error){
    console.log("error HERE!");
    response.status(500).send({message: error.message});
}
});

app.post('/handHistory/solutions', async (req, res) => {
    try{
        if(!req.body.dealerHand){ 
            return res.status(400).send({
            message: 'Hand History Invalid',
        });
    }
    return res.redirect('/handHistory/solutions');
}catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message});
}
});

app.delete('/handHistory/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const result = await Hand.findByIdAndDelete(id);
        if (!result){
            return res.status(404).json({message: 'Book not found'});
        }
        return res.status(200);
    }catch(error){
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

app.put('/handHistory/:id', async(req,res)=>{
    try{
    if(
        !req.body.dealerHand||
        !req.body.playerHand||
        !req.body.soft||
        !req.body.value||
        !req.body.action||
        !req.body.reason
        ){
            return res.status(400).send({
                message: "Missing key details",
            });
        }

        const { id} = req.params;
        const result = await Hand.findByIdAndUpdate(id, req.body);

} catch (error){
    console.log(error.message);
    res.status(500).send({message:error.message});
    }
});

 mongoose
    .connect(process.env.mongoDBURL)
    .then(() =>{
    console.log('Connected to DB');
    app.listen(process.env.PORT, () =>{
        console.log(`App is listening to port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

export default app;
