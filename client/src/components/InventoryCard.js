import React, { useState } from "react";
import { Card, Accordion, Button, Spinner } from "react-bootstrap";
import { ReactComponent as ExpandDown } from "../img/expand-down.svg";

const InventoryItem = ({
  currentItems,
  checkOutItem,
  currentUser,
  loading,
}) => {
  const [disabled, setDisabled] = useState(false);
  return (
    <Accordion className='result-accordion'>
      {currentItems.map((item) => (
        <Card key={item._id}>
          <Card.Header className='result-header'>
            {item.tool_number}
            <Accordion.Toggle as={Button} variant='text' eventKey={item._id}>
              <ExpandDown />
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={item._id}>
            <div className='more-info'>
              {item.description ? (
                <Card.Body>{item.description}</Card.Body>
              ) : null}
              <Card.Body>
                Location: {item.location.bin} - {item.location.shelf}
              </Card.Body>
              <Button
                disabled={disabled}
                className='card-btn'
                variant='outline-primary'
                onClick={() => {
                  setDisabled(true);
                  checkOutItem(item);
                }}>
                Check Out
              </Button>
              <Button variant='outline-danger' className='card-btn'>
                Report Damage
              </Button>
              <Button
                className='card-btn'
                variant='outline-secondary'
                onClick={() => {
                  setDisabled(true);
                  checkOutItem(item);
                }}>
                Edit
              </Button>
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default InventoryItem;
