const musicList = ref([]);
export const useMusicList = () => {
  const changeMusicList = (list: Song[]) => {
    musicList.value = list;
  };
};
