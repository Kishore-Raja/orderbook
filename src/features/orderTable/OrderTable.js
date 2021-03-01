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

   return (
        <div id="book-bids" className={`book_bids_asks ${type}`}>
            <div className="book_header">
                      <div className="col center">Count</div>
                      <div className="col">Amount</div>
                      <div className="col">Total</div>
                      <div className="col">Price</div>
                </div>
                <div className="book_bars"> 
                    {chartData && chartData.length && <BarChart chartData={chartData} chartDataLabel={chartDataLabel} />}
                </div>
                <div className="book_rows">
                    {channelData.map(item => {
                        let total = (item.total * 100)/7;
                        let totalPer = `${total}%`;
                    
        return <div className="book_row" data-progress={item.total} >
           
            <div className="col center"><span className=" ">{item.count}</span></div>
            <div className="col"><span className=" ">{item.amount}</span></div>
            <div className="col"><span className=" ">{item.total}</span></div>
            <div className="col"><span className=" ">{item.price}</span></div>
        </div>
                    }
       )}
                </div>
                
              </div>
                
  );
}
