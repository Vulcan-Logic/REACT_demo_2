import React from 'react';
import ImageCanvas from './imageCanvas';

//the select control 
class SelectForm extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
    }
    
    //function to store change of sorted value - store it in the parent class
    handleChange(event){
      this.props.changeSorted(event.target.value==="false"?false:true);
    }
    
    //render control
    render() {
      return (
        <form>
          <label>
            COLORS :
            <select value={this.props.sorted?"true":"false"} onChange={this.handleChange}>            
              <option value="true">SORTED</option>
              <option value="false">UNSORTED</option>
            </select>
          </label>
        </form>
      );
    }
}

//parent class that hosts the select control and the canvas 
export default class MainSection extends React.Component {
  constructor(props){
    super(props);
    this.state = 
    {
      sorted:true,
      imageMatData:null
    }
  }  

  changeSorted(sorted){
    //rerun compute matrix
    this.setState({sorted:sorted});
  }

  render() {
    return(
      <div> 
        <SelectForm sorted={this.state.sorted} changeSorted={this.changeSorted.bind(this)}/>
        <ImageCanvas sorted={this.state.sorted}/>
      </div>
    );
  }
}
