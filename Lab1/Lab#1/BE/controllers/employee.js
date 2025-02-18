const employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const { id } = req.params;
  const employeeIndex = employee.findIndex(emp => emp.id === id);
  
  if (employeeIndex !== -1) {
    // Remove the employee from the array
    employee.splice(employeeIndex, 1);  //startindex and the no. of elements to remove starting the startindex
    res.status(200).json({ message: `Employee with ID ${id} deleted successfully.` });
  } else {
    res.status(404).json({ message: `Employee with ID ${id} not found.` });
  }
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  
  if (!id || !name) {
    return res.status(400).json({ message: 'Both ID and Name are required.' });
  }

  const existingEmployee = employee.find(emp => emp.id === id);
  if (existingEmployee) {
    return res.status(400).json({ message: `Employee with ID ${id} already exists.` });
  }

  const newEmployee = { id, name };
  employee.push(newEmployee);

  res.status(201).json({ message: 'Employee created successfully.', data: newEmployee });
};
