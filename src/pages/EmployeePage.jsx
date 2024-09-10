import { useState } from "react";
import EmployeeLogin from '../components/EmployeeLogin';
import VotingScreen from '../components/VotingScreen';

const EmployeePage = () =>{
    const [employeeDoc, setEmployeeDoc] = useState(null);

    return(
        <div>
            {!employeeDoc ? (
                <EmployeeLogin onValidated={setEmployeeDoc} />
            ) : (
                <VotingScreen employeeDoc={employeeDoc} />
            )}
        </div>
    );
};

export default EmployeePage;