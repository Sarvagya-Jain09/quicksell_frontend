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

  const [priorityTag, setPriorityTag] = useState("");

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
  const namesArray = fullName.split(" ");
  const firstName = namesArray[0];
  const lastName = namesArray[namesArray.length - 1];

  const firstLetterFirstName = firstName.charAt(0).toUpperCase();
  const firstLetterLastName = lastName.charAt(0).toUpperCase();

  const initials = `${firstLetterFirstName}${firstLetterLastName}`;


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
              <p>{props.title}</p>
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
              <span>
                <div className={`available_${usersMap[props.userId]?.available}`}></div>
                {initials}
              </span>
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
