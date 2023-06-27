export function getRandomData(count) {
    const now = Date.now();
    const data = [];
    const oneDay = 24 * 60 * 60 * 1000; // One day in milliseconds
    const twoMonthsAgo = now - 60 * oneDay; // Two months ago from now
    for (let i = count - 1; i >= 0; i--) {
      const currentDate = new Date(twoMonthsAgo + i * oneDay);
      const open = randomNumber(20000, 25000);
      const close = randomNumber(open * 0.95, open * 1.05);
      const high = randomNumber(Math.max(open, close), Math.max(open, close) * 1.1);
      const low = randomNumber(Math.min(open, close) * 0.9, Math.min(open, close));
      data.push([currentDate.getTime(), open, high, low, close]);
    }
    return data;
  }
  
  function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }
  