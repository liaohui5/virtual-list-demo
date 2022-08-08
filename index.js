"use strict";

import { reactive, setCurrentData, setDataSource } from "./reactive";
import { render } from "./render";
import { ITEM_HEIGHT } from "./config";
import { throttle } from "./utils.js"

// 虚拟列表 .container #scoll-wrapper list-wrappper
const scrollDOM = document.querySelector("#scroll");
const listDOM = scrollDOM.querySelector(".list-box");
const $state = reactive(listDOM);

// 初始化
function init() {
  initData(1, 20);
  render($state.currentData, $state.paddings, listDOM);
  bindEvents();
}

// 初始化数据
function initData(init, count) {
  setDataSource(init, count);
  setCurrentData();
}

// 绑定事件
function bindEvents() {
  scrollDOM.addEventListener("scroll", throttle(handleScroll, 200));
}

// 处理滚动
function handleScroll() {
  // scrollTop: 已经滚动的高度 / 每个 item 高度(100), 向下取整
  // 如果滚动超过 100, 那说明第一个 item 已经被滚动出去了
  $state.startIndex = Math.floor(this.scrollTop / ITEM_HEIGHT);
  console.info("startIndex:", $state.startIndex);
}

init();
