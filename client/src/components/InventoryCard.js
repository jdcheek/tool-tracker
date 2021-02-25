import React from "react";

import { Card, Accordion, Button } from "react-bootstrap";
import { ReactComponent as ExpandDown } from "../img/expand-down.svg";

const InventoryItem = ({
  currentItems,
  checkOutItem,
  currentUser,
  loading,
}) => {
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
                {item.status.checked_out &&
                  `Checked out to ${item.status.username}`}
              </Card.Body>
              <Button
                disabled={item.status.checked_out}
                className='card-btn'
                variant='outline-primary'
                onClick={() => {
                  checkOutItem(item);
                }}>
                Check Out
              </Button>
              <Button
                variant='outline-danger'
                className='card-btn'
                onClick={() => {
                  console.log(`report missing tool ${item.tool_number}`);
                }}>
                Report Missing
              </Button>
              {currentUser.isAdmin && (
                <Button
                  className='card-btn'
                  variant='outline-secondary'
                  onClick={() => {
                    console.log(`edit tool ${item.tool_number}`);
                  }}>
                  Edit
                </Button>
              )}
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default InventoryItem;
