import React from 'react';

//the canvas component
export default class ImageCanvas extends React.Component {

  render() {
    return (<p> Nothing: {this.props.sorted?"Colors are sorted":"Colors are unsorted"}</p>);
  }
}