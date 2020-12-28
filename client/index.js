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
    let tableHtml = "";
    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='5'>No Data there</td></tr>";
    };
};