import React, { useState } from 'react';

export function OrderTable(props) {
    const { type, data } = props;
    let channelData = data && data.channelData || [];
    console.log(channelData);
    let chartData = [], chartDataLabel =[];
    channelData.map((item,index)=>{
        chartDataLabel.push(`item_${index+1}`)
        chartData.push(item.amount);
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

   return (
        <div id="book-bids" className={`book_bids_asks ${type}`}>
            <div className="book_header">
                      <div className="col center"></div>
                      <div className="col center">Count</div>
                      <div className="col">Amount</div>
                      <div className="col">Total</div>
                      <div className="col">Price</div>
                </div>
                <div className="book_rows">
                    {newData.map((item,index) => {
                        let total = getTotal(item.amount)
                        let totalPer = `${total*2}%`;
                    
        return (type=="book_bids")?<div keys={`row_${index}`} className="book_row" data-progress={item.total} >
            <div className="progress">
                <div className="bar" style={{width:totalPer}}></div>
                <div className="col alert"><span >&nbsp;</span></div>
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
                <div className="col alert"><span>&nbsp;</span></div>
            </div>
        </div>
                    }
       )}
                </div>
                
              </div>
                
  );
}
