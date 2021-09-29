import React, { useState , useEffect } from "react";

const getlocalStorage = () => {
  const itemList = localStorage.getItem("mytodolist")
  if (itemList) {
    return JSON.parse(itemList)
  }
  else {
    return []
  }
}

function List() {
  const [list, setList] = useState(getlocalStorage());
  const [item, setItem] = useState("");
  const [isEditItem , setIsEditItem] = useState("");
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!item) {
      alert("Please enter a data");
    }
    else if(toggleButton && item){
      setList(
        list.map((ele) => {
        if(ele.id === isEditItem){
          return { ...list, name: item }; 
        }
        return ele;
      })
      )

      setToggleButton(false);
      setIsEditItem(null);
      setItem("");
    }
    else {
      const mynewlist = {
        id: new Date().getTime(),
        name: item,
      };
      setList([...list, mynewlist]);
      setItem("");
    }
  };

  // Delete an item from the list
  const deleItem = (index) => {
    const mylist =  list.filter((ele) => {
      return ele.id !== index;
    });
    setList(mylist);
  };

  // Delete all the items
  const removeAll = () => {
    setList([]);
  }
  // Edit items of list 
  const editItem = (index) => {
    const item_to_edit = list.find((ele) => {
      return ele.id === index ;
    });
    setToggleButton(true)
    setIsEditItem(index);
    setItem(item_to_edit.name);
  }
  // Store Data in loacal Storage
  useEffect(() => {
    localStorage.setItem("mytodolist",JSON.stringify(list))
  }, [list])

  return (
    <>
      <section className="cont">
        <div className="mb-3 container">
          <label htmlFor="todo-list" className="form-label">
            Add your item here
          </label>
          <div className="list">
            <input
              type="text"
              className="form-control"
              id="todo-list"
              placeholder="Add item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
            />
            {toggleButton ? (
              <i className="icon fas fa-edit" onClick={addItem}></i>
            ) : (
              <i className="icon fas fa-plus" onClick={addItem}></i>
            )}
          </div>
        </div>

        {list.map((mynewlist) => {
          return (
            <div className="showItems container" key={mynewlist.id}>
              <div className="eachItem">{mynewlist.name}</div>
              <i
                className="fas fa-trash-alt removed"
                onClick={() => deleItem(mynewlist.id)}
              ></i>
              <i
                className="fas fa-edit editd"
                onClick={() => editItem(mynewlist.id)}
              ></i>
            </div>
          );
        })}

        <button className="btn btn-primary my-3" onClick={removeAll}>
          Checklist
        </button>
      </section>
    </>
  );
}

export default List;
