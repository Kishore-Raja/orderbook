import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faSearchPlus, faSearchMinus, faCog, faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Radio, RadioGroup } from "@chakra-ui/react"
import './ModalPopup.scss'
import { updateDepthViz, updateColOrder, updateView, getColOrder, getTableView, getDepthViz } from '../../app/orderBookSlice';
export default () => {
    const dispatch = useDispatch();
    const colOrder = useSelector(getColOrder);
  const tableView = useSelector(getTableView);
  const isCumulative = useSelector(getDepthViz);

    function handleDepth(e,m){
       let selectedValue = e.target.value;
        dispatch(updateDepthViz(selectedValue));
    }
    function handleColOrder(e,m){
      let selectedValue = e.target.value;
       dispatch(updateColOrder(selectedValue));
   }
   function handleTableView(e,m){
    let selectedValue = e.target.value;
     dispatch(updateView(selectedValue));
 }
    return (
        

    <Popup
      trigger={ <FontAwesomeIcon icon={faCog} />}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header">Interface settings for order book </div>
          <div className="content">
          <div class="collapsible-content__body-wrapper ui-modaldialog__drawer-wrapper collapsed">
   <div class="collapsible-content__body collapsed"></div>
</div>
<div class="interface-setting-orderbook__section">
   <div class="interface-setting-orderbook__title">Book Depth Visualization:</div>
   
      <div onChange={handleDepth}>
      <div><input type="radio" value="cumulative" name="depthViz" checked={isCumulative} /> Cumulative (Default)
      </div><div><input type="radio" value="amount" name="depthViz" checked={!isCumulative}/> Amount
      </div></div>
    
   
</div>
<div>
   <div class="interface-setting-orderbook__section">
      <div class="interface-setting-orderbook__title">Choose the order of the columns in the order book:</div>
      <div>
      <div onChange={handleColOrder}>
        <div><input type="radio" value="cpat" name="colOrder"  checked={colOrder==='cpat'}/> <span class="interface-setting-orderbook__row--ask">Count Price Amount Total</span> <span class="interface-setting-orderbook__row--bid">Total Amount Price Count</span>
        </div><div><input type="radio" value="catp" name="colOrder"  checked={colOrder==='catp'}/>  <span class="interface-setting-orderbook__row--ask">Count Amount Total Price</span> <span class="interface-setting-orderbook__row--bid">Price Total Amount Count</span>
        </div><div><input type="radio" value="ctpa" name="colOrder"  checked={colOrder==='ctpa'}/>  <span class="interface-setting-orderbook__row--ask">Count Total Price Amount</span> <span class="interface-setting-orderbook__row--bid">Amount Price Total Count</span>
      </div>
      </div>
      </div>
   </div>
</div>
<div class="interface-setting-orderbook__section">
   <div class="interface-setting-orderbook__title">Book Amount and Total format numbers:</div>
   <div onChange={handleTableView}>
   <div><input type="radio" value="compact" name="tableView" checked={!tableView}/> Compact
   </div><div><input type="radio" value="normal" name="tableView" checked={tableView}/> Normal
   </div></div>
   
</div>
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            >
              <span>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                magni omnis delectus nemo, maxime molestiae dolorem numquam
                mollitia, voluptate ea, accusamus excepturi deleniti ratione
                sapiente! Laudantium, aperiam doloribus. Odit, aut.
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
);
            }