// import React, { useState } from 'react';
// import ThemeContext from './context/ThemeContext';
// import Home from './components/Home';
// import './App.css';

// const App = () => {
//   const [isDarkTheme, setIsDarkTheme] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkTheme(!isDarkTheme);
//   }

//   return (
//     <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: toggleTheme }}>
//       <Home />
//     </ThemeContext.Provider>
//   )
// }

import React, { useEffect, useState } from "react";
import ThemeContext from './context/ThemeContext';
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Board from "./components/Board/Board";
import { DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Editable from "./components/Editable/Editable";
import useLocalStorage from "use-local-storage";
import apidata from "./data";
import { usersTicketsMaped, usersMap } from "./UsersData";
import { groupedTicketsArrayByStatus, groupedTicketsArrayByPriority } from "./Grouping";
import DisplayOptions from "./components/DisplayOptions/DisplayOptions";


const App = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  const [data, setData] = useState(usersTicketsMaped);

  const [grouping, setGrouping] = useState("status");
  const [ordering, setOrdering] = useState("priority");

  useEffect(() => {
    localStorage.removeItem("kanban-board");
    if (grouping === "status") {
      setData(groupedTicketsArrayByStatus);
      localStorage.setItem("kanban-board", JSON.stringify(groupedTicketsArrayByStatus));
    } else if (grouping === "priority") {
      setData(groupedTicketsArrayByPriority);
      localStorage.setItem("kanban-board", JSON.stringify(groupedTicketsArrayByPriority));
    } else if (grouping === "user") {
      setData(usersTicketsMaped);
      localStorage.setItem("kanban-board", JSON.stringify(usersTicketsMaped));
    }
  }, [grouping]);

  const defaultDark = window.matchMedia(
    "(prefers-colors-scheme: dark)"
  ).matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const setName = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].boardName = title;
    setData(tempData);
  };

  const dragCardInBoard = (source, destination) => {
    let tempData = data && [...data];
    const destinationBoardIdx = tempData.findIndex(
      (item) => {
        switch (grouping) {
          case "status":
            return item?.status?.toString() === destination.droppableId;
          case "priority":
            return item?.priority?.toString() === destination.droppableId;
          case "user":
            return item?.id?.toString() === destination.droppableId;

          default:
            break;
        }
      });
    const sourceBoardIdx = tempData.findIndex(
      (item) => {
        switch (grouping) {
          case "status":
            return item?.status?.toString() === source.droppableId;
          case "priority":
            return item?.priority?.toString() === source.droppableId;
          case "user":
            return item?.id?.toString() === source.droppableId;

          default:
            break;
        }
      }
    );
    console.log(destinationBoardIdx, sourceBoardIdx);
    tempData[destinationBoardIdx].tickets.splice(
      destination.index,
      0,
      tempData[sourceBoardIdx].tickets[source.index]
    );
    tempData[sourceBoardIdx].tickets.splice(source.index, 1);

    return tempData;
  };

  const addCard = (title, bid) => {
    const index = data.findIndex((item) => item.id === bid);
    const tempData = [...data];
    tempData[index].card.push({
      id: uuidv4(),
      title: title,
      tags: [],
      task: [],
    });
    setData(tempData);
  };

  const removeCard = (boardId, cardId) => {
    const index = data.findIndex((item) => item.id === boardId);
    const tempData = [...data];
    const cardIndex = data[index].card.findIndex((item) => item.id === cardId);

    tempData[index].card.splice(cardIndex, 1);
    setData(tempData);
  };

  const addBoard = (title) => {
    const tempData = [...data];
    tempData.push({
      id: uuidv4(),
      boardName: title,
      card: [],
    });
    setData(tempData);
  };

  const removeBoard = (bid) => {
    const tempData = [...data];
    const index = data.findIndex((item) => item.id === bid);
    tempData.splice(index, 1);
    setData(tempData);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log(result);
    if (!destination) return;

    if (source.droppableId === destination.droppableId) return;

    setData(dragCardInBoard(source, destination));
  };

  const updateCard = (bid, cid, card) => {
    const index = data.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...data];
    const cards = tempBoards[index].card;

    const cardIndex = cards.findIndex((item) => item.id === cid);
    if (cardIndex < 0) return;

    tempBoards[index].card[cardIndex] = card;
    console.log(tempBoards);
    setData(tempBoards);
  };

  useEffect(() => {
    localStorage.setItem("kanban-board", JSON.stringify(data));
    // console.log(apidata.tickets);
  }, [data]);


  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme: toggleTheme }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="App" data-theme={theme}>

          {/* <Navbar /> */}
          <Navbar grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} switchTheme={switchTheme} />

          <div className="app_outer">
            <div className="app_boards">
              {/* {data.map((item) => (
                <Board
                  key={item.id}
                  id={item.id}
                  name={item.boardName}
                  card={item.card}
                  setName={setName}
                  addCard={addCard}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  updateCard={updateCard}
                />
              ))} */}

              {data.map((item, index) => (
                <Board
                  key={index}
                  id={item?.status || item?.priority || item?.id}
                  name={item?.status || item?.priority || item?.name}
                  card={(ordering === "priority" && item.tickets.sort((a, b) => a.priority - b.priority).reverse()) || (ordering === "title" && item.tickets.sort((a, b) => a.title.localeCompare(b.title))) || item.card || []}
                  setName={setName}
                  addCard={addCard}
                  removeCard={removeCard}
                  removeBoard={removeBoard}
                  updateCard={updateCard}
                />
              ))}

              {/* <Editable
                className={"add__board"}
                name={"Add Board"}
                btnName={"Add Board"}
                onSubmit={addBoard}
                placeholder={"Enter Board Title"}
              /> */}
            </div>
          </div>

        </div>
      </DragDropContext>
    </ThemeContext.Provider>
  );
}

export default App;
