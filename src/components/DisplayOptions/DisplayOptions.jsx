import React, { useState, useEffect } from 'react';
import Dropdown from '../Dropdown/Dropdown';
import './DisplayOptions.css';

const DisplayOptions = ({ grouping, ordering, setGrouping, setOrdering }) => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className="dropdown__container">
            <button
                className="button"
                onClick={() => {
                    setDropdown(!dropdown);
                    console.log(dropdown);
                }}
            >
                <i className="fa-solid fa-list"></i>
                <div>Display</div>
            </button>
            {dropdown && (
                <div className="board__dropdown">
                    <div>
                        <div>Grouping</div>
                        <select value={grouping} onChange={(e) => setGrouping(e.target.value)}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div>
                        <div>Ordering</div>
                        <select value={ordering} onChange={(e) => setOrdering(e.target.value)}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>

            )}
        </div>
    )
}

export default DisplayOptions;