import React, { useContext } from 'react';
import { UserDispatch } from '../App';
import {MdDone, MdDelete} from 'react-icons/md';

const Lists = ({todos}) => {
    // props로 받던 값을 context를 사용해 쉽게 값을 받아올 수 있다! 
    const dispatch = useContext(UserDispatch);
    return (
        <div>
            <ul>
                {todos.map(todo => <li key={todo.id} style={{color: todo.isDone ? '#ccc' : '#333'}}>
                <span onClick={() => {
                    dispatch({type: 'toggleTodo', id: todo.id})
                }}> <MdDone></MdDone> {todo.text}</span>
                <button onClick={() => {
                    dispatch({type: 'deleteTodo', id: todo.id})
                }}><MdDelete></MdDelete></button></li>)}
            </ul>
        </div>
    );
};

export default Lists;