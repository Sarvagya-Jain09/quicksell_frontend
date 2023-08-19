import apidata from "./data.js";

const ticketsData = apidata.tickets;
const usersTicketsMaped = apidata.users;

usersTicketsMaped.map(user => {
    user.tickets = [];
    ticketsData.map(ticket => {
        if (ticket.userId === user.id) {
            user.tickets.push(ticket);
        }
    });
});

let usersMap;
apidata.users.map(user => {
    usersMap = {
        ...usersMap,
        [user.id]: user
    };
});

console.log(usersTicketsMaped);
console.log(usersMap);

export { usersTicketsMaped, usersMap };