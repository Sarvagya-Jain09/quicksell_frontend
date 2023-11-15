import React, { useState, useEffect } from 'react';
import './DisplayOptions.css';

const DisplayOptions = ({ grouping, ordering, setGrouping, setOrdering }) => {
    const [dropdown, setDropdown] = useState(false);

    // const resetData = () => {
    //     localStorage.removeItem("kanban-board-status");
    //     localStorage.removeItem("kanban-board-priority");
    //     localStorage.removeItem("kanban-board-user");
    //     localStorage.removeItem("grouping");
    //     localStorage.removeItem("ordering");
    //     localStorage.removeItem("theme");

    //     window.location.reload();
    // }

    return (
        <div className="dropdown__container">
            <button
                className="button"
                onClick={() => {
                    setDropdown(!dropdown);
                }}
            >
                <i className="fa-solid fa-list"></i>
                <div>Display</div>
                {/* <i className="fa-thin fa-list-dropdown"></i> */}
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
                    <div>
                        {/* <button onClick={resetData} className="btnReset" style={{ margin: "auto", marginTop: "5px" }}>
                            <i className="fa-solid fa-clock-rotate-left"></i>
                            <div>Reset</div>
                        </button> */}
                    </div>
                </div>

            )}
        </div>
    )
}

export default DisplayOptions;