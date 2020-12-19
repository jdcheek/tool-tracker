import React from "react";
import { Card, Accordion, Button } from "react-bootstrap";

const InventoryItem = ({
  currentItems,
  checkOutItem,
  currentUser,
  loading,
}) => {
  return loading ? (
    <p>Loading...</p>
  ) : (
    <Accordion>
      {currentItems.map((item) => (
        <Card key={item._id}>
          <Card.Header>
            <Accordion.Toggle as={Button} variant='link' eventKey={item._id}>
              {item.tool_number}
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey={item._id}>
            <div>
              <Card.Body>{item.description}</Card.Body>
              <Card.Body>
                {item.location.bin} - {item.location.shelf}
              </Card.Body>
              <Button
                variant='dark'
                onClick={() => {
                  checkOutItem(item);
                }}>
                Check Out
              </Button>
              <Button variant='danger' href='#'>
                Report Damage
              </Button>
            </div>
          </Accordion.Collapse>
        </Card>
      ))}
    </Accordion>
  );
};

export default InventoryItem;
