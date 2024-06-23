import React from 'react';
import '../App.css';

function NavBar({ setPage }) {
    const pageSet = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="flex">
            <button className="text-xl" onClick={() => pageSet(1)}>home!</button>
            <div className="ml-10 text-xl">
                <button onClick={() => pageSet(2)}>board of affirmations</button>
            </div>
            <div>
                <div className="ml-10 text-xl">more to come... (not pressable haha)</div>
            </div>
        </div>
    );
}

export default NavBar;
