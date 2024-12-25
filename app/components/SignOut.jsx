import React from 'react';
import { doSingOut } from '../actions';

const SignOut = () => {
    return (
        <form action={doSingOut}>
            <button type="submit">Sign Out</button>            
        </form>
    );
};

export default SignOut;