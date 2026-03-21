// utils/db.ts
import Dexie, { type EntityTable } from "dexie";

export interface Song {
  id?: number;
  title: string;
  artist: string;
  playlistId: number; // 外键：关联到 Playlist 的 id
}
// 1. 定义歌单接口
export interface Playlist {
  id?: number;
  name: string; // 歌单名字
  description?: string; // 歌单描述
  createTime: number; // 创建时间
}
export const db = new Dexie("musicCache") as Dexie & {
  songs: EntityTable<Song, "id">;
};

db.version(1).stores({
  songs: "++id, title, artist",
});
export const addSong = async (song: Song) => {
  try {
    // .add() 会返回生成的新 ID
    const id = await db.songs.add(song);
    console.log(`添加成功，ID 为: ${id}`);
  } catch (error) {
    // 如果主键冲突（虽然使用了 ++id 很少见）或其他错误，会进入这里
    console.error("添加失败:", error);
  }
};
