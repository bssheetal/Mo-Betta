import React from "react";

function List(props) {

    return (
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>latestSource:{props.latestSource}</strong> <span className="text-primary">latestPrice:{props.latestPrice}</span></li>
                <li className="list-group-item"><strong>Week 52 High</strong> <span className="text-success">{props.week52High}</span></li>
                <li className="list-group-item"><strong>Week 52 Low</strong> <span className="text-danger">{props.week52Low}</span></li>
                <li className="list-group-item"><strong>Exchange</strong> {props.primaryExchange}</li>
            </ul>
        
    );
}

export default List;