const express = require('express')
const { createNote, getNote, deleteNote, updateNote } = require('../controllers/noteController')
const noteRoute = express.Router()
const auth = require("../middlewares/auth")

noteRoute.get("/",auth, getNote)

noteRoute.post("/",auth, createNote)

noteRoute.delete("/:id",auth,deleteNote)

noteRoute.put("/:id",auth,updateNote)

module.exports = noteRoute