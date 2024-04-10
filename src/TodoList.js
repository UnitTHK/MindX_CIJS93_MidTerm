import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ tasks, completeTask, deleteTask }) {
    return (
        <div>
            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <TodoItem
                        key={index}
                        task={task}
                        completeTask={() => completeTask(index)}
                        deleteTask={() => deleteTask(index)}
                    />
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
