import React from 'react';
import './ListView.css';
import { MdDelete } from 'react-icons/md';
import NewTodo from '../../add-todo-component/NewTodo';

function ListView(props) {
    let listOfTodosJSX = [];
    props.listOfTodos.sort((a, b) => {
        return a.createdOn - b.createdOn;
    });
    props.listOfTodos.forEach(todo => {
        listOfTodosJSX.push(
            <div className='todo' key={todo.id}>
                <div className='content'>
                    <div>{todo.title}</div>
                    <div>{props.formatDate(new Date(todo.createdOn))}</div>
                </div>
                <div className='actions'><MdDelete className='delete-todo-icon' onClick={() => { deleteTodo(todo.id) }}></MdDelete></div>
            </div>
        )
    });

    const deleteTodo = (todoId) => {
        let updateTodos = [];
        props.listOfTodos.forEach(todo => {
            if (todo.id !== todoId) {
                updateTodos.push(todo);
            }
        });
        props.updateList(updateTodos);
    }

    return (
        <>
            <div className='list-header'>
                All My Todos
            </div>
            <div className='scroll-container'>
                <div className='list-todo-container'>
                    {props.showNewTodo && (<NewTodo listOfTodos={props.listOfTodos} updateList={props.updateList} hideNewTodo={props.hideNewTodo}></NewTodo>)}
                    {listOfTodosJSX}
                </div>
            </div>
        </>
    )
}

export default ListView;