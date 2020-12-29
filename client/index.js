document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
    loadHTMLTable([]);
});

const addBtn = document.querySelector('#add-name-btn');
addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : name })
    })
        .then(res => response.json())
        .then(data => insertRowIntoTable(data['data']));
};

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key].toLocaleString());
            }
            tableHtml += `<td>${data[key]}</td>`
        }
    }
    tableHtml += `<td class="delete-row-btn"id="${data.id}"><button>Delete</button></td>`;
    tableHtml += `<td class="edit-row-btn"id="${data.id}"><button>Edit</button></td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
    }
}


function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    console.log(data);
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data there</td></tr>";
        return;
    };
    let tableHtml = "";
    data.forEach(function ({ id, name, date_added }) {
        tableHtml += "<tr>";
        tableHtml += `<td>${id}</td>`;
        tableHtml += `<td>${name}</td>`;
        tableHtml += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHtml += `<td class="delete-row-btn"id="${id}"><button>Delete</button></td>`;
        tableHtml += `<td class="edit-row-btn"id="${id}"><button>Edit</button></td>`;
        tableHtml += "</tr>"
    });
    table.innerHTML = tableHtml;
};