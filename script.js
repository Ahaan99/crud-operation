document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('form').addEventListener('submit', onFormSubmit);
});

function onFormSubmit(event) {
    event.preventDefault();
    
    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const age = document.getElementById('age').value;
    const grade = document.getElementById('grade').value;
    
    if (studentId && studentName && age && grade) {
        const table = document.getElementById('studentList').getElementsByTagName('tbody')[0];
        
        // Remove the empty message row if it exists
        const emptyMessage = document.getElementById('emptyMessage');
        if (emptyMessage) {
            table.removeChild(emptyMessage);
        }

        const newRow = table.insertRow(table.length);
        
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);
        const cell3 = newRow.insertCell(2);
        const cell4 = newRow.insertCell(3);
        const cell5 = newRow.insertCell(4); // For action buttons
        
        cell1.innerHTML = studentId;
        cell2.innerHTML = studentName;
        cell3.innerHTML = age;
        cell4.innerHTML = grade;

        // Add action buttons
        cell5.innerHTML = `
            <button onclick="onEdit(this)">Edit</button>
            <button onclick="onDelete(this)">Delete</button>
        `;

        // Reset the form
        document.querySelector('form').reset();
    }
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById('studentId').value = selectedRow.cells[0].innerHTML;
    document.getElementById('studentName').value = selectedRow.cells[1].innerHTML;
    document.getElementById('age').value = selectedRow.cells[2].innerHTML;
    document.getElementById('grade').value = selectedRow.cells[3].innerHTML;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        const row = td.parentElement.parentElement;
        document.getElementById('studentList').deleteRow(row.rowIndex);
        // Show empty message if no data
        if (document.getElementById('studentList').rows.length === 1) {
            const table = document.getElementById('studentList').getElementsByTagName('tbody')[0];
            const emptyRow = table.insertRow(0);
            emptyRow.id = 'emptyMessage';
            const cell = emptyRow.insertCell(0);
            cell.colSpan = 4;
            cell.innerHTML = 'No student records added yet';
        }
    }
}

function updateRecord() {
    selectedRow.cells[0].innerHTML = document.getElementById('studentId').value;
    selectedRow.cells[1].innerHTML = document.getElementById('studentName').value;
    selectedRow.cells[2].innerHTML = document.getElementById('age').value;
    selectedRow.cells[3].innerHTML = document.getElementById('grade').value;
    document.querySelector('form').reset();
    selectedRow = null;
}

let selectedRow = null;
