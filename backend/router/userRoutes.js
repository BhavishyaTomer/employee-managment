import express from "express";
import { users } from "../models/userModel.js";
const router=express.Router();

router.get("/", async (req, res) => {
    const showAll = await users.find();

    try {
        res.status(200).json(showAll);
    } catch (error) {
        console.log("error is there", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
});

router.get("/:id", async (req, res) => {
const {id} = req.params
    try {
        const showAll = await users.findById({_id:id});
        res.status(200).json(showAll);
    } catch (error) {
        console.log("error is there", error);
        res.status(500).json({ error: "Internal server error" }); 
    }
});

router.delete("/:id", async (req, res) => {
    const {id} = req.params
        try {
            const showAll = await users.findByIdAndDelete({_id:id});
            res.status(200).json(showAll);
        } catch (error) {
            console.log("error is there", error);
            res.status(500).json({ error: "Internal server error" }); 
        }
    });

router.post("/", async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const userData = await users.create({
            name,
            email,
            age
        });
        res.status(201).json(userData);
    } catch (error) {
        console.log("data can't be sent because of", error);
        res.status(500).json({ error: req.body });
    }
});
router.patch("/:id",async (req,res)=>{
    const {id}=req.params
    const {name ,email,age}=req.params
    try {
        const updateUser=await users.findByIdAndUpdate(id,req.body,{
            new:true
        })
        res.status(200).json(updateUser)
    } catch (error) {
        console.log("error is here",error)
        res.status(404).json({error:error.message})
    }
})

export default router;