const t1 = setTimeout(() => {
  console.log('t1');
}, 1000);
const t2 = setTimeout(() => {
  console.log('t2');
}, 2000);
t1.unref();
clearTimeout(t2);
