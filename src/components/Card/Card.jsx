import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Calendar, CheckSquare, Clock, MoreHorizontal } from "react-feather";
import Dropdown from "../Dropdown/Dropdown";
import Modal from "../Modal/Modal";
import Tag from "../Tags/Tag";
import "./Card.css";
import CardDetails from "./CardDetails/CardDetails";
import { usersTicketsMaped, usersMap } from "../../UsersData";


const Card = (props) => {
  const [dropdown, setDropdown] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [icon, setIcon] = useState("");
  const [iconColor, setIconColor] = useState("");
  const [priorityTag, setPriorityTag] = useState("");

  // generating random color for user initials
  const randomLightness = Math.floor(Math.random() * 20) + 40; // Limit lightness between 40 and 60
  const randomSaturation = Math.floor(Math.random() * 31) + 50; // Limit saturation between 50 and 80
  const randomColorValue = `hsl(${Math.floor(Math.random() * 360)}, ${randomSaturation}%, ${randomLightness}%)`;

  useEffect(() => {
    switch (props.priority) {
      case 0:
        setPriorityTag("none");
        break;
      case 1:
        setPriorityTag("low");
        break;
      case 2:
        setPriorityTag("medium");
        break;
      case 3:
        setPriorityTag("high");
        break;
      case 4:
        setPriorityTag("urgent");
        break;

      default:
        setPriorityTag("none");
        break;
    }
  }, [props.priority]);


  // Getting Initials
  const fullName = usersMap[props.userId]?.name;
  const namesArray = fullName?.split(" ");
  const firstName = namesArray ? namesArray[0] : "";
  const lastName = namesArray && namesArray[namesArray?.length - 1];

  const firstLetterFirstName = firstName?.charAt(0).toUpperCase();
  const firstLetterLastName = lastName?.charAt(0).toUpperCase();

  const initials = `${firstLetterFirstName}${firstLetterLastName}`;


  useEffect(() => {
    switch (props.status) {
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
  }, [props]);



  return (
    <Draggable
      key={props.id.toString()}
      draggableId={props.id.toString()}
      index={props.index}
    >
      {(provided) => (
        <>
          {modalShow && (
            <CardDetails
              updateCard={props.updateCard}
              onClose={setModalShow}
              card={props.card}
              bid={props.bid}
              removeCard={props.removeCard}
            />
          )}

          <div
            className="custom__card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className={priorityTag}></div>
            <div className="card__id">{props.id}</div>

            <div className="card__text">
              <i className={`fa-solid fa-${icon} fa-xs`} style={{ color: `${iconColor}` }}></i>
              <span>{props.title}</span>
              {/* <MoreHorizontal
                className="card__more"
                onClick={() => {
                  setModalShow(true);
                  setDropdown(true);
                }}
              /> */}
            </div>

            <div className="card__tags">
              {props.tag?.map((item, index) => (
                <Tag key={index} tagName={item} color={item?.color} />
              ))}
              {fullName &&
                <span style={{ backgroundColor: `${randomColorValue}` }}>
                  <div className={`available_${usersMap[props.userId]?.available}`}></div>
                  {initials}
                </span>
              }
            </div>

            {/* <div className="card__footer">
              {props.tag.length !== 0 && (
                <div className="task">
                  <CheckSquare />
                  <span>
                    {props.tag.length !== 0
                      ? `${(props.tag?.filter(
                        (item) => item.completed === true
                      )).length
                      } / ${props.tag.length}`
                      : `${"0/0"}`}
                  </span>
                </div>
              )}
            </div> */}

            {provided.placeholder}
          </div>
        </>
      )}
    </Draggable>
  );
};

export default Card;
