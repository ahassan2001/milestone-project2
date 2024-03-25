import { useState } from 'react';
import axios from 'axios';

function TaskCard(props) {
    const [mode, setMode] = useState("view")
    const [editedTask, setEditedTask] = useState({
        title: props.task.title,
        description: props.task.description,
        priority: props.task.priority,
        category: props.task.category || '',
        dueDate: props.task.dueDate || '',
    });

const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://milestone-project2.vercel.app/api/tasks/${props.task._id}`, editedTask)
        .then(res => {
            setMode("view");
        })
        .catch(err => {
            console.log(err);
        });
    };

    let editMode = (
        <div className="editForm">
            <input 
                type="text"
                value={editedTask.title}
                onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
            />
            <textarea 
                value={editedTask.description}
                onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
            ></textarea>
            <input
                type="number"
                value={editedTask.priority}
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
            />
            <br/>
            <br/>
            <input
                type="text"
                value={editedTask.category}
                onChange={(e) => setEditedTask({ ...editedTask, category: e.target.value })}
            />
            <input
                type="date"
                value={editedTask.dueDate}
                onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
            />
            <br/>
            <br/>
            <button onClick={() => setMode("view")} className="save-button">Save</button>
        </div>
    );

        let viewMode = (
            <div className="viewForm">
                <h3>{props.task.title}</h3>
                <p>{props.task.description}</p>
                <p>Priority: {props.task.priority}</p>
                {props.task.category && <p>Category: {props.task.category}</p>}
                {props.task.dueDate && <p>Due Date: {new Date(props.task.dueDate).toLocaleDateString()}</p>}
                <button onClick={() => setMode("edit")} className="edit-button">Edit</button>
                <button onClick={() => props.handleDelete(props.task._id)} className="delete-button">Delete</button>
            </div>
        )

        if (mode == "view") {
            return (
                <div>{viewMode}</div>
            );
        }else{
            return (
                <div>{editMode}</div>
            )
        }
        
}

export default TaskCard;