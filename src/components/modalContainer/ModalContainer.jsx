import React from "react";
import Modal from "react-modal";
import { useState } from "react";
import "./ModalContainer.css";

const ModalContainer = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        ariaHideApp={false}
        className="DraftCourses-delete-course-modal"
        // overlayClassName="Overlay"
        parentSelector={() => document.querySelector("#root")}
      >
        <div className="DraftCourses-delete-course-modal-content">
          <div className="DraftCourses-deleteCourse">Delete Chapter</div>
          <div className="DraftCourses-deleteContent">
            Are you sure you want to delete the chapter
          </div>
          <div className="DraftCourses-buttons">
            <button onClick={closeModal} className="DraftCourses-cancel">
              Cancel
            </button>

            <button
              className="DraftCourses-delete"
              onClick={(e) => {
                e.stopPropagation();
                // deleteChapter(props.items, props.id1);
                closeModal();
              }}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalContainer;
