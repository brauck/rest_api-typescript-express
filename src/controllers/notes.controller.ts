import { Request, Response } from "express";
import { NotesService } from "../services/notes.service";

const service = new NotesService();

export const getAllNotes = (req: Request, res: Response) => {
  res.json(service.getAll());
};

export const getNote = (req: Request, res: Response) => {
  const note = service.getById(Number(req.params.id));
  if (!note) return res.status(404).json({ error: "Not found" });
  res.json(note);
};

export const createNote = (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  const note = service.create(title, content, tags || []);
  res.status(201).json(note);
};

export const updateNote = (req: Request, res: Response) => {
  const note = service.update(Number(req.params.id), req.body);
  if (!note) return res.status(404).json({ error: "Not found" });
  res.json(note);
};

export const deleteNote = (req: Request, res: Response) => {
  const ok = service.delete(Number(req.params.id));
  if (!ok) return res.status(404).json({ error: "Not found" });
  res.json({ success: true });
};
