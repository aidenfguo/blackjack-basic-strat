import express from 'express';
import { Hand } from '../db.mjs';

const router = express.Router();

router.post('/', async(req, res)=>{

});

router.get('/', async(req, res)=>{
    // Hand.find().then((hand)=>{
    //     res.render("home", {Hands: hand});
    // })
});

router.get('/:id', async(req, res)=>{

});

router.put('/:id', async(req, res)=>{

});

router.delete('/:id', async(req, res)=>{

});

export default router;