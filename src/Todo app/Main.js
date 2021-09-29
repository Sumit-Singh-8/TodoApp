import React from "react";
import List from './components/List'
import "../Todo app/style.css"


function Main() {
  return (
    <>
      <div className="container">
        <h1 className="heading">Todo App
        <hr /></h1>
        <List />
      </div>
    </>
  );
}

export default Main;
