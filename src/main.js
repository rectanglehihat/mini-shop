// Fetch the items from the JSON file
function loadItems() {
  return fetch("data/data.json")
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayItems(items) {
  const container = document.querySelector(".items");
  // 배열 형태 변환하기 위해 map 사용
  // 문자열이 들어있는 배열을 하나의 문바열로 변환하기 위해 join 사용
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
      <img src="${item.image}" alt="${item.type}" class="item__thumbnail"></img>
      <div class="item__description">${item.gender}, ${item.size}</div>
    </li>
  `;
}

// Handle button click(방법1)
// 전체 리스트 업데이트(비효율적)
function onButtonClick(event, items) {
  // console.log(event.target.dataset.key);
  // console.log(event.target.dataset.value);
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if (key === null || value === null) {
    return;
  }

  const filtered = items.filter((item) => item[key] === value);
  // console.log(filtered);
  displayItems(filtered);
}
// (방법1)==========

// Handle button click(방법2)
// 기존것이 보이고 안보이게 바꾸기
// function onButtonClick(event, items) {
//   const target = event.target;
//   const key = target.dataset.key;
//   const value = target.dataset.value;
//   if (key === null || value === null) {
//     return;
//   }
//   updateItems(items, key, value);
// }

// // Make the items matching {key:value} invisible
// function updateItems(items, key, value) {
//   items.forEach((item) => {
//     if (item.dataset[key] === value) {
//       item.classList.remove("invisible");
//     } else {
//       item.classList.add("invisible");
//     }
//   });
// }
// // (방법2)==========

function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  // logo 클릭 시 모든 아이템들 보여주기
  logo.addEventListener("click", () => displayItems(items));
  // 해당 버튼별로 아이템 보여주기
  buttons.addEventListener("click", (event) => onButtonClick(event, items));
}

loadItems()
  .then((items) => {
    displayItems(items);
    setEventListeners(items);
  })
  .catch(console.log);
