import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ list, delItem, editItem }) => {
  return (
    <div className="grocery-list">
      {list.map(({ id, name }) => {
        return (
          <article key={id} className="grocery-item">
            <p className="title">{name}</p>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editItem(id)}>
                <FaEdit></FaEdit>
              </button>
              <button className="delete-btn" onClick={() => delItem(id)}>
                <FaTrash></FaTrash>
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
