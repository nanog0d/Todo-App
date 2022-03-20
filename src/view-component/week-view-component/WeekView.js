import React from 'react';
import { MdArrowBackIos, MdArrowForwardIos, MdDelete } from 'react-icons/md';
import NewTodo from '../../add-todo-component/NewTodo';
import './WeekView.css';

function WeekView(props) {
    let weekData = [];

    let weeklyTodoJSX = [];
    props.weekMap.forEach(date => {
        weekData.push(<div className='date-container' key={new Date(date).getDay()}>
            <div className=''>{props.dayMap[new Date(date).getDay()]}</div>
            <div className=''>{props.formatDate(new Date(date))}</div>
        </div>);
    });
    let weekStartDate = new Date(props.weekMap[0]);
    let weekEndDate = new Date(props.weekMap[6]);
    props.listOfTodos.sort((a, b) => {
        return a.createdOn - b.createdOn;
    });
    props.listOfTodos.forEach(todo => {
        if (new Date(todo.createdOn) >= weekStartDate && new Date(todo.createdOn) <= weekEndDate) {
            weeklyTodoJSX.push(
                <div className='todo' key={todo.id}>
                    <div className='content'>
                        <div>{todo.title}</div>
                        <div>{props.formatDate(new Date(todo.createdOn))}</div>
                    </div>
                    <div className='actions'><MdDelete className='delete-todo-icon' onClick={() => { deleteTodo(todo.id) }}></MdDelete></div>
                </div>
            );
        }

    });
    if (weeklyTodoJSX.length === 0) {
        weeklyTodoJSX.push(
            <div className='todo' key="no_todo">
                <div className='content'>
                    <div>No Todos Present</div>
                </div>
            </div>
        );
    }

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
            <div className='week-date-container'>
                <MdArrowBackIos className='btn btn-week-change' onClick={props.prevWeekCalendar}></MdArrowBackIos>
                {weekData}
                <MdArrowForwardIos className='btn btn-week-change' onClick={props.nextWeekCalendar}></MdArrowForwardIos>
            </div>
            <div className='scroll-container'>
                <div className='week-todo-container'>
                    {props.showNewTodo && (<NewTodo listOfTodos={props.listOfTodos} updateList={props.updateList} hideNewTodo={props.hideNewTodo}></NewTodo>)}
                    {weeklyTodoJSX}
                </div>
            </div>
        </>
    )
}

export default WeekView;