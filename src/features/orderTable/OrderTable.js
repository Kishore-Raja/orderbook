import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BarChart from '../barChart/BarChart'
import './OrderTable.scss';

export function OrderTable(props) {
    const { type, data } = props;
    let channelData = data && data.channelData || [];

    const [tableData, setTableData] = useState('2');
    //setTableData(channelData);
    // <div className="progress" style={{'--value': totalPer}}></div>
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

    

    let totAmount = channelData.reduce((total, obj) => obj.amount + total,0)

   return (
        <div id="book-bids" className={`book_bids_asks ${type}`}>
            <div className="book_header">
                      <div className="col center">Count</div>
                      <div className="col">Amount</div>
                      <div className="col">Total</div>
                      <div className="col">Price</div>
                </div>
              {/*  <div className="book_bars"> 
                    {chartData && chartData.length && <BarChart chartData={chartData} chartDataLabel={chartDataLabel} />}
   </div> */ }
                <div className="book_rows">
                    {channelData.map((item,index) => {
                        let total = getTotal(item.amount)
                        let totalPer = `${total}%`;
                    
        return <div keys={`row_${index}`} className="book_row" data-progress={item.total} >
            <div className="progress">
                <div className="bar" style={{width:totalPer}}></div>
                <div className="col center"><span className=" ">{item.count}</span></div>
                <div className="col"><span className=" ">{item.amount}</span></div>
                <div className="col"><span className=" ">{total}</span></div>
                <div className="col"><span className=" ">{item.price}</span></div>
            </div>
            
        </div>
                    }
       )}
                </div>
                
              </div>
                
  );
}
