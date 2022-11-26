import React from "react";

const ConfirmationModal = ({
    title,
    message,
    successButtonName,
    modalData,
    successAction,
    closeModal
}) => {
    return (
        <div>
            {/* The button to open modal */}

            {/* Put this part before </body> tag */}
            <input
                type="checkbox"
                id="confirmation-modal"
                className="modal-toggle"
            />
            <div className="modal">
                <div className="modal-box relative">
                    <h3 className="text-lg font-bold">{title}</h3>
                    <p className="py-4">{message}</p>
                    <div className="modal-action">
                        <label
                            onClick={() => successAction(modalData)}
                            htmlFor="confirmation-modal"
                            className="btn"
                        >
                            {successButtonName}
                        </label>
                        <label
                        onClick={closeModal}
                            htmlFor="confirmation-modal"
                            className="btn btn-outline"
                        >
                            Cancel
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
