/* 
    Project: REACT Demo for Education Horizons Group
    Sprint: 1
    Task: 1
    Author: Vineet W. Singh 
    Start Date: 22/4/21
    Date of last edit: 23/4/2021
    Date of last review:
*/
import React from 'react';

//the canvas component
export default class ImageCanvas extends React.Component {
  render(){
    return(
      <Canvas imageData={this.props.imageData}/>
    );
  }
}

class Canvas extends React.Component {
  constructor(){
    super();
    this.imgCanvas = React.createRef();
    this.drawCanvas = this.drawCanvas.bind(this);
  }

  drawCanvas(){
    //get properties from parent
    const cellHeight=2;
    const cellWidth=4;
    //get image colors
    const imageMatrixRows = this.props.imageData;
    const imageCanvas = this.imgCanvas.current;
    //set canvas width & height
    imageCanvas.width=cellWidth*128;
    imageCanvas.height=cellHeight*256;
    imageCanvas.style.width=`${cellWidth*128}px`;
    imageCanvas.style.height=`${cellHeight*256}px`;
    imageCanvas.style.padding=`10px`;
    imageCanvas.style.margin=`10px`;
    imageCanvas.style.border=`solid 2px black`;
    //get canvas context
    const canvasCont = imageCanvas.getContext("2d");
        canvasCont.clearRect(0,0,imageCanvas.width,imageCanvas.height);
    //reset y co-ordinate
    let cellY=0,rowCtr=0;
    //process all data 
    imageMatrixRows.forEach(cells=>{
        //for a new row reset the X value to 0, cell counter to 0
        let cellX=0, cellCtr=0;
        //calculate y co-ordinate
        cellY=cellHeight*rowCtr;
        //process for all cells in the row
        cells.forEach(cell=>{
            //calculate x co-ordinate value
            cellX=cellWidth*cellCtr;
            //set canvas contents
            canvasCont.fillStyle=cell;
            canvasCont.fillRect(cellX,cellY,cellWidth,cellHeight);
            canvasCont.save();
            //add one to cellCtr
            cellCtr++;
        });
        canvasCont.save();
        rowCtr++;
        console.log("rendering");
    });
  }

  componentDidUpdate(){
    this.drawCanvas();
  }

  componentDidMount() {
    this.drawCanvas();
  }  

  render() {
    return(
      <div>
        <canvas ref={this.imgCanvas}/>
      </div>
    );
  }
}
