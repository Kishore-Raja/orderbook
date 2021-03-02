import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectOrder,
} from '../../app/orderBookSlice';
import './OrderBook.scss';
import { OrderTable } from '../orderTable/OrderTable';

export function OrderBook() {
  const order = useSelector(selectOrder);
  console.log("snapshotOrders",order)
  return (
  <div className="container">
  <div className="book_header">
      <div><em className="fa fa-chevron-down fa-fw"><span className="ui-collapsible_title">Order Book</span> <span className="show50"><span className="">BTC<span className="show-soft">/USD </span> </span></span></em></div>
      <div> </div>
  </div>
  <div className="book_main">
 { order && order.bids  && <OrderTable type="book_bids" data={order.bids}/> }
 { order && order.asks  && <OrderTable type="book_asks" data={order.asks}/> }
    </div>
      
 
</div>
  );
}
