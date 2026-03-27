import LRUCache from "~/utils/LRU";
import { getMusicUrl, getMusicMessage } from "~/utils/index";

// 全局共享的 LRU 缓存实例
const cache = new LRUCache(50);

export const useMusicCache = () => {
  const appConfig = useAppConfig();
  const { baseURL } = appConfig;

  /**
   * 获取音乐 URL，优先从缓存读取
   */
  const getMusicUrlWithCache = async (
    songId: number,
  ): Promise<{ url: string; album: any }> => {
    const cacheUrl = cache.get(songId);
    if (cacheUrl) {
      return cacheUrl;
    }

    // 调用接口获取音乐 URL
    // const url = await getMusicUrl(baseURL, songId);
    // cache.set(songId, url);
    // return url;
    try {
      const [url, albumInfo] = await Promise.all([
        getMusicUrl(baseURL, songId),
        getMusicMessage(baseURL, songId),
      ]);

      const fullData = { url, album: albumInfo };

      // 3. 存入缓存并返回
      cache.set(songId, fullData);
      return fullData;
    } catch (error) {
      console.error("获取歌曲信息失败:", error);
      throw error;
    }
  };

  return {
    getMusicUrlWithCache,
    cache, // 暴露缓存实例，以便需要时直接操作
  };
};
