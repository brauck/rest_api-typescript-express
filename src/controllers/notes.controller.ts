import { Request, Response, NextFunction } from "express";
import { NotesService } from "../services/notes.service";

const service = new NotesService();

export const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await service.getAll();
    res.json(notes);
  } catch (err) {
    next(err);
  }
};

export const getNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await service.getById(Number(req.params.id));
    if (!note) return res.status(404).json({ error: "Not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const createNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, content, tags } = req.body;
    const note = await service.create(title, content, tags || []);
    res.status(201).json(note);
  } catch (err) {
    next(err);
  }
};

export const updateNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const note = await service.update(Number(req.params.id), req.body);
    if (!note) return res.status(404).json({ error: "Not found" });
    res.json(note);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ok = await service.delete(Number(req.params.id));
    if (!ok) return res.status(404).json({ error: "Not found" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
