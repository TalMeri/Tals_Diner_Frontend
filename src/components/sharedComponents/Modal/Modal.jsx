import "./Modal.css";
import React from "react";


const Modal = ({ content, displaym, closeModal}) => {
  return (
    <div id="myModal" class="modal" style={{display: displaym? "block" : "none"}}>
      <div class="modal-content">
        <span class="close" onClick={closeModal}>&times;</span>
        {content}
      </div>
    </div>
  );
};

export default Modal;
