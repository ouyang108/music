const musicList = ref([]);
export const useMusicList = () => {
  const changeMusicList = (list) => {
    musicList.value = list;
  };
  return {
    musicList,
    changeMusicList,
  };
};
