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
export const db = new Dexie("MusicAppDB") as Dexie & {
  playlists: EntityTable<Playlist, "id">;
  songs: EntityTable<Song, "id">;
};

db.version(1).stores({
  playlists: "++id, name", // 为歌单名建立索引，方便搜索
  songs: "++id, playlistId, title, artist", // 为 playlistId 建立索引，方便查询某个歌单下的所有歌
});
// 创建新歌单
export const createPlaylist = async (name: string) => {
  return await db.playlists.put({
    name,
    createTime: Date.now(),
  });
};
// 添加歌曲到歌单
export const addSongToPlaylist = async (
  playlistId: number,
  songData: Omit<Song, "id" | "playlistId">,
) => {
  return await db.songs.add({
    ...songData,
    playlistId, // 关键：指定所属歌单 ID
  });
};
