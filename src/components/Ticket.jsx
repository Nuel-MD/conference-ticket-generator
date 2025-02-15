import React from 'react';

const Ticket = ({ ticketData }) => {
  return (
    <div className="ticket">
      <h2>Your Ticket</h2>
      <img src={ticketData.avatar} alt="Avatar" />
      <p>Name: {ticketData.fullName}</p>
      <p>Email: {ticketData.email}</p>
      <p>Ticket Type: {ticketData.ticketType}</p>
      <button onClick={() => window.print()}>Download Ticket</button>
    </div>
  );
};

export default Ticket;
