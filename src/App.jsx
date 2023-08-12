import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const [descVal, setDescVal]   = useState('');

  const handleAddTodo = () => {
    if(inputVal.length <= 0) {
      alert('Please fill up title!');
    } else if(descVal.length <= 0) {
      alert('Please fill up description');
    } else {
      setTodoList((prev) => [
        ...prev,
        {
          id: new Date().getTime(),
          title: inputVal,
          desc: descVal
        }
      ])

      setInputVal('');
      setDescVal('');
    }
  }

  return (
    <>
      <h1>To Do Lists</h1>
      <div className="inpWrp">
        <label>Title</label>
        <input type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} />
      </div>
      <div className="inpWrp">
        <label>Description</label>
        <input type="text" value={descVal} onChange={(e) => setDescVal(e.target.value)} />
      </div>
      <div className="btnWrp">
        <button onClick={() => handleAddTodo()}>Add</button>
      </div>
      <div>
        { todoList.length > 0 ? <Accordion todoList={todoList} /> : <div className="noRecordFound">No record found!</div> }
      </div>
    </>
  )
}

function Accordion({ todoList }) {
  const [currOpen, setCurrOpen] = useState(null)

  return (
    <div className="accordion">
      {todoList.map((todo, i) => (
        <AccordionItem
          key={i + 1}
          num={i + 1}
          title={todo.title}
          desc={todo.desc}
          currOpen={currOpen}
          onOpen={setCurrOpen}
        />
      ))}
    </div>
  );
}

function AccordionItem({ num, title, desc, currOpen, onOpen }) {
  const isOpen  = num === currOpen;

  const handleOpen = () => {
    onOpen( isOpen ? null : num);
  }

  return (
    <div className={`item ${isOpen ? 'open' : ''}`} onClick={() => handleOpen()}>
      <p className="number">{num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen? '-' : '+'}</p>

      {isOpen && <div className="content-box">{desc}</div>}
    </div>
  );
}

export default App