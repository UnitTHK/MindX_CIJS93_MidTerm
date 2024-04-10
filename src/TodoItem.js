import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ task, completeTask, deleteTask }) {
    return (
        <li style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <input type="checkbox" checked={task.completed} onChange={completeTask} />
            <span>{task.content}</span>
            <button onClick={deleteTask}>
                <FontAwesomeIcon icon={faTrash} />
            </button>
        </li>
    );
}

export default TodoItem;
