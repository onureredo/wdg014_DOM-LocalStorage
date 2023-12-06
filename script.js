const itemInput = document.getElementById('itemInput');
const addItemBtn = document.getElementById('addItem');
const myList = document.getElementById('myList');

function saveList() {
  const items = [];
  // check "value" in LocalStorage ==> X
  // myList.querySelectorAll('li').forEach((li) => items.push(li.textContent));

  // Lösung ==> first child
  myList.querySelectorAll('li').forEach((li) => {
    const itemText = li.firstChild.textContent;
    items.push(itemText);
  });

  if (items.length === 0) {
    localStorage.removeItem('Shopping List');
  } else {
    localStorage.setItem('Shopping List', JSON.stringify(items));
  }
}

function loadList() {
  const items = JSON.parse(localStorage.getItem('Shopping List'));
  if (items) {
    items.forEach((itemText) => {
      const li = document.createElement('li');
      li.textContent = itemText;

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.addEventListener('click', function () {
        li.remove();
        saveList();
      });

      li.appendChild(deleteBtn);
      myList.appendChild(li);
    });
  }
}

loadList();

addItemBtn.addEventListener('click', function () {
  // den Wert aus dem Eingabefeld holen
  const itemText = itemInput.value;

  // Überprüfen ob der Text nicht leer ist
  if (itemText) {
    //ein neues Listenelement mit button erstellen und zur Liste hinzufügen
    const li = document.createElement('li');
    li.textContent = itemText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', function () {
      li.remove();
      saveList();
    });

    myList.appendChild(li);
    li.appendChild(deleteBtn);

    //Eingabefeld leeren
    itemInput.value = '';
    saveList();
  } else {
    alert('cant be empty');
  }
});

// Toggle mark as done ==> klicke listitem in ul
myList.addEventListener('click', function (event) {
  event.target.style.textDecoration =
    event.target.style.textDecoration === 'line-through' ? '' : 'line-through';
});
