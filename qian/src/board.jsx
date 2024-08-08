import React, { useState } from 'react';

function Board() {
    const [todoItems, setTodoItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);

    const handleAddItem = () => {
        const newItem = prompt('Enter new task');
        if (newItem) {
            setTodoItems([...todoItems, newItem]);
        }
    };

    const handleMoveToInProgress = (index) => {
        const item = todoItems[index];
        setTodoItems(todoItems.filter((_, i) => i !== index));
        setInProgressItems([...inProgressItems, item]);
    };

    const handleMoveToDone = (index) => {
        const item = inProgressItems[index];
        setInProgressItems(inProgressItems.filter((_, i) => i !== index));
        setDoneItems([...doneItems, item]);
    };

    const handleDelete = (index) => {
        setDoneItems(doneItems.filter((_, i) => i !== index));
    };

    return (
        <div className="board">
            <div className="column">
                <h2>待办项目</h2>
                <button onClick={handleAddItem}>Add Item</button>
                {todoItems.map((item, index) => (
                    <div key={index}>
                        {item}
                        <button onClick={() => handleMoveToInProgress(index)}>Move to In Progress</button>
                    </div>
                ))}
            </div>
            <div className="column">
                <h2>进行中项目</h2>
                {inProgressItems.map((item, index) => (
                    <div key={index}>
                        {item}
                        <button onClick={() => handleMoveToDone(index)}>Move to Done</button>
                    </div>
                ))}
            </div>
            <div className="column">
                <h2>已完成项目</h2>
                {doneItems.map((item, index) => (
                    <div key={index}>
                        {item}
                        <button onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Board;
