import apidata from './data.js';

const ticketsData = apidata.tickets;


// Grouping tickets by status
const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Canceled'];
const groupedTicketsByStatus = statusOrder.reduce((result, status) => {
    result[status] = [];
    return result;
}, {});
ticketsData.forEach(ticket => {
    if (groupedTicketsByStatus[ticket.status]) {
        groupedTicketsByStatus[ticket.status].push(ticket);
    }
});
const groupedTicketsArrayByStatus = statusOrder.map(status => ({
    status,
    tickets: groupedTicketsByStatus[status]
}));
console.log(groupedTicketsArrayByStatus);



// Grouping tickets by priority
const priorityOrder = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
const groupedTicketsByPriority = priorityOrder.reduce((result, priority) => {
    result[priority] = [];
    return result;
}, {});
ticketsData.forEach(ticket => {
    const priority = priorityOrder[ticket.priority];
    if (groupedTicketsByPriority[priority]) {
        groupedTicketsByPriority[priority].push(ticket);
    }
});
const groupedTicketsArrayByPriority = priorityOrder.map(priority => ({
    priority,
    tickets: groupedTicketsByPriority[priority]
})).reverse();
console.log(groupedTicketsArrayByPriority);



export { groupedTicketsArrayByStatus, groupedTicketsArrayByPriority };