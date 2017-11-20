import React, { Component } from 'react';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import { compose } from 'redux';
import { firebaseConnect, dataToJS, isLoaded } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Gallery from 'react-grid-gallery';
import CircularProgress from 'material-ui/CircularProgress';


class Home extends Component {
    checkFiles() {
        const { uploadedFiles } = this.props;

        if (uploadedFiles) {
            return (<div style={{ margin: '30px 0' }}>
                        <Gallery images={Object.values(uploadedFiles)} />
                    </div>);
        }
            return (<h1 className="text-center">Gallery is empty</h1>);
    }
    render() {
        const { uploadedFiles } = this.props;
        return (
            <div style={{ padding: '50px 0' }}>
                <div className="row">
                    <div className="col-md-6">
                        <h2>Photo Gallery</h2>
                    </div>
                    <div className="col-md-6">
                        <RaisedButton
                            label="Add or Delete Images"
                            style={{ float: 'right' }}
                            onClick={() => { browserHistory.push('/modify_gallery'); }}
                        />
                    </div>
                </div>
            {
                (!isLoaded(uploadedFiles))
                    ?
                (<div className="load"> <CircularProgress size={80} thickness={5} /></div>)
                    :
                (this.checkFiles())
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
