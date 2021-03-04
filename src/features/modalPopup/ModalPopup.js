import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';

import './ModalPopup.scss'
import { updateDepthViz, updateColOrder, updateView, getColOrder, getTableView, getDepthViz } from '../../app/orderBookSlice';
const Modal = (props) => {

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
      trigger={ <FontAwesomeIcon icon={(props.show==="settings")?faCog:faBell} />}
      modal
      nested
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"><h3>Interface settings for order book</h3></div>
          
         {(props.show==="settings")?<div className="content">
<div class="content_section">
   <div class="block_sec interface-setting-orderbook__title">Book Depth Visualization:</div>
   
      <div onChange={handleDepth}>
      <div><input type="radio" value="cumulative" name="depthViz" checked={isCumulative} /> Cumulative (Default)
      </div><div><input type="radio" value="amount" name="depthViz" checked={!isCumulative}/> Amount
      </div></div>
    
   
</div>
<div>
   <div class="content_section">
      <div class="block_sec">Choose the order of the columns in the order book:</div>
      <div>
      <div onChange={handleColOrder}>
        <div><input type="radio" value="cpat" name="colOrder"  checked={colOrder==='cpat'}/> <span class="row-ask">Count Price Amount Total</span> <span class="row-bid">Total Amount Price Count</span>
        </div><div><input type="radio" value="catp" name="colOrder"  checked={colOrder==='catp'}/>  <span class="row-ask">Count Amount Total Price</span> <span class="row-bid">Price Total Amount Count</span>
        </div><div><input type="radio" value="ctpa" name="colOrder"  checked={colOrder==='ctpa'}/>  <span class="row-ask">Count Total Price Amount</span> <span class="row-bid">Amount Price Total Count</span>
      </div>
      </div>
      </div>
   </div>
</div>
<div class="content_section">
   <div class=" block_sec interface-setting-orderbook__title">Book Amount and Total format numbers:</div>
   <div onChange={handleTableView}>
   <div><input type="radio" value="compact" name="tableView" checked={!tableView}/> Compact
   </div><div><input type="radio" value="normal" name="tableView" checked={tableView}/> Normal
   </div></div>
   
</div>
          </div>:<div className="content">
          <p>Receive a notification in your browser, desktop, and/or mobile device</p>

<p>You can quickly set price alerts by clicking directly in the order book. When you hover over a row in the order book on the Trading page, a bell icon will apear at the outer edge of the row. Click the bell icon to toggle a price alert at that price point.</p>

<p>Play an audio cue when Price Alerts are triggered

</p>
         
        </div>
}
</div>
      )}
    </Popup>
);
            }
export default Modal;