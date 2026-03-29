interface Music {
  name: string;
  description?: string;
}

export const useMusicList = () => {
  const musicList = useState<any[]>("musicList", () => []);
  const currentMusic = useState<Music>("currentMusic", () => ({
    name: "",
  }));
  const music = useState<string>("music", () => "");
  // 左侧分类索引列表
  const activeIndex = useState<number>("activeIndex", () => 0);
  // 当前正在播放的歌曲索引列表
  const currentIndexMusic = useState<number>("currentIndexMusic", () => 0);
  // 专辑信息
  const album = useState<any>("album", () => ({
    name: "",
  }));
  // 音乐id
  const currentMusicId = useState<string>("currentMusicId", () => "");
  const changeMusicList = (list: any) => {
    musicList.value = list;
  };
  const changeCurrentMusic = (music: Music) => {
    currentMusic.value = music;
  };
  const changeActiveIndex = (index: number) => {
    activeIndex.value = index;
  };
  const changeMusic = (url: string) => {
    music.value = url;
  };
  const changeAlbum = (albumParmas: any) => {
    album.value = albumParmas;
  };
  const changeCurrentMusicIndex = (index: number) => {
    currentIndexMusic.value = index;
  };
  const searchQuery = useState<string>("searchQuery", () => "");
  const changeSearchQuery = (query: string) => {
    searchQuery.value = query;
  };
  const changeCurrentMusicId = (id: string) => {
    currentMusicId.value = id;
  };
  // 全局播放时间状态
  const currentTime = useState<number>("currentTime", () => 0);
  const duration = useState<number>("duration", () => 0);
  const changeCurrentTime = (time: number) => {
    currentTime.value = time;
  };
  const changeDuration = (time: number) => {
    duration.value = time;
  };
  // 跳转时间（用于歌词点击跳转）
  const seekTime = useState<number | null>("seekTime", () => null);
  const changeSeekTime = (time: number | null) => {
    seekTime.value = time;
  };

  return {
    musicList,
    changeMusicList,
    currentMusic,
    changeCurrentMusic,
    changeActiveIndex,
    activeIndex,
    changeMusic,
    music,
    currentIndexMusic,
    changeCurrentMusicIndex,
    searchQuery,
    changeSearchQuery,
    changeAlbum,
    album,
    currentMusicId,
    changeCurrentMusicId,
    currentTime,
    duration,
    changeCurrentTime,
    changeDuration,
    seekTime,
    changeSeekTime,
  };
};
