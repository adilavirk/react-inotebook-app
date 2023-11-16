// to import express
const express = require("express");
const router = express.Router();
const {body, validationResult} = require("express-validator");
const Note = require("../models/Note");
const fetchuser = require("../middleware/fetchuser");
// import Note Model

//Route:1 Get All the Note using:GET /api/notes/getuser . Login required
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({user: req.user.id});
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error occured");
  }
});
// to add notes
//Route:2 Add a Note using:POST /api/notes/addnote . Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({min: 3}),
    body("description", "description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const {title, description, tag} = req.body;
      // if there are errors return the Bad request and the Errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }
      // to save new Note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);
//Route:3 Update an existing Note using:PUT /api/notes/updatenote . Login required
router.put(
  "/updatenote/:id",
  fetchuser,
  async (req, res) => {
    // destructuring ki help sa title,description,tag req.body sa la kr aenga!!
    const{title,description,tag} = req.body;
    try {
    // create a newNote object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    // find the note to be updated and update it!

    let note =await Note.findById(req.params.id);
    // if note not exist then:
    if(!note){return res.status(404).send("Note Found")}
    if(note.user.toString() !== req.user.id){
      // 401 means unnotesorized user
      return res.status(401).send("Not Allowed")
    }
// if note exists then:
     note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true})
     res.json({note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });
//Route:4 Delete an existing Note using:DELETE /api/notes/deletenote . Login required
router.delete(
  "/deletenote/:id",
  fetchuser,
  async (req, res) => {
    // destructuring ki help sa title,description,tag req.body sa la kr aenga!!
    try {
    // find the note to be deleted and delete it!

    let note =await Note.findById(req.params.id);
    // if note not exist then:
    if(!note){return res.status(404).send("Note Found")}
    if(note.user.toString() !== req.user.id){
      // 401 means unnotesorized user
      // Allow deletion only if user own this Note
      return res.status(401).send("Not Allowed")
    }
// if note exists then:
     note = await Note.findByIdAndDelete(req.params.id)
     res.json({"Success":"Note has been deleted",note:note});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });

module.exports = router;
