import express from "express";
import mongoose, { mongo } from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import {Hand} from './db.mjs';
import handRoute from './routes/handRoute.js';
import cors from 'cors';
//const Hand = mongoose.model('Hand');

const app = express();
app.use(express.urlencoded({ extended: false }));



//for now, use HBS to show proof of concept
import url from 'url';
import path, { dirname } from 'path';
//export const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
app.set('view engine', 'hbs');
const __dirname = "/backend/views";
console.log(__dirname);
app.set('views',__dirname);
app.use(express.static(__dirname + "public"));




app.get('/',(req, res) => {
    //console.log(req);
    console.log(__dirname);
    Hand.find().then((hand)=>{
        res.render("home", {Hands: hand});
    })
    //res.render("home");

});

//app.use('/handHistory', handRoute);

app.get('/handHistory/addHand', (req,res)=>{
    res.render('addHand');
  });
  
  app.post('/handHistory/addHand', async (req, res) => {
    
    const newHand = new Hand(req.body);
    console.log(newHand);
    const savedReview = await newHand.save();
    res.redirect('/');
  });


//app.use(cors());

app.use(cors({
    origin: ["https://deploy-mern-1whq.vercel.app"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
    })
);

app.post('/', async (req, res) => {
    try{
        if(!req.body.dealerHand){ 
            return res.status(400).send({
            message: 'Hand History Invalid',
        });
    }

    // const newHand = new Hand(req.body)
    // console.log("Inputted hand", newHand);
    // const savedHand = await newHand.save();
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
    .connect(mongoDBURL)
    .then(() =>{
    console.log('Connected to DB');
    app.listen(PORT, () =>{
        console.log(`App is listening to port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error);
});

export default app;
