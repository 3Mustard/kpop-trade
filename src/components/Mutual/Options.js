import React from 'react';
import { connect } from 'react-redux';
import { setAppComponent } from '../../actions';

class Options extends React.Component {
  render(){
    return (
      <div>options</div>
    )
  }
}

export default connect(
  null, 
  { setAppComponent }
)(Options);
