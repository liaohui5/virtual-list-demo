"use strict";

// 渲染所有item
export function render(currentData, paddings, listDOM) {
  const fragment = document.createDocumentFragment();
  currentData.forEach((item) => {
    const itemDom = document.createElement("div");
    itemDom.className = "item";
    itemDom.textContent = `item-${item}`;
    fragment.append(itemDom);
  });
  listDOM.append(fragment);
  updatePaddings(paddings, listDOM);
}

// 更新视图
export function update(currentData, listDOM) {
  Array.from(listDOM.children).forEach((item, index) => {
    updateItemView(item, currentData[index]);
  });
}

// 更新item中的数据
function updateItemView(itemDOM, dataItem) {
  itemDOM.textContent = `item-${dataItem}(updated)`;
}

// 更新 listWrapperDom paddings
export function updatePaddings(paddings, listDOM) {
  for (const [key, val] of Object.entries(paddings)) {
    listDOM.style[key] = val + "px";
  }
}
