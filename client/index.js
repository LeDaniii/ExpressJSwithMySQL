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
        tableHtml += `<td>${date_added}</td>`;
        tableHtml += `<td class="delete-row-btn"id="${id}"><button>Delete</button></td>`;
        tableHtml += `<td class="edit-row-btn"id="${id}"><button>Edit</button></td>`;
        tableHtml += "</tr>"
    });
    table.innerHTML = tableHtml;
};