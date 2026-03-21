interface Music {
  name: string;
  description?: string;
}
const musicList = ref([]);
const currentMusic = ref<Music>({
  name: "",
});
export const useMusicList = () => {
  const changeMusicList = (list: any) => {
    musicList.value = list;
  };
  return {
    musicList,
    changeMusicList,
  };
};
