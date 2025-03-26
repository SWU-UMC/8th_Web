const todoInput = document.getElementById('todo-input') as HTMLInputElement; // 입력 필드
const todoForm = document.getElementById('todo-form') as HTMLFormElement; // 입력 폼
const todoList = document.getElementById('todo-list') as HTMLUListElement; // 할 일 리스트 요소
const doneList = document.getElementById('done-list') as HTMLUListElement; // 완료 리스트 요소

// 각 할 일의 ID와 내용 타입 정의
type Todo = { id: number; text: string; };

let todos: Todo[] = []; // 할 일 목록
let doneTasks: Todo[] = []; // 완료 목록

const renderTasks = (): void => {
    // 목록들 초기화
    todoList.innerHTML = '';
    doneList.innerHTML = '';

    // 할 일 목록 리스트에 추가
    todos.forEach((todo): void => {
        todoList.appendChild(createTodoElement(todo, false));
    });

    // 완료 목록 리스트에 추가
    doneTasks.forEach((todo): void => {
        doneList.appendChild(createTodoElement(todo, true));
    });
};

// 입력에서 텍스트 가져오기
const getTodoText = (): string => {
    return todoInput.value.trim();
};

// 할 일 추가하기
const addTodo = (text: string): void => {
    todos.push({ id: Date.now(), text }); // 현재의 시간을 기준으로 ID를 생성해서 추가
    todoInput.value = ''; // 입력 초기화
    renderTasks(); // 화면 렌더링
};

// 완료 목록으로 이동하기
const completeTodo = (todo: Todo): void => {
    todos = todos.filter((t): boolean => t.id !== todo.id); // 할 일 목록에서 제거
    doneTasks.push(todo); // 완료 목록에 추가
    renderTasks(); // 화면 렌더링
};

// 완료된 할 일 삭제
const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((t): boolean => t.id !== todo.id); // 완료 목록에서 제거
    renderTasks(); // 화면 렌더링
};

// 할 일 목록 생성
const createTodoElement = (todo: Todo, isDone: boolean): HTMLLIElement => {
    const li = document.createElement('li');
    li.classList.add('todo-main__item');
    li.textContent = todo.text; // 할 일에 내용 추가

    const button = document.createElement('button');
    button.classList.add('todo-main__item-button');

    // 삭제 완료 버튼 텍스트와 색 지정
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = '#dc3545';
    } else {
        button.textContent = '완료';
        button.style.backgroundColor = '#28a745';
    }

    button.addEventListener('click', (): void => {
        if (isDone) {
            deleteTodo(todo); // 완료할 일 삭제
        } else {
            completeTodo(todo); // 할 일을 완료로 이동
        }
    });

    li.appendChild(button);
    return li;
};

// 새 할 일 추가
todoForm.addEventListener('submit', (event: Event): void => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});

renderTasks();