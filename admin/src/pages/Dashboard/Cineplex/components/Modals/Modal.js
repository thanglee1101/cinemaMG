import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillPlusSquareFill } from 'react-icons/bs';
import FormAddEdit from '../Forms/FormAddEdit';

function ModalForm(props) {
  const [show, setShow] = useState(props.isShow);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const buutonAdd = (
    <Button className="button-add" onClick={handleShow}>
      <BsFillPlusSquareFill className="button-icon" />
      Thêm rạp chiếu phim
    </Button>
  );

  return (
    <>
      {props.method === 'add' ? buutonAdd : ''}

      <Modal size="lg" show={show} backdrop="static" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormAddEdit handleClose={handleClose} data={props.data} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button form="form-add-edit" className="button-add" type="submit">
            {props.method === 'add' ? 'Thêm' : 'Sửa'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalForm;
