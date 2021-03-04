import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch} from '@fortawesome/free-solid-svg-icons';
import { getZoomLevel,getDepthViz, getColOrder, getTableView, getFetchCompleteStatus } from '../../app/orderBookSlice';
import { useSelector } from 'react-redux';
import Modal from '../modalPopup/ModalPopup';

export function OrderTable(props) {
    const { type, data } = props;
    const zoomLevel = useSelector(getZoomLevel);
    const colOrder = useSelector(getColOrder);
  const tableView = useSelector(getTableView);
  const isCumulative = useSelector(getDepthViz);
  const fetchComplete = useSelector(getFetchCompleteStatus);
    let channelData =(data && data.channelData) || [];
    let chartData = [], chartDataLabel =[];
    channelData.map((item,index)=>{
        chartDataLabel.push(`item_${index+1}`)
        chartData.push(item.amount);
        return true;
    })

    let totalUp = function(){
        let count = 0;
        return function(val){
            count=count+val;
            return count;
        }
    }

    let getTotal = totalUp();
    

    
    let newData = channelData.slice(0,25)
    //console.log("newData",newData);
   return (
        <div id="book-bids" className={`book_bids_asks ${type}`}>
                { (colOrder==="catp")?<div className="book_header">
                      <div className="col center"></div>
                      <div className="col center">Count</div>
                      <div className="col">Amount</div>
                      <div className="col">Total</div>
                      <div className="col">Price</div>
                </div>:(colOrder==="ctpa")?<div className="book_header">
                      <div className="col center"></div>
                      <div className="col center">Count</div>
                      <div className="col">Total</div>
                      <div className="col">Price</div>
                      <div className="col">Amount</div>
                      
                      
                </div>:(colOrder==="cpat")?<div className="book_header">
                      <div className="col center"></div>
                      <div className="col center">Count</div>
                      <div className="col">Price</div>
                      <div className="col">Amount</div>
                      <div className="col">Total</div>
                      
                </div>:""
                }
                { !fetchComplete && <div className="loader"><FontAwesomeIcon icon={faCircleNotch} spin /> <span>Loading</span></div>}
                { fetchComplete && <div className="book_rows">
                   
                    {newData.map((item,index) => {
                        let total = getTotal(item.amount)
                        let totalPer = isCumulative?`${total*zoomLevel}%`:`${item.amount*zoomLevel}%`;
                        let retElm;
                        
                        //console.log("item",item)
                        if(colOrder==="catp"){

                        retElm = (type==="book_asks")?<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                            <div className="progress">
                                <div className="bar" style={{width:totalPer}}></div>
                                <div className="col"><span className="icon"><Modal show="alert"/></span></div>
                                <div className="col center"><span >{item.count}</span></div>
                                <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                                <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                                <div className="col"><span >{item.price}</span></div>
                            </div>
                        </div>:<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                            <div className="progress">
                                <div className="bar" style={{width:totalPer}}></div>
                                <div className="col"><span >{item.price}</span></div>
                                <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                                <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                                <div className="col center"><span >{item.count}</span></div>
                                <div className="col left"><span className="icon"><Modal show="alert"/></span></div>
                            </div>
                        </div>
                    } else if(colOrder === "cpat"){
                        retElm = (type==="book_asks")?<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                        <div className="progress">
                            <div className="bar" style={{width:totalPer}}></div>
                            <div className="col"><span className="icon"><Modal show="alert"/></span></div>
                            <div className="col center"><span >{item.count}</span></div>
                            <div className="col"><span >{item.price}</span></div>
                            <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                            <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                           
                        </div>
                    </div>:<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                        <div className="progress">
                            <div className="bar" style={{width:totalPer}}></div>
                            <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                            <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                            <div className="col"><span >{item.price}</span></div>
                            <div className="col center"><span >{item.count}</span></div>
                            <div className="col left"><span className="icon"><Modal show="alert"/></span></div>
                        </div>
                    </div>

                    } else if(colOrder === "ctpa") {
                        retElm = (type==="book_asks")?<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                        <div className="progress">
                            <div className="bar" style={{width:totalPer}}></div>
                            <div className="col"><span className="icon"><Modal show="alert"/></span></div>
                            <div className="col center"><span >{item.count}</span></div>
                            <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                            <div className="col"><span >{item.price}</span></div>
                            <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                            
                        </div>
                    </div>:<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
                        <div className="progress">
                            <div className="bar" style={{width:totalPer}}></div>
                            <div className="col"><span >{(item.amount>-0.09 && item.amount<0.09)?item.amount.toFixed(4):item.amount.toPrecision(4)}</span></div>
                            <div className="col"><span >{item.price}</span></div>
                            <div className="col"><span >{(total>-0.09 && total<0.09)?total.toFixed(4):total.toPrecision(4)}</span></div>
                            <div className="col center"><span >{item.count}</span></div>
                            <div className="col left"><span className="icon"><Modal show="alert"/></span></div>
                        </div>
                    </div>

                    }
                   return retElm;
                 }
       )}
                </div>
                }
                
              </div>
                
  );
}
