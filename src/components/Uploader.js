import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { firebaseConnect, dataToJS, getFirebase } from 'react-redux-firebase';
import { map } from 'lodash';
import Dropzone from 'react-dropzone';


// Path within Database for metadata (also used for file Storage path)
const filesPath = 'uploadedFiles';

class Uploader extends Component {

  onFilesDrop(files) {
      const firebase = getFirebase();
    // Uploads files and push's objects containing metadata to database at dbPath
    // uploadFiles(storagePath, files, dbPath)
    firebase.uploadFiles(filesPath + Date.now(), files, filesPath);
}

  onFileDelete(file, key) {
      const firebase = getFirebase();
    // Deletes file and removes metadata from database
    // deleteFile(storagePath, dbPath)
    firebase.deleteFile(file.fullPath, `${filesPath}/${key}`);
  }

  render() {
    const { uploadedFiles } = this.props
    return (
      <div>
        <Dropzone onDrop={this.onFilesDrop}>
          <div>
            Drag and drop files here
            or click to select
          </div>
        </Dropzone>
        {
          uploadedFiles &&
            <div>
              <h3>
                Uploaded file(s):
              </h3>
              {
                map(uploadedFiles, (file, key) => (
                  <div key={file.name + key}>
                    <img style={{ width: '80px'}} src={file.src} />
                    <button onClick={() => this.onFileDelete(file, key)}>
                      Delete File
                    </button>
                  </div>
                ))
              }
            </div>
          }
      </div>
    );
  }
}

Uploader.propTypes = {
    firebase: PropTypes.object.isRequired,
    uploadedFiles: PropTypes.object
};

export default compose(
  firebaseConnect([
    filesPath
  ]),
  connect(
    ({ firebase }) => ({
      uploadedFiles: dataToJS(firebase, filesPath)
    })
  )
)(Uploader);
