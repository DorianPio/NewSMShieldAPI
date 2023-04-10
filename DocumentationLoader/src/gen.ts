export function generateRandomKey() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = "";
  for (let i = 0; i < 200; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}
