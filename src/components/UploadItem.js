import React, { Component } from 'react';
import Gallery from 'react-grid-gallery';


export default class UploadItem extends Component {
  render() {
      const { items } = this.props;
        return (
            <Gallery images={items} />
      );
  }
}
