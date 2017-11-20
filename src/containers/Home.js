import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { compose } from 'redux';
import { firebaseConnect, dataToJS } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';


class Home extends Component {

    render() {
        const { uploadedFiles } = this.props;
        return (
            <div>
            <div className="col-md-6">
                <h2 style={{ margin: '30px' }}>Photo Gallery</h2>
            </div>
            <div className="col-md-6">
                <RaisedButton
                    label="Add or Delete Images"
                    style={{ margin: '30px', float: 'right' }}
                    onClick={() => { browserHistory.push('/modify_gallery'); }}
                />
            </div>
            {
                (uploadedFiles)?(
                <div>
                    {uploadedFiles &&
                        <Gallery images={Object.values(uploadedFiles)} />
                    }
                </div>
            ):(<h1 className="text-center">Gallery is empty</h1>)
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
