import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faSearchPlus, faSearchMinus, faCog, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import Modal from '../modalPopup/ModalPopup';
import 'reactjs-popup/dist/index.css';
import {
  selectOrderBid,
  selectOrderAsk,
  zoomIn,
  zoomOut,
  increasePrecision,
  decreasePrecision,
  getPrecision,
} from '../../app/orderBookSlice';
import './OrderBook.scss';
import { OrderTable } from '../orderTable/OrderTable';

export function OrderBook() {
  const dispatch = useDispatch();
  const orderbids = useSelector(selectOrderBid);
  const orderasks = useSelector(selectOrderAsk);
  const precision = useSelector(getPrecision);
  
  return (
  <div className="container">
  <div className="book_header">
      <div><span className="book_title">Order Book</span> <span className="show50"><span className="">BTC<span className="show-soft">/USD </span> </span></span></div>
      <div>
        {(precision!=4)?<div className="icon" onClick={()=>{ dispatch(decreasePrecision())}}><FontAwesomeIcon icon={faMinus} /></div>:<div className="icon disabled"><FontAwesomeIcon icon={faMinus} /></div>}
        {precision?<div className="icon" onClick={()=>{ dispatch(increasePrecision())}}><FontAwesomeIcon icon={faPlus} /></div>:<div className="icon disabled"><FontAwesomeIcon icon={faPlus} /></div>}
        <div className="icon"><FontAwesomeIcon icon={faBell} /></div>
        <div className="icon"><Modal /></div>
        <div className="icon" onClick={()=>{ dispatch(zoomOut())}}><FontAwesomeIcon icon={faSearchMinus} /></div>
        <div className="icon" onClick={()=>{ dispatch(zoomIn())}}><FontAwesomeIcon icon={faSearchPlus} /></div>
      </div>
  </div>
  <div className="book_main">
 
 { orderasks && <OrderTable type="book_asks" data={orderasks} /> }
 { orderbids && <OrderTable type="book_bids" data={orderbids} /> }
    </div>
      
 
</div>
  );
}
