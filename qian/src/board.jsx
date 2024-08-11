import React, { useState, useEffect} from 'react';
import * as axios from 'axios'
import './App.css'

const client = axios.default;

function Board() {
    const [todoItems, setTodoItems] = useState([]);
    const [inProgressItems, setInProgressItems] = useState([]);
    const [doneItems, setDoneItems] = useState([]);
    const [description, setDescription] = useState([]);

    useEffect(() => {
        let filedo = [];
    client.get("http://127.0.0.1:7001/todo").then((response) => {
        filedo = response.data;
        let filedo2 = filedo.filter(line => line.trim() !== '');
        setTodoItems([...filedo2]);
    })

    let filein = [];
    client.get("http://127.0.0.1:7001/inprogress").then((response) => {
        filein = response.data;
        let filein2 = filein.filter(line => line.trim() !== '');
        setInProgressItems([...filein2]);
    })

    let filedone = [];
    client.get("http://127.0.0.1:7001/done").then((response) => {
        filedone = response.data;
        let filedone2 = filedone.filter(line => line.trim() !== '');
        setDoneItems([...filedone2]);
    })

    let filedes = [];
    client.get("http://127.0.0.1:7001/description").then((response) => {

        filedes = response.data;
        let filedes2 = filedes.filter(line => line.trim() !== '');
        setDescription([...filedes2]);
    })
    }, []);

    const handleWatchDescription = (index) => {
        alert(description[index]);
    }
    

    const handleAddItem = () => {
        const newItem = prompt('Enter new task');
        const newDescription = prompt('Enter task description and comments');
       
        
        if (newItem && newDescription) {
            setTodoItems([...todoItems, newItem]);
            setDescription([...description, newDescription]);
            client.post("http://127.0.0.1:7001/todo", {
                newproject: newItem,
                description: newDescription
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
        client.post("http://127.0.0.1:7001/deletetodo", {
            newproject: item,
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

        client.post("http://127.0.0.1:7001/inprogress", {
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
        client.post("http://127.0.0.1:7001/deleteinprogress", {
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

        client.post("http://127.0.0.1:7001/done", {
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
        console.log(index);
        const item = doneItems[index];
        const deleteDescription = description[index];
        setDoneItems(doneItems.filter((_, i) => i !== index));
        client.post("http://127.0.0.1:7001/deletedone", {
            newproject: item,
            newdescription: deleteDescription
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
        <div>
            <div className="board">
        <div className="left-column">
            <h2>待办事项</h2>
            <button className="handsomebutton" onClick={handleAddItem}>Add Item</button>
            {todoItems.map((item, index) => (
                <div key={index}>
                    {item}
                    <button className='border-4 border-black border-opacity-100' onClick={() => handleMoveToInProgress(index)}>Move to In Progress</button>
                    <button className='border-4 border-blue-500 border-opacity-100' onClick={() => handleWatchDescription(index)}>Watch</button>
                </div>
            ))}
        </div>

        <div className="middle-column">
            <h2>进行中事项</h2>
            {inProgressItems.map((item, index) => (
                <div key={index}>
                    {item}
                    <button className='border-4 border-black border-opacity-100' onClick={() => handleMoveToDone(index)}>Move to Done</button>
                    <button className='border-4 border-blue-500 border-opacity-100' onClick={() => handleWatchDescription(index)}>Watch</button>
                </div>
            ))}
        </div>

        <div className="right-column">
            <h2>已完成事项</h2>
            {doneItems.map((item, index) => (
                <div key={index}>
                    {item}
                    <button className='border-4 border-black border-opacity-100' onClick={() => handleDelete(index)}>Delete</button>
                    <button className='border-4 border-blue-500 border-opacity-100' onClick={() => handleWatchDescription(index)}>Watch</button>
                </div>
            ))}
        </div>
    </div>
        </div>
    
    );
}

export default Board;
