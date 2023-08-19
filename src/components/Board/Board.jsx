import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import "./Board.css";
import { MoreHorizontal } from "react-feather";
import Editable from "../Editable/Editable";
import Dropdown from "../Dropdown/Dropdown";
import { Droppable } from "react-beautiful-dnd";
import { usersTicketsMaped, usersMap } from "../../UsersData";



export default function Board(props) {
  const [show, setShow] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [icon, setIcon] = useState("");
  const [iconColor, setIconColor] = useState("");

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.code === "Enter") setShow(false);
    });
    return () => {
      document.removeEventListener("keypress", (e) => {
        if (e.code === "Enter") setShow(false);
      });
    };
  });


  useEffect(() => {
    switch (props.grouping) {
      case "status":
        switch (props.name) {
          case "Backlog":
            setIcon("circle-exclamation");
            setIconColor("#ff7b00");
            break;
          case "Todo":
            setIcon("circle-notch");
            setIconColor("");
            break;
          case "In progress":
            setIcon("circle-half-stroke");
            setIconColor("#FFFF00");
            break;
          case "Done":
            setIcon("circle-check");
            setIconColor("#5d69d1");
            break;
          case "Canceled":
            setIcon("circle-xmark");
            setIconColor("#808080");
            break;

          default:
            break;
        }
        break;

      case "priority":
        switch (props.name) {
          case "No priority":
            setIcon("ellipsis");
            setIconColor("#808080");
            break;
          case "Low":
            setIcon("volume-off");
            setIconColor("#15d200");
            break;
          case "Medium":
            setIcon("volume-low");
            setIconColor("#FFFF00");
            break;
          case "High":
            setIcon("volume-high");
            setIconColor("#ff7b00");
            break;
          case "Urgent":
            setIcon("exclamation-circle");
            setIconColor("#FF0000");
            break;

          default:
            break;
        }
        break;

      default:
        break;
    }
  }, [props]);


  // Getting Initials
  const fullName = usersMap[props.id]?.name;
  const namesArray = fullName?.split(" ");
  const firstName = namesArray ? namesArray[0] : "";
  const lastName = namesArray && namesArray[namesArray?.length - 1];

  const firstLetterFirstName = firstName?.charAt(0).toUpperCase();
  const firstLetterLastName = lastName?.charAt(0).toUpperCase();

  const initials = `${firstLetterFirstName}${firstLetterLastName}`;


  return (
    <div className="board">
      <div className="board__top">
        {show ? (
          <div>
            <input
              className="title__input"
              type={"text"}
              defaultValue={props.name}
              onChange={(e) => {
                props.setName(e.target.value, props.id);
              }}
            />
          </div>
        ) : (
          <div>
            <p onClick={() => { setShow(true) }} className="board__title">

              {props?.grouping === "user" ?
                // (<span className="board__initials">{props?.name?.charAt(0).toUpperCase()}</span>)
                (
                  <span className="initials">
                    <div className={`available_${usersMap[props.id]?.available}`}></div>
                    {initials}
                  </span>
                )
                :
                (<i className={`fa-solid fa-${icon}`} style={{ marginRight: "8px", color: `${iconColor}` }}></i>)
              }

              {props?.name || "Name of Board"}
              <span className="total__cards">{props.card?.length}</span>

            </p>
          </div>
        )}

        {/* <div
          onClick={() => {
            setDropdown(!dropdown);
          }}
        >
          <MoreHorizontal />
          {dropdown && (
            <Dropdown
              pos="right"
              className="board__dropdown"
              dropdown={dropdown}
              onClose={() => {
                setDropdown(false);
              }}
            >
              <p onClick={() => props.removeBoard(props.id)}>Delete Board</p>
            </Dropdown>
          )}
        </div> */}
      </div>

      <Droppable droppableId={props.id.toString()}>
        {(provided) => (
          <div
            className="board__cards"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >

            {props.card?.map((item, index) => (
              <Card
                bid={props.id}
                index={index}
                key={item.id}
                id={item.id}
                title={item.title}
                tag={item.tag}
                status={item.status}
                priority={item.priority}
                availability={item.availability}
                userId={item.userId}
                updateCard={props.updateCard}
                removeCard={props.removeCard}
                card={item}
              />
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <div className="board__footer">
        <Editable
          name={"Add Card"}
          btnName={"Add Card"}
          placeholder={"Enter Card Title"}
          onSubmit={(value) => props.addCard(value, props.id)}
        />
      </div>
    </div>
  );
}
