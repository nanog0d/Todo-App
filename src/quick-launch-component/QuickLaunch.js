import React, { useEffect, useState } from 'react';
import ListView from '../view-component/list-view-component/ListView';
import WeekView from '../view-component/week-view-component/WeekView';
import { MdOutlineViewWeek, MdFormatListBulleted, MdAdd } from 'react-icons/md';
import './QuickLaunch.css'


const dayMap = [
    "Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat"
]
const monthMap = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
]

function QuickLaunch(props) {
    let [weekMap, changeWeek] = useState([]);
    let [selectedMonth, changeMonth] = useState('');
    let [showNewTodo, changeNewTodoFlag] = useState(false);

    const monthJSX = [];
    monthMap.forEach(month => {
        monthJSX.push(<option className='option' key={month} value={month}>{month}</option>)
    })
    let [listOfTodos, updateList] = useState([
        { "id": 1, "title": "Code java", "createdOn": new Date(2022, 3, 18).getTime() },
        { "id": 2, "title": "Code java", "createdOn": new Date(2022, 2, 18).getTime() },
        { "id": 3, "title": "Code java", "createdOn": new Date(2022, 3, 16).getTime() },
        { "id": 4, "title": "Code java", "createdOn": new Date(2022, 3, 17).getTime() },
        { "id": 5, "title": "Code java", "createdOn": new Date(2022, 3, 23).getTime() },
        { "id": 6, "title": "Code java", "createdOn": new Date(2022, 3, 24).getTime() },
        { "id": 7, "title": "Code java", "createdOn": new Date(2022, 1, 18).getTime() },
        { "id": 8, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 9, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 10, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 11, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 12, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 13, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 14, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 15, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 16, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() },
        { "id": 17, "title": "Code java", "createdOn": new Date(2022, 3, 3).getTime() },
        { "id": 18, "title": "Code java", "createdOn": new Date(2022, 2, 16).getTime() }
    ]);



    const formatDate = (date) => {
        return `${date.getDate()} ${monthMap[date.getMonth()]}, ${date.getFullYear()}`;
    };

    const changeView = (viewId) => {
        props.changeView(viewId);
        initializeCalendar('');
    };

    const setTimeToZero = (date) => {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
    }

    const initializeWeekMap = (weekDate) => {
        weekMap = [];
        for (let day = 0; day <= 6; day++) {
            weekMap.push(new Date(weekDate.setDate(weekDate.getDate() - weekDate.getDay() + day)));
        }
        weekMap.forEach(date => {
            setTimeToZero(date);
        })
        changeWeek(weekMap);
        changeMonth(monthMap[weekMap[0].getMonth()]);
    }

    const initializeCalendar = (month) => {
        if (month !== undefined || month === '') {
            changeMonth(month);
            let monthIndex = monthMap.indexOf(month);
            let date = new Date(new Date().setMonth(monthIndex));
            date.setDate(1);
            let weekStartDate = new Date(date.setDate(date.getDate() - date.getDay()));
            if (weekStartDate.getMonth() !== monthIndex) {
                let weekEndDate = new Date(date.setDate(date.getDate() - date.getDay() + 6));
                let nextWeekStartDate = new Date(weekEndDate.setDate(weekEndDate.getDate() + 1))
                weekStartDate = nextWeekStartDate;
            }
            initializeWeekMap(weekStartDate);

        } else {
            let currDate = new Date();
            initializeWeekMap(currDate);
        }
        hideNewTodo();
    };

    useEffect(() => {
        initializeCalendar();
    }, [props.currentView]);

    const nextWeekCalendar = () => {
        let currWeekEndDate = new Date(weekMap[6]);
        let nextWeekStartDate = new Date(currWeekEndDate.setDate(currWeekEndDate.getDate() + 1));
        initializeWeekMap(nextWeekStartDate);
        hideNewTodo();
    }

    const prevWeekCalendar = () => {
        let currWeekStartDate = new Date(weekMap[0]);
        let prevWeekEndDate = new Date(currWeekStartDate.setDate(currWeekStartDate.getDate() - 1));
        initializeWeekMap(prevWeekEndDate);
        hideNewTodo();
    }

    const addNewTodo = () => {
        showNewTodo = true;
        changeNewTodoFlag(showNewTodo);
    }

    const hideNewTodo = () => {
        showNewTodo = false;
        changeNewTodoFlag(showNewTodo);
    }

    return (
        <>
            <div className="quick-launch-container">
                <div className='title'>
                    Todos App
                </div>
                <div className="single-col">
                    <MdOutlineViewWeek title='Week View' className='icons ws-m-r-10' onClick={() => { changeView(3) }} />
                    <MdFormatListBulleted title='List View' className='icons' onClick={() => { changeView(1) }} />
                </div>
                <div className={`actions`}>
                    <MdAdd className='add-new-todo' onClick={addNewTodo}></MdAdd>
                    <select onChange={(e) => { initializeCalendar(e.target.value) }} className={`${props.currentView === 1 ? 'hide-dropdown' : ''}`} value={selectedMonth}>
                        {monthJSX}
                    </select>
                </div>
            </div>
            <div className="todo-container">
                {props.currentView === 1 && (<><ListView showNewTodo={showNewTodo} hideNewTodo={hideNewTodo} changeNewTodoFlag={changeNewTodoFlag} listOfTodos={listOfTodos} updateList={updateList} formatDate={formatDate}></ListView></>)}
                {props.currentView === 3 && (<><WeekView showNewTodo={showNewTodo} hideNewTodo={hideNewTodo} changeNewTodoFlag={changeNewTodoFlag} nextWeekCalendar={nextWeekCalendar} prevWeekCalendar={prevWeekCalendar} weekMap={weekMap} listOfTodos={listOfTodos} updateList={updateList} formatDate={formatDate} dayMap={dayMap}></WeekView></>)}
            </div>
        </>
    );
}

export default QuickLaunch;