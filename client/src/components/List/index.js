import React from "react";

function List(props) {

    return (
            <ul className="list-group list-group-flush stocklist">
                <li className="list-group-item"><strong>LatestSource:{props.latestSource}</strong>&nbsp;&nbsp; <span className="text-primary">LatestPrice:{props.latestPrice}</span></li>
                <li className="list-group-item week52high"><strong>Week 52 High:</strong>&nbsp;&nbsp;<span className="text-success">{props.week52High}</span></li>
                <li className="list-group-item week52low"><strong>Week 52 Low:</strong>&nbsp;&nbsp;<span className="text-danger">{props.week52Low}</span></li>
                <li className="list-group-item exchange"><strong>Exchange:</strong> {props.primaryExchange}</li>
            </ul>
        
    );
}

export default List;