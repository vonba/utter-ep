export default function getRandomInteger(min = 500, max = 5000) {
  const random = Math.random();
  const scaled = random * (max - min + 1) + min;
  const result = Math.floor(scaled);
  return result;
}
