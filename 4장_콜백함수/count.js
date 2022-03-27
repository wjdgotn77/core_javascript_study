let count = 0;

const cb = () => {
  console.log(count);
  count++;
  if (count > 4) clearInterval(timerHoF);
};

const timerHoF = setInterval(cb, 300);