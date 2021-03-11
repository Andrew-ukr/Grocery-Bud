import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ list }) => {
  return (
    <div className="grocery-list">
      {list.map(({id, name}) => {
        return (
          <article key={id} className="grocery-item">
            <p className="title">{name}</p>
            <div className="btn-container">
              <button className="edit-btn">
                <FaEdit></FaEdit>
              </button>
              <button className="delete-btn">
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
