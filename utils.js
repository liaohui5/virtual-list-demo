"use strict";

// 模拟的数据
export function getData(init, count) {
  const arr = [];
  for (let i = init; i <= count; i++) {
    arr.push(i);
  }
  return arr;
}

// 节流
export function throttle(callback, delay = 1000){
  let oldTime = Date.now();
  return function() {
    let newTime = Date.now();
    if (newTime - oldTime >= delay) {
      callback.apply(this, arguments);
      oldTime = newTime;
    }
  };
}

