const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
    id: number;
    text: string;
} ;

let todos: Todo [] =[];
let doneTasks: Todo[] = [];

const renderTasks = (): void =>{
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    todos.forEach((todo): void => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo): void => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });

};

const getTodoText = (): string => {
    return todoInput.value.trim();
};

const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text });
    todoInput.value ='';
    renderTasks();
};


const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((t): boolean => t.id !== todo.id);
    doneTasks.push(todo);
    renderTasks();
};

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t):boolean => t.id !== todo.id);
    renderTasks();
};

const createTodoElement = (todo: Todo, isDone: boolean): void => {

    const li = document.createElement('li');
    li.classList.add('render-container_item');
    li.textContent = todo.text;

    const button = document.createElement('button');
    button.classList.add('render-container_item-button');

    if(isDone){
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    }else{
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';     
        }
        button.addEventListener('click', (): void => {
            if(isDone){
                deleteTodo(todo);
            } else{
                completeTodo(todo);
            }

        });


        li.appendChild(button);
        return li;
    };


todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if(text) {
        addTodo(text);
    }
});

renderTasks();







/*const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doneList = document.getElementById('done-list') as HTMLUListElement;

type Todo = {
  id: number;
  text: string;
};

let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTasks = (): void => {
  // 기존 리스트를 비우기
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  // 할 일 목록 렌더링
  todos.forEach((todo): void => {
    const li = createTodoElement(todo, false);  // 할 일 목록에서 '완료' 버튼을 만들어 추가
    todoList.appendChild(li);
  });

  // 완료된 목록 렌더링
  doneTasks.forEach((todo): void => {
    const li = createTodoElement(todo, true);  // 완료 목록에서 '삭제' 버튼을 만들어 추가
    doneList.appendChild(li);
  });
};

// 텍스트를 가져오는 함수
const getTodoText = (): string => {
  return todoInput.value.trim();
};

// 할 일 추가 함수
const addTodo = (text: string): void => {
  todos.push({ id: Date.now(), text });
  todoInput.value = '';  // 입력창 비우기
  renderTasks();  // 목록 다시 렌더링
};

// 완료 처리 함수
const completeTodo = (todo: Todo): void => {
  todos = todos.filter((t): boolean => t.id !== todo.id);  // 할 일 목록에서 삭제
  doneTasks.push(todo);  // 완료 목록에 추가
  renderTasks();  // 목록 다시 렌더링
};

// 삭제 함수
const deleteTodo = (todo: Todo): void => {
  doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id);  // 완료 목록에서 삭제
  renderTasks();  // 목록 다시 렌더링
};

// 각 항목을 <li>로 만들어 반환하는 함수
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
  const li = document.createElement('li');
  li.classList.add('render-container_item');
  li.textContent = todo.text;

  const button = document.createElement('button');
  button.classList.add('render-container_item-button');

  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#dc3545';
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#28a745';
  }

  button.addEventListener('click', (): void => {
    if (isDone) {
      deleteTodo(todo);  // 삭제
    } else {
      completeTodo(todo);  // 완료 처리
    }
  });

  li.appendChild(button);
  return li;  // HTMLLIElement 반환
};

// 폼 제출 시 할 일 추가
todoForm.addEventListener('submit', (event: Event): void => {
  event.preventDefault();
  const text = getTodoText();
  if (text) {
    addTodo(text);
  }
});

// 초기 렌더링
renderTasks();*/
