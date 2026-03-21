interface Music {
  name: string;
  description?: string;
}
const musicList = ref<any[]>([]);
const currentMusic = ref<Music>({
  name: "",
});
export const useMusicList = () => {
  const changeMusicList = (list: any) => {
    musicList.value = list;
  };
  const changeCurrentMusic = (music: Music) => {
    currentMusic.value = music;
  };
  return {
    musicList,
    changeMusicList,
    currentMusic,
    changeCurrentMusic,
  };
};
