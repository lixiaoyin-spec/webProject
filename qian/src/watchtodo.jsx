import React, { useState, useEffect } from 'react';
import * as axios from 'axios';
import './watchtodo.css';
import * as fs from 'fs';

const client = axios.default;

function Watch() {
    const [taskName, setTaskName] = useState('');
    const [descriptionOfTask, setDescriptionOfTask] = useState('');
    const [taskIndex, setTaskIndex] = useState(null);
    const [task, setTask] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        client.get('http://127.0.0.1:7001/store').then((response) => {
            setTaskIndex(response.data);
        });

        client.get('http://127.0.0.1:7001/todo').then((response) => {
            setTask(response.data);
            setTaskName(response.data[taskIndex]);
        });

        client.get('http://127.0.0.1:7001/descriptiontodo').then((response) => {
            setDescriptionOfTask(response.data[taskIndex]);
        });
    }, [taskIndex]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleFileUpload = () => {
        const formData = new FormData();
    formData.append('file', file);

    const reader = new FileReader();
    reader.onload = function(event) {
        const fileContent = event.target.result;
        client.post('http://127.0.0.1:7001/upload', {
            fileData: fileContent
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => {
            console.log('File uploaded successfully', response);
        }).catch(error => {
            console.error('Error uploading file', error);
        });
    };

    reader.readAsText(file);
    };

    const handleFileCheck = () => {
        client.get('http://127.0.0.1:7001/checkFile').then((response) => {
            let fileContent = response.data;
            alert(fileContent);
        })
    }

    return (
        <div className='totally'>
            <div className='left'>
                <h1>
                    任务名称: 
                    {taskName}
                </h1>
            </div>
            <div className='middle'>
                <h2>
                    任务描述:
                    {descriptionOfTask}
                </h2>
            </div>
            <div className='right'>
                <input type="file" onChange={handleFileChange} />
                <button className='border-4 border-black border-opacity-100' onClick={handleFileUpload}>上传文件</button>
                <button className='border-4 border-black border-opacity-100' onClick={handleFileCheck}>查看文件内容</button>
            </div>
        </div>
    );
}

export default Watch;