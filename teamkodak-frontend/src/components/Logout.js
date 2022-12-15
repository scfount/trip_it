import React from "react";
import Button from 'react-bootstrap/Button';
import { googleLogout } from '@react-oauth/google';
import { Link } from "react-router-dom";

function Logout({ setUser }) {

    const onSuccess = () => {
        googleLogout();  // helper for logging out
        setUser(null);
        localStorage.setItem("login", null);  // clearing local storage
        console.log('Logout Successful');
    };

    return (
        <div>
            <Link to = "/" className = "text-decoration-none text-reset">
                <Button
                    variant='outline-danger'
                    onClick={onSuccess}>
                    Logout
                </Button>
            </Link>
        </div>
    );
}

export default Logout;