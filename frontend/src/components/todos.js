import React from "react";
import { useParams } from "react-router-dom";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.name}</td>
            <td>{todo.user}</td>
            <td>{todo.project}</td>
            <td>{todo.created}</td>
            <td>{String(todo.is_active)}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    let { id } = useParams()
    let filtered_todos = todos.filter((todo) => todo.project === +id)
    console.log(filtered_todos)
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Name</th>
                <th>User Name</th>
                <th>Project</th>
                <th>Created</th>
                <th>Is Active</th>
            </tr>
            </thead>
            <tbody>
            {filtered_todos.map((todo) => <TodoItem todo={todo}/>)}
            </tbody>
        </table>
    )
}


export default TodoList