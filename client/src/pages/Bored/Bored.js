import React, { Component } from 'react';
import withAuth from '../../components/withAuth';
import API from '../../utils/API';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import './style.css';
import Modal from '../../components/Modal'
import Video from '../../components/Video'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

class Bored extends Component {
    handleOnClickButton = e => {
        e.preventDefault();

        API.spotify("bored")
            .then(res => {
                console.log(res.data);
            })
            .catch(err => console.log(err));
    };

    handleCloseModal() {
        this.setState({ showModal: false });
        console.log("YES!!!");
    }


    render() {
        const styles = {
            jumbotron: {
                backgroundColor: '#f0506e',
                background: '#f0506e'
            }
        };

        return (
            <div>
                {/* <Jumbotron
                    style={styles.jumbotron}
                >
                    <h1>Bored</h1>
                </Jumbotron> */}

                <Modal
                    style={customStyles}
                    contentLabel="Camera"
                    handleCloseModal={this.handleCloseModal}

                >
                    <Video
                        searchTerm="One and Only Adele"
                        numberOfResults="1"
                    >
                        
                    </Video>
                </Modal>

                <button onClick={this.handleOnClickButton}>get music list</button>


                <Link to="/">Go home</Link>
            </div>
        );
    }
}

export default withAuth(Bored);