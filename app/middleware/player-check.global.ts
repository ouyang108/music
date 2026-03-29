// middleware/player-check.ts
export default defineNuxtRouteMiddleware((to, from) => {
  const { currentMusicId } = useMusicList();
  const id = to.params.id;

  if (
    to.path.includes("lyrics") &&
    String(currentMusicId.value) !== String(id)
  ) {
    // 跳转到播放页

    return navigateTo("/");
  }
});
