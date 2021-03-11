import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [alert.show]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name && !isEditing) {
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
    } else {
      showAlert(true, "item added to the list", "success");
      const newItem = { id: new Date().getTime().toString(), name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, msg = "", type = "") => {
    setAlert({ show, msg, type });
  };

  const clearList = () => {
    showAlert(true, "the list is clear", "success");
    setList([]);
  };

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert}></Alert>}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            placeholder="e.g. eggs"
            className="grocery"
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="submit-btn" type="submit">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List list={list}></List>
          <button className="clear-btn" onClick={clearList}>
            clear item
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
