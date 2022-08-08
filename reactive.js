"use strict";

import { getData } from "./utils";
import { ITEM_HEIGHT, ITEMS_COUNT } from "./config.js";
import { update, updatePaddings } from "./render";

// 响应式的数据
const $state = {};

// 原始数据
const data = {
  dataSource: [], // 数据源
  currentData: [], // 当前展示的数据
  startIndex: 0,
  endIndex: 0,
  paddings: {
    paddingTop: 0,
    paddingBottom: 0,
  },
};

// 定义响应式数据
export function reactive(listDOM) {
  Object.defineProperties($state, {
    dataSource: {
      get() {
        return data.dataSource;
      },
      set(newValue) {
        // 总数据源变化了, 重新设置 currentData
        data.dataSource = newValue;
        setCurrentData(true);
      },
    },
    currentData: {
      get() {
        return data.currentData;
      },
      set(newValue) {
        // 显示的数据变化了, 更新视图
        data.currentData = newValue;
        update(newValue, listDOM);
      },
    },
    startIndex: {
      get() {
        return data.startIndex;
      },
      set(newValue) {
        // 原来的值和新的值一样, 就不需要更新了
        if ($state.startIndex === newValue) {
          return;
        }
        // startIndex 变化, endIndex 也需要改变
        // 当前显示的数据 currentData 也需要更新
        // 然后给 listDOM 设置上下 padding
        // 如果 endIndex 大于等于 dataSource.length
        // 证明滑到了最底部, 需要加载更多的数据了
        data.startIndex = newValue;
        setCurrentData();
        if ($state.endIndex >= $state.dataSource.length - 1) {
          const len = $state.dataSource.length;
          setDataSource(len + 1, len * 2);
        }
        setPaddings();
      },
    },
    endIndex: {
      get: getEndIndex,
    },
    paddings: {
      get() {
        return data.paddings;
      },
      set(newValue) {
        // 更新 listDOM 的上下 padding 值
        data.paddings = newValue;
        updatePaddings($state.paddings, listDOM);
      },
    },
  });
  return $state;
}

// 获取endIndex, 开始索引到每页多少个*2的位置(显示2页)
// 如果超出了数据数组的总长度, 就使用数据的长度-1
function getEndIndex() {
  const endIndex = $state.startIndex + ITEMS_COUNT * 2;
  return $state.dataSource[endIndex] ? endIndex : $state.dataSource.length - 1;
}

// 所有数据源
export function setDataSource(init, count) {
  $state.dataSource = [...$state.dataSource, ...getData(init, count)];
}

// 当前显示的数据
export function setCurrentData() {
  const { dataSource, endIndex } = $state;
  const index = resetStartIndex();
  $state.currentData = dataSource.slice(index, endIndex);
}

// 设置 listDOM 的 paddings
// 上边距: startIndex * 每个item的高度(滚动出去多少个item就设置多少个item的高度)
// 下边距: 总数据的长度 - 当前屏幕可见个数 * 每个item的高度
export function setPaddings() {
  const { endIndex, dataSource } = $state;
  const index = resetStartIndex();
  $state.paddings = {
    paddingTop: index * ITEM_HEIGHT,
    paddingBottom: (dataSource.length - endIndex) * ITEM_HEIGHT,
  };
}

// 设置 startIndex
export function resetStartIndex() {
  return $state.startIndex <= ITEMS_COUNT ? 0 : $state.startIndex - ITEMS_COUNT;
}
