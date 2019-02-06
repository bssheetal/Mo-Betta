import React from "react";
import Thumbnail from "../Thumbnail";
import { Container, Row, Col } from "../Grid";

export function NewsList({ children }) {
    return <ul className="list-group">{children}</ul>;
  }
  
  // RecipeListItem renders a bootstrap list item containing data from the recipe api call
  export function NewsListItem(props) {
    return (
      <li className="list-group-item">
        <Container>
          <Row>
            <Col size="xs-4 sm-2">
              <Thumbnail src={props.thumbnail} />
            </Col>
            <Col size="xs-8 sm-9">             
              <a rel="noreferrer noopener" target="_blank" href={props.href}>
              <h4>{props.title}</h4>
              </a>
              <p classname="source">Source:USA Today</p>
            </Col>
          </Row>
        </Container>
      </li>
    );
  }