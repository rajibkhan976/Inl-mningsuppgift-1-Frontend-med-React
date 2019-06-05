import React, { Component } from 'react';

class DashboardComponent extends Component {

  constructor (props) {
    super (props);
    this.state = {
      students: [],
      error: null
    };
  }

  componentDidMount () {
    fetch("http://localhost:5000/students", {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((studentList) => {
      this.setState({
        students: studentList
      })
    })
    .catch((err) => {
      this.setState({
        error: err
      })
    })
  }

  render () {
    console.log(this.state.students);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Bong-bong</h2>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
