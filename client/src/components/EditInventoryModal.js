import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";

export default function EditInventoryModal(props) {
  let { getInventory, selected, ...rest } = props;
  const [tool, setTool] = useState(selected);

  const handleCancel = () => {
    setTool(selected);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        `http://localhost:5000/inventory/update/${tool._id}`,
        tool,
        { withCredentials: true }
      );
      getInventory();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/inventory/delete/${tool._id}`,
        { withCredentials: true }
      );
      getInventory();
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTool(selected);
  }, [selected]);

  return (
    <Modal
      {...rest}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Edit Tool Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Tool</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='text'
            value={tool.tool_number}
            onChange={(e) => setTool({ ...tool, tool_number: e.target.value })}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Location</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            type='text'
            value={tool.location.shelf}
            onChange={(e) =>
              setTool({
                ...tool,
                location: {
                  ...tool.location,
                  shelf: e.target.value,
                },
              })
            }
          />
          <FormControl
            type='text'
            value={tool.location.bin}
            onChange={(e) =>
              setTool({
                ...tool,
                location: {
                  ...tool.location,
                  bin: e.target.value,
                },
              })
            }
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Text>Description</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as='textarea'
            value={tool.description || ""}
            onChange={(e) => setTool({ ...tool, description: e.target.value })}
          />
        </InputGroup>

        <InputGroup className='mb-3'>
          <InputGroup.Prepend>
            <InputGroup.Checkbox
              value={tool.status.checked_out}
              checked={tool.status.checked_out}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: {
                    ...tool.status,
                    checked_out: !tool.status.checked_out,
                  },
                })
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label='Text input with checkbox'
            value='Checked Out'
            readOnly={true}
          />

          <InputGroup.Prepend>
            <InputGroup.Checkbox
              checked={tool.status.missing || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, missing: !tool.status.missing },
                })
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label='Text input with checkbox'
            value='Missing'
            readOnly={true}
          />

          <InputGroup.Prepend>
            <InputGroup.Checkbox
              checked={tool.status.damaged || false}
              onChange={(e) =>
                setTool({
                  ...tool,
                  status: { ...tool.status, damaged: !tool.status.damaged },
                })
              }
            />
          </InputGroup.Prepend>
          <FormControl
            aria-label='Text input with checkbox'
            value='Damaged'
            readOnly={true}
          />
        </InputGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-primary'
          onClick={() => {
            props.onHide();
            handleSubmit();
          }}>
          Submit
        </Button>
        <Button
          variant='outline-danger'
          onClick={() => {
            props.onHide();
            handleDelete();
          }}>
          Delete
        </Button>
        <Button
          variant='outline-dark'
          onClick={() => {
            props.onHide();
            handleCancel();
          }}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
