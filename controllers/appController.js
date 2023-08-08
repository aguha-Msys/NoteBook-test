const Note = require("../models/Note");
const genId = require("../middlewares/genId");

exports.getNotes = async (req, res, next) => {
  await Note.find().then((notes) => {
    //res.render("app/notes", { pageTitle: "Notes", notes });
    res.render("app/home", { pageTitle: "Home", notes });
  });
};

exports.getCreateNotes = (req, res, next) => {
  res.render("app/addNote", { pageTitle: "Add Note" });
};

exports.getSearch = async (req, res, next) => {
  const searchBox = req.query.searchBox;
  if (Number(searchBox)) {
    await Note.find({
      $or: [{ noteId: searchBox }],
    })
      .then((notes) => {
        console.log(notes);
        res.render("app/home", {
          notes: notes,
          pageTitle: "Notes",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  } else {
    const searchRegex = new RegExp(searchBox, "i"); // Create a case-insensitive regular expression
    await Note.find({
      $or: [
        { noteTitle: searchRegex },
        { noteSubTitle: searchRegex },
        { noteBody: searchRegex },
      ],
    })
      .then((note) => {
        //console.log(note);
        res.render("app/home", {
          notes: note,
          pageTitle: "Notes",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error.message });
      });
  }
};

exports.postCreateNotes = async (req, res, next) => {
  const { noteTitle, noteSubTitle, noteBody } = req.body;
  const iAt = Date.now();
  const noteId = await genId();
  try {
    const newNote = new Note({
      noteId,
      noteTitle,
      noteSubTitle,
      noteBody,
      iAt,
    });
    await newNote.save();
    await Note.find().then((note) => {
      //res.json({ note });
      res.redirect("/notes");
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getEditNotes = async (req, res, next) => {
  const noteId = req.params.noteId;
  console.log(noteId);
  try {
    await Note.findOne({ noteId }).then((note) => {
      res.render("app/updateNote", {
        pageTitle: "Edit",
        note,
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};
exports.postEditNotes = async (req, res, next) => {
  const noteId = req.params.noteId;
  //const { noteTitle, noteBody, noteSubTitle } = req.body;
  const fields = req.body;
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { noteId }, // Assuming noteId is the primary key (_id) of the Note model
      { $set: /*{ noteTitle, noteBody, noteSubTitle }*/ fields }, // Use fields directly instead of req.body
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found" });
    }
    res.redirect("/notes");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteNotes = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    const deleteNote = await Note.findOneAndDelete({ noteId });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

exports.searchByIdAndKeywords = (req, res, next) => {
  res.json({ note });
};

exports.getStarred = (req, res, next) => {
  Note.find({ starred: true })
    .then((notes) => {
      res.json(notes);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
};

exports.postStarSetTrue = (req, res, next) => {
  const noteId = req.body.params;
  document.getElementsByClassName(
    "btn btn-primary",
    onclick(() => {
      Note.findOneAndUpdate(
        { $or: noteId },
        { $set: { starred: "true" } }
      ).then(() => {
        res.redirect("/");
      });
    })
  );
};

// exports. = (req,res,next)=>{}
