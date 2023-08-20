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

  const [data, setData] = useState(localStorage.getItem("kanban-board-status")
    ? JSON.parse(localStorage.getItem("kanban-board-status"))
    : groupedTicketsArrayByStatus
  );


  const [grouping, setGrouping] = useLocalStorage("grouping", "status");
  const [ordering, setOrdering] = useLocalStorage("ordering", "priority");

  useEffect(() => {
    if (grouping === "status") {
      setData(localStorage.getItem("kanban-board-status") ? JSON.parse(localStorage.getItem("kanban-board-status")) : groupedTicketsArrayByStatus);
      localStorage.setItem("kanban-board-status", JSON.stringify(groupedTicketsArrayByStatus));
    } else if (grouping === "priority") {
      setData(localStorage.getItem("kanban-board-priority") ? JSON.parse(localStorage.getItem("kanban-board-priority")) : groupedTicketsArrayByPriority);
      localStorage.setItem("kanban-board-priority", JSON.stringify(groupedTicketsArrayByPriority));
    } else if (grouping === "user") {
      setData(localStorage.getItem("kanban-board-user") ? JSON.parse(localStorage.getItem("kanban-board-user")) : usersTicketsMaped);
      localStorage.setItem("kanban-board-user", JSON.stringify(usersTicketsMaped));
    }
  }, [grouping]);

  useEffect(() => {
    if (grouping === "status") {
      localStorage.setItem("kanban-board-status", JSON.stringify(data));
    }
    else if (grouping === "priority") {
      localStorage.setItem("kanban-board-priority", JSON.stringify(data));
    }
    else if (grouping === "user") {
      localStorage.setItem("kanban-board-user", JSON.stringify(data));
    }
  }, [data]);


  // const defaultDark = window.matchMedia(
  //   "(prefers-colors-scheme: dark)"
  // ).matches;
  // const [theme, setTheme] = useLocalStorage(
  //   "theme",
  //   defaultDark ? "dark" : "light"
  // );
  const [theme, setTheme] = useLocalStorage("theme", "dark");
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
    const index = data.findIndex((item) => item.status === bid);
    const tempData = [...data];
    console.log(tempData[index].tickets)
    tempData[index]?.tickets?.push({
      id: uuidv4(),
      title: title,
      tag: [],
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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App" data-theme={theme}>

        {/* <Navbar /> */}
        <Navbar grouping={grouping} setGrouping={setGrouping} ordering={ordering} setOrdering={setOrdering} theme={theme} switchTheme={switchTheme} />

        <div className="app_outer">
          <div className="app_boards">

            {data.map((item, index) => (
              <Board
                key={index}
                id={item?.status || item?.priority || item?.id}
                name={item?.status || item?.priority || item?.name}
                card={(ordering === "priority" && item.tickets.sort((a, b) => a.priority - b.priority).reverse()) || (ordering === "title" && item.tickets.sort((a, b) => a.title.localeCompare(b.title))) || item.card || []}
                grouping={grouping}
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
  );
}

export default App;
