import { useState } from "react";
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

const AdminPage = () =>{
    const [isLoggedIn, setLoggedIn] = useState(false);

    return(
        <div>
            {!isLoggedIn ? (
                <AdminLogin onLogin={()=> setLoggedIn(true)} />
            ) : (
                <AdminPanel/>
            )}
        </div>
    );
};

export default AdminPage;

