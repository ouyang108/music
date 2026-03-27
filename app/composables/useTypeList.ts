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
  };
};
