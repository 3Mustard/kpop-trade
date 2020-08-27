import React from 'react';
import { connect } from 'react-redux';
import { setAppComponent } from '../../actions';

class Navigation extends React.Component {
  render(){
    return (
      <div>navigation</div>
    )
  }
}

export default connect(
  null, 
  { setAppComponent }
)(Navigation);
