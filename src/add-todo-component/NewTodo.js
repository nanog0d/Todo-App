import React, { useState } from 'react';
import './NewTodo.css';

function NewTodo(props) {

    let [newTodo, updateNewTodo] = useState({
        'id': 0,
        'title': '',
        'createdOn': ''
    });

    const setTimeToZero = (date) => {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);

        return date;
    }

    const addTodo = (event) => {
        event.preventDefault();
        newTodo.id = props.listOfTodos.length + 1;
        updateNewTodo(newTodo);
        props.listOfTodos.push(newTodo);
        props.updateList(props.listOfTodos);
        props.hideNewTodo();
    }

    const changeTitle = (event) => {
        newTodo.title = event.target.value;
        updateNewTodo(newTodo);
    }

    const changeCreatedOn = (event) => {
        let createdOn = setTimeToZero(new Date(event.target.value)).getTime();
        newTodo.createdOn = createdOn;
    }

    return (
        <>
            <form className='new-todo-form'>

                <div className='title-container'>
                    <div className='title'>Title</div>
                    <input className='title-input' type='text' onChange={changeTitle} />
                </div>
                <div className='date-container'>
                    <div className='date'>Date</div>
                    <input className='date-input' type='date' onChange={changeCreatedOn} />
                </div>
                <div className='action-container'>
                    <button className='btn add' type='submit' onClick={addTodo}>Add</button>
                    <button className='btn cancel' onClick={() => { props.hideNewTodo() }}>Cancel</button>
                </div>
            </form>
        </>
    );
}

export default NewTodo;