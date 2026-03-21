const musicList = ref([]);
export const useMusicList = () => {
  const changeMusicList = (list: any) => {
    musicList.value = list;
  };
  return {
    musicList,
    changeMusicList,
  };
};
