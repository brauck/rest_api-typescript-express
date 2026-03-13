import express from "express";
import notesRouter from "./routes/notes.routes";
import { errorHandler } from "./middleware/errorHandler";
import { logger } from "./middleware/logger";

const app = express();
app.use(express.json());

app.use("/api/notes", notesRouter);

app.use(logger);

// Должно быть последним
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
