export default defineEventHandler(async (event) => {
  const { cookie } = await readBody(event);
  setCookie(event, "moveit", JSON.stringify(cookie));
  return 200;
})