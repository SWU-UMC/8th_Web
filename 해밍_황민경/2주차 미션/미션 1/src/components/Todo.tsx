const Todo = (): Element => {
  return (
    <div className="todo-container">
      <h1 className="todo-container__header">MING TODO</h1>
      <form className="todo-container__form">
        <input
          type="text"
          className="todo-container__input"
          placeholder="할일 입력하세요"
          required
        />
        <button type="submit" className="todo-container__button">
          할 일 추가
        </button>
      </form>
      <div className="render-container">
        <div className="render-container__section">
          <h2 className="render-container__title">할 일</h2>
          <ul id="todo-list" className="render-container__list">
            <li className="render-container__item">
              <span className="render-container__item-text">고구마</span>
              <button
                style={{
                  backgroundColor: "#28a745",
                }}
                className="render-container__item-button"
              >
                완료
              </button>
            </li>
          </ul>
        </div>
        <div className="render-container__section">
          <h2 className="render-container__title">완료</h2>
          <ul id="todo-list" className="render-container__list">
            <li className="render-container__item">
              <span className="render-container__item-text">고구마</span>
              <button
                style={{
                  backgroundColor: "#dc3545",
                }}
                className="render-container__item-button"
              >
                삭제
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Todo;
