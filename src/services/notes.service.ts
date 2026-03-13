import { Note } from "../models/Note";
import * as fs from "fs";

const DB_PATH = "data/notes.json";

export class NotesService {
  private notes: Note[] = [];
  private nextId = 1;

  constructor() {
    this.load();
  }

  private load() {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, "utf-8");
      this.notes = JSON.parse(raw);
      this.nextId = Math.max(0, ...this.notes.map(n => n.id)) + 1;
    }
  }

  private save() {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.notes, null, 2));
  }

  getAll(): Note[] {
    return this.notes;
  }

  getById(id: number): Note | undefined {
    return this.notes.find(n => n.id === id);
  }

  create(title: string, content: string, tags: string[]): Note {
    const note: Note = {
      id: this.nextId++,
      title,
      content,
      createdAt: new Date().toISOString(),
      tags
    };

    this.notes.push(note);
    this.save();
    return note;
  }

  update(id: number, data: Partial<Note>): Note | undefined {
    const note = this.getById(id);
    if (!note) return undefined;

    Object.assign(note, data);
    this.save();
    return note;
  }

  delete(id: number): boolean {
    const index = this.notes.findIndex(n => n.id === id);
    if (index === -1) return false;

    this.notes.splice(index, 1);
    this.save();
    return true;
  }
}
