import { Router } from "express";
import {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote
} from "../controllers/notes.controller";

import { validate } from "../middleware/validate";
import { createNoteSchema, updateNoteSchema } from "../validation/note.schema";

const router = Router();

router.get("/", getAllNotes);
router.get("/:id", getNote);

router.post("/", validate(createNoteSchema), createNote);
router.put("/:id", validate(updateNoteSchema), updateNote);

router.delete("/:id", deleteNote);

export default router;
