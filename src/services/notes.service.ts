import { db } from "../db";
import { Note } from "../models/Note";

export class NotesService {
  async getAll(): Promise<Note[]> {
    const result = await db.query("SELECT * FROM notes ORDER BY id ASC");
    return result.rows;
  }

  async getById(id: number): Promise<Note | undefined> {
    const result = await db.query("SELECT * FROM notes WHERE id = $1", [id]);
    return result.rows[0];
  }

  async create(title: string, content: string, tags: string[]): Promise<Note> {
    const result = await db.query(
      `INSERT INTO notes (title, content, tags)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, content, tags]
    );

    return result.rows[0];
  }

  async update(id: number, data: Partial<Note>): Promise<Note | undefined> {
    const existing = await this.getById(id);
    if (!existing) return undefined;

    const updated = {
      title: data.title ?? existing.title,
      content: data.content ?? existing.content,
      tags: data.tags ?? existing.tags
    };

    const result = await db.query(
      `UPDATE notes
       SET title = $1, content = $2, tags = $3
       WHERE id = $4
       RETURNING *`,
      [updated.title, updated.content, updated.tags, id]
    );

    return result.rows[0];
  }

  async delete(id: number): Promise<boolean> {
    const result = await db.query("DELETE FROM notes WHERE id = $1", [id]);

    if (result.rowCount === null) {
      return false; // или можно бросить ошибку
    }

    return result.rowCount > 0;
  }
}
