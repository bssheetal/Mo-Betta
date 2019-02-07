import React, { Component } from "react";
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root');

class Modal extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        };

        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);
    }

    handleOpenModal() {
        this.setState({ showModal: true });
    }

    handleCloseModal() {
        this.setState({ showModal: false });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleOpenModal}>Trigger Modal</button>
                <ReactModal
                    isOpen={this.state.showModal}
                    shouldCloseOnEsc={true}
                    contentLabel={this.props.contentLabel}
                    style={this.props.style}
                >
                    {this.props.children}
                    <button onClick={this.props.handleCloseModal}>Capture Image</button>
                </ReactModal>
            </div>
        );
    }
}

export default Modal;