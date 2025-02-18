function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable')
      tableBody.innerHTML = ''
      const list = data.data.sort((a,b) => a.id - b.id) // sort according to ID
      list.forEach(item => {
        const row = document.createElement('tr')
        const idCell = document.createElement('td')
        idCell.textContent = item.id
        row.appendChild(idCell)

        const nameCell = document.createElement('td')
        nameCell.textContent = item.name
        row.appendChild(nameCell)

        const deleteCell = document.createElement('td')
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');

        deleteButton.addEventListener('click', () => {
          deleteEmployee(item.id);  // Pass the id of the employee to be deleted
        });

        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell)

        tableBody.appendChild(row)
      })
    })
    .catch(error => console.error(error))
}

function createEmployee() {
  const name = document.getElementById('name').value.trim();
  const id = document.getElementById('id').value.trim();

  if (!name || !id) {
    alert("Please fill in all fields.");
    return;
  }

  fetch('http://localhost:3000/api/v1/employee', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, name }),
  })
    .then(response => response.json())
    .then(data => {
      if (!data.message.includes("successfully")) throw new Error(data.message);
      alert('Employee created successfully');
      fetchEmployees(); // Refresh the list
    })
    .catch(error => alert(`Error: ${error.message}`));
}

function deleteEmployee(id) {
  if (!confirm(`Are you sure you want to delete employee ID ${id}?`)) return;

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {
    method: 'DELETE',
  })
    .then(response => response.json())
    .then(data => {
      if (!data.message.includes("successfully")) throw new Error(data.message);
      alert('Employee deleted successfully');
      fetchEmployees(); // Refresh the list
    })
    .catch(error => alert(`Error: ${error.message}`));
}

document.getElementById('employeeForm').addEventListener('submit', (e) => {
  e.preventDefault();
  createEmployee();
});

fetchEmployees();
