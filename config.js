"use strict";

// 每条 item 的高度
export const ITEM_HEIGHT = 100;

// 当前容器, 可见的总共多少个(容器高度/每个 item 高度)
export const ITEMS_COUNT = Math.ceil(document.querySelector("#scroll").offsetHeight / ITEM_HEIGHT) + 1;

