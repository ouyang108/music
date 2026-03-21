// utils/db.ts
import Dexie, { type EntityTable } from "dexie";

interface Song {
  id?: number;
  title: string;
  artist: string;
}

export const db = new Dexie("musicCache") as Dexie & {
  songs: EntityTable<Song, "id">;
};

db.version(1).stores({
  songs: "++id, title, artist",
});
