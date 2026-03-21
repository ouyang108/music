import Dexie, { type EntityTable } from "dexie";
interface Music {
  id?: number;
  title: string;
  artist: string;
}
// 缓存数据
const cacheDB = new Dexie("musicCache");
