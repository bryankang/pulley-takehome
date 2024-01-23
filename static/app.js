const Controller = {
  page: 1,

  search: (ev) => {
    ev.preventDefault();
    Controller.query(true);
  },

  loadMore: (ev) => {
    ev.preventDefault();
    Controller.query(false);
  },

  updateTable: (results, reset) => {
    const table = document.getElementById("table-body");
    const tableRows = document.createDocumentFragment();
    for (let result of results) {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
      td.innerText = result;
      tr.appendChild(td);
      tableRows.appendChild(tr);
    }

    if (reset) {
      table.innerHTML = "";
    }

    table.append(tableRows);
  },

  query: (reset) => {
    if (reset) {
      Controller.page = 1;
    }
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(
      `/search?q=${data.query}&page=${Controller.page}`
    ).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results, reset);
        Controller.page++;
      });
    });
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);

const loadMore = document.getElementById("load-more");
loadMore.addEventListener("click", Controller.loadMore);
