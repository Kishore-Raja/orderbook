import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrderBid,
  selectOrderAsk
} from '../../app/orderBookSlice';
import './OrderBook.scss';
import { OrderTable } from '../orderTable/OrderTable';

export function OrderBook() {
  const orderbids = useSelector(selectOrderBid);
  const orderasks = useSelector(selectOrderAsk);
  console.log("orderbids", orderbids)
  console.log("orderasks", orderasks)
  
  return (
  <div className="container">
  <div className="book_header">
      <div><em className="fa fa-chevron-down fa-fw"><span className="ui-collapsible_title">Order Book</span> <span className="show50"><span className="">BTC<span className="show-soft">/USD </span> </span></span></em></div>
      <div> </div>
  </div>
  <div className="book_main">
 { orderbids && <OrderTable type="book_bids" data={orderbids} /> }
 { orderasks && <OrderTable type="book_asks" data={orderasks} /> }
    </div>
      
 
</div>
  );
}
