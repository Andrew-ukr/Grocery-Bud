import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const checkStorage = () => {
  let list = JSON.parse(localStorage.getItem("list"));
  if (list) {
    return list;
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(checkStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
      console.log(1);
    }, 2000);
    return () => {
      clearTimeout(timeout);
      console.log(1);
    };
  }, [alert.show, list]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name) {
      showAlert(true, "please enter value", "danger");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, name };
          }
          return item;
        })
      );
      showAlert(true, "the value was edited", "success");
      setName("");
      setIsEditing(false);
      setEditId(null);
    } else {
      showAlert(true, "value added to the list", "success");
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

  const delItem = (id) => {
    showAlert(true, "item deleted", "danger");
    setList(list.filter((item) => item.id !== id));
  };

  const editItem = (id) => {
    const editId = list.find((item) => item.id === id);
    setName(editId.name);
    setIsEditing(true);
    setEditId(editId.id);
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
          <List list={list} delItem={delItem} editItem={editItem}></List>
          <button className="clear-btn" onClick={clearList}>
            clear item
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
