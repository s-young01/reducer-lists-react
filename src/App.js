import { createContext, useReducer } from 'react';
import './App.css';
import Header from './components/Header';
import Lists from './components/Lists';

// 사용할 상태 초기값 변수 선언 
// 초기 상태를 컴포넌트 밖에 선언
const initialState = {
  input: "",
  todos: [
    {id: 1, text: '할 일1', isDone: false},
    {id: 2, text: '할 일2', isDone: false}
  ],
  id: 3
}
// reducer 함수 선언
function reducer(state, action) {
  switch(action.type) {
    case 'changeInput': // input값 변경
      return {
        ...state, // 초기 값 스프레드
        input: action.payload // action객체의 payload라는 key값 지정
      };
    case 'addTodo': // 할 일 추가
      return {
        ...state,
        todos: [...state.todos, action.todo], // 기존 배열에 새롭게 업데이트 되는 배열을 덮어 씌워줌
        input: "", // input값은 다시 빈 문자열로 반환 
        id: state.id + 1 // id값에 1을 더한 값 반환
      };
    case 'deleteTodo': // 할 일 삭제
      return {
        ...state,
        // 클릭한 친구 id와 action으로 덮어씌운 id값과 다른 친구들만 배열로 반환
        todos: state.todos.filter(todo => todo.id !== action.id)
      };
    case 'toggleTodo': // isDone 반전하기
      return {
        ...state,
        todos: state.todos.map // 클릭한 친구id와 action으로 덮어씌워준 id값이
        // 일치하면 다시 기존 배열 스프레드, isDone의 값만 변경!
        // 일치하지 않으면 그냥 기존 배열 반환
        (todo => todo.id === action.id ? {...todo, isDone: !todo.isDone} : todo)
      };
    default: 
      return state;
  }
}

// 어디서든 쓸 수 있게 export로 내보내기
export const UserDispatch = createContext(null);

function App() {
  // 상태 선언하기
  const [state, dispatch] = useReducer(reducer, initialState);
  const {todos, input, id} = state;
  
  // input값 업데이트 요청
  // const onChange = (e) => {
  //   dispatch({
  //     type: 'changeInput',
  //     payload: e.target.value
  //   })
  // }
  // todo값 추가 / 삭제 업데이트 요청
  // const onAdd = () => {
  //   dispatch({
  //     type: 'addTodo',
  //     todo: {id:id , text: input , isDone: false}
  //   })
  // }
  // const onDelete = (id) => {
  //   dispatch({
  //     type: 'deleteTodo',
  //     id: id
  //   })
  // }
  // toggle값 업데이트 요청
  // const toggleTodo = (id) => {
  //   dispatch({
  //     type: 'toggleTodo',
  //     id: id
  //   })
  // }
  return (
    <UserDispatch.Provider value={dispatch}>
      <div className="App">
        <Header input={input} id={id} 
          // onChange={onChange}
          // onAdd={onAdd}
          />
        <Lists todos={todos}
          // onDelete={onDelete}
          // toggleTodo={toggleTodo}
          />
      </div>
    </UserDispatch.Provider>
    
  );
}

export default App;
