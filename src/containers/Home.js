import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import CircularProgress from 'material-ui/CircularProgress';
import { compose } from 'redux';
import {
   firebaseConnect,
   isLoaded,
   pathToJS,
   dataToJS,
   isEmpty,
   getFirebase
 } from 'react-redux-firebase';
 import PropTypes from 'prop-types';
 import UploadItem from '../components/UploadItem';
 import Gallery from 'react-grid-gallery';


class Home extends Component {

    render() {
        const { uploadedFiles } = this.props;
        return (
            <div className="container">
            {uploadedFiles &&
                <Gallery images={ Object.values(uploadedFiles)} />
            }
            </div>
        );
    }
}

Home.propTypes = {
    firebase: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
};

export default compose(
  firebaseConnect([
    'uploadedFiles'
  ]),
  connect(
    ({ firebase }) => ({
      uploadedFiles: dataToJS(firebase, 'uploadedFiles')
    })
  )
)(Home);
