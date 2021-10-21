import React from "react";
import {useParams} from "react-router-dom";
import TodoForm from "./todoform";

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.name}</td>
            <td>{todo.user.first_name + ' ' + todo.user.last_name}</td>
            <td>{todo.project}</td>
            <td>{todo.created}</td>
            <td>{String(todo.is_active)}</td>
            <td>
                <button disabled={String(todo.is_active) === 'false'} onClick={() => deleteTodo(todo.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo, createTodo, users}) => {
    let {id} = useParams()
    let filtered_todos = todos.filter((todo) => todo.project === +id)
    return (
        <div>
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>User Name</th>
                    <th>Project</th>
                    <th>Created</th>
                    <th>Is Active</th>
                    <th> </th>
                </tr>
                </thead>
                <tbody>
                {filtered_todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
                </tbody>
            </table>
            <TodoForm createTodo={createTodo} project={id} users={users}/>
        </div>
    )
}


export default TodoList