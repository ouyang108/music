export const formatDuration = (ms: number) => {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};
export const getMusicUrl = async (baseURL: string, id: string | number) => {
  const res: any = await $fetch(
    "/api/detail",
    { params: { id, level: "exhigh" } },
    // "song/url/v1?id=" + id + "&level=exhigh",
  ).catch(() => {
    console.log("获取歌曲url失败");
  });
  // console.log(res.data[0], "res");
  return res.data[0].url;
};
