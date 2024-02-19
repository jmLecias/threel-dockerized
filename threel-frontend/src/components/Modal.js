import React from "react";

const Modal = ({ title, isOpen, onToggle, onAccept }) => {

    return (
        <>
            {true && (
                <div className="modal">
                    <div className="modal-overlay">
                        <h2>{title}</h2>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident
                            perferendis suscipit officia recusandae, eveniet quaerat assumenda
                            id fugit, dignissimos maxime non natus placeat illo iusto!
                            Sapiente dolorum id maiores dolores? Illum pariatur possimus
                            quaerat ipsum quos molestiae rem aspernatur dicta tenetur. Sunt
                            placeat tempora vitae enim incidunt porro fuga ea.
                        </p>
                        <button className="modal-button" onClick={() => onAccept}>
                            ACCEPT
                        </button>
                        <button className="modal-button" onClick={() => onToggle}>
                            CLOSE
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;