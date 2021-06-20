import UserData from '../Data/UserData';

const KEYS = {
  employees: 'employees',
  employeeId: 'employeeId',
};

export const getDepartmentCollection = () => [
  { id: 1, title: 'Development' },
  { id: 2, title: 'Marketing' },
  { id: 3, title: 'Accounting' },
  { id: 4, title: 'HR' },
];

export const insertEmployees = (data) => {
  // let employees = getAllEmployees();
  data['id'] = generateEmployeeId();
  UserData.users.push(data);
  // localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};
export const updateEmployees = (data) => {
  let employees = getAllEmployees();
  let recordIndex = employees.findIndex((x) => x.id === data.id);
  employees[recordIndex] = { ...data };
  UserData.users = employees;
  // localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};
export const deleteEmployee = (id) => {
  let employees = getAllEmployees();
  employees = employees.filter((x) => x.id != id);
  UserData.users = employees;
  // localStorage.setItem(KEYS.employees, JSON.stringify(employees));
};

export const generateEmployeeId = () => {
  let id = UserData.users.length + 1;
  // if (localStorage.getItem(KEYS.employeeId) === null)
  //   localStorage.setItem(KEYS.employeeId, '0');
  // var id = parseInt(localStorage.getItem(KEYS.employeeId));
  // localStorage.setItem(KEYS.employeeId, (++id).toString());
  return id;
};

export const getAllEmployees = () => {
  let employees = UserData.users;
  let departments = getDepartmentCollection();
  return employees.map((x) => ({
    ...x,
    department: departments[x.departmentId - 1].title,
  }));
};
