interface Music {
  name: string;
  description?: string;
}
const musicList = ref<any[]>([]);
const currentMusic = ref<Music>({
  name: "",
});
const music = ref("");
const activeIndex = ref(0);
export const useMusicList = () => {
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
  return {
    musicList,
    changeMusicList,
    currentMusic,
    changeCurrentMusic,
    changeActiveIndex,
    activeIndex,
    changeMusic,
    music,
  };
};
