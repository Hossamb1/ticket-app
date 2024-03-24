import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTickets, reset } from "../features/ticket/ticketSlice";
import TicketItem from "../components/ticketItem";
import BackButton from "../components/backButton";
import Spinner from "../components/spinner";

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector((state) => {
    return state.tickets;
  });

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getTickets());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <>
      <BackButton url="/" />
      <h1>Tickets </h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets.map((ticket) => {
          return <TicketItem key={ticket._id} ticket={ticket} />;
        })}
      </div>
    </>
  );
};

export default Tickets;
