import React, { useState, useEffect} from 'react';
import * as axios from 'axios'
import './board.css'

const client = axios.default;

function Board() {
    const [todoItems, setTodoItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);

    const handleAddItem = () => {
        const newItem = prompt('Enter new task');
       
        
        if (newItem) {
            setTodoItems([...todoItems, newItem]);
            client.post("http://127.0.0.1/todo", {
                newproject: newItem
            },  {
                headers: {
                    'Content-Type': 'application/json'
                }
              }
            ).then((response) => {
                if(response){
                    alert('Add successful!');
                } else {
                    alert('Add failed');
                }
            })
        }
        
    };

    const handleMoveToInProgress = (index) => {
        const item = todoItems[index];
        setTodoItems(todoItems.filter((_, i) => i !== index));
        setInProgressItems([...inProgressItems, item]);
        client.post("http://127.0.0.1/deletetodo", {
            newproject: item
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response){
            alert('Move successful!');
        } else {
            console.log('Move failed');
        }
    })

        client.post("http://127.0.0.1/inprogress", {
            newproject: item
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response){
            alert('successful!');
        } else {
            alert('failed');
        }
    })
    };

    const handleMoveToDone = (index) => {
        const item = inProgressItems[index];
        setInProgressItems(inProgressItems.filter((_, i) => i !== index));
        setDoneItems([...doneItems, item]);
        client.post("http://127.0.0.1/deleteinprogress", {
            newproject: item
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response){
            alert('Move successful!');
        } else {
            console.log('Move failed');
        }
    })

        client.post("http://127.0.0.1/done", {
            newproject: item
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response){
            alert('successful!');
        } else {
            alert('failed');
        }
    })
    };

    const handleDelete = (index) => {
        const item = doneItems[index];
        setDoneItems(doneItems.filter((_, i) => i !== index));
        client.post("http://127.0.0.1/deletedone", {
            newproject: item
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then((response) => {
        if(response){
            alert('Delete successful!');
        } else {
            console.log('Delete failed');
        }
    })
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
