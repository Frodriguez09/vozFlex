// src/components/EmployeeList.jsx
import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const employeesCollection = collection(db, 'employees');
      const employeeSnapshot = await getDocs(employeesCollection);
      const employeeList = employeeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEmployees(employeeList);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2>Lista de Empleados</h2>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} (ID: {employee.employeeId}) - {employee.hasVoted ? 'Ya votó' : 'No ha votado'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
