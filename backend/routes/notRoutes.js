const router = require("express").Router();

const Note = require("../models/Note");

const auth = require("../middleware/authMiddleware");

router.post("/", auth, async (req, res) => {

  try {

    const note = await Note.create({
      ...req.body,
      owner: req.user.id,
    });

    res.json(note);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});

router.get("/", auth, async (req, res) => {

  try {

    const {
      search = "",
      page = 1,
      limit = 5,
      tag,
    } = req.query;

    let query = {
      owner: req.user.id,
    };

    if (search) {

      query.$or = [
        {
          title: {
            $regex: search,
            $options: "i",
          },
        },
        {
          content: {
            $regex: search,
            $options: "i",
          },
        },
      ];

    }

    if (tag) {
      query.tags = tag;
    }

    const notes = await Note.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Note.countDocuments(query);

    res.json({
      data: notes,
      page,
      total,
      pages: Math.ceil(total / limit),
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});

router.put("/:id", auth, async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (note.owner.toString() !== req.user.id) {

      return res.status(403).json({
        msg: "Not Allowed"
      });

    }

    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedNote);

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});

router.delete("/:id", auth, async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (
      note.owner.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {

      return res.status(403).json({
        msg: "Not Allowed"
      });

    }

    await Note.findByIdAndDelete(req.params.id);

    res.json({
      msg: "Note Deleted"
    });

  } catch (err) {

    res.status(500).json({
      msg: err.message
    });

  }

});

module.exports = router;