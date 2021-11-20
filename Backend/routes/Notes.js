const express=require('express');
const router=express.Router();
const fetchUser=require("../middleware/fetchUser");
const Notes=require('../model/Notes');
const { body, validationResult } = require('express-validator');

//Route 1: get all the notes
router.get('/fetchallnotes',fetchUser,async (req, res)=>{
    const notes=await Notes.find({user:req.user.id})
    res.json(notes)
})


//Route 2: For Posting  the notes using POST login required 
router.post('/addnote',fetchUser,[
   
    body('title','enter a valid title').isLength({ min: 3 }),
    body('description','description must be of atleast 6 characters').isLength({ min: 5 })

],async (req, res)=>{
    try {
        
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {title, description,tag}=req.body;
    const note=new Notes({
        title, description, tag, user:req.user.id
    })
    const savednote=await note.save()
    
    res.json(savednote)
} catch (error) {
    console.error(error.message);
        res.status(401).send("some internal error");
}
})

// Route 3: Update an existing note using put:"/api/notes/updatenote", login required
router.put('/updatenote/:id',fetchUser,async (req, res)=>{
    try {
    const {title, description,tag}=req.body;
    const Newnote={};
    if(title){
        Newnote.title=title
    }
    if(description){
        Newnote.description=description
    }
    if(tag){
        Newnote.tag=tag
    }
    // Find the note to be updated
    let note=await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    note =await Notes.findByIdAndUpdate(req.params.id, {$set:Newnote},{new:true})
    res.json(note)
} catch (error) {
    console.error(error.message);
        res.status(401).send("some internal error");
}
})


// Route 4: Delete an existing note using delete:"/api/notes/deletenote", login required
router.delete('/deletenote/:id',fetchUser,async (req, res)=>{
    try {
    const {title, description,tag}=req.body;
    
    // Find the note to be deleted
    let note=await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Not Found");
    }
    //Allow deletion only if user owns this note
    if(note.user.toString()!==req.user.id){
        return res.status(401).send("Not allowed");
    }
    note =await Notes.findByIdAndDelete(req.params.id)
    res.json({"success":"Note has been deleted"})
} catch (error) {
    console.error(error.message);
        res.status(401).send("some internal error");
}
})


module.exports=router