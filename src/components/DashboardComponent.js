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
    this.getStudents();
  }

  getStudents = (e) => {
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

  deleteStudentById = (studentId, e) => {
    fetch("http://localhost:5000/student/" + studentId, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      alert('Student deleted successfully!');
      this.getStudents();
    }).catch((err) => {
      console.log(err);
    })
  }

  handleId = (e) => {
    this.studentId = e.target.value;
  }

  handleName = (e) => {
    this.studentName = e.target.value;
  }

  handleEmail = (e) => {
    this.studentEmail = e.target.value;
  }

  handleRoad = (e) => {
    this.studentRoad = e.target.value;
  }

  handleZipcode = (e) => {
    this.studentZipcode = e.target.value;
  }

  handleCity = (e) => {
    this.studentCity = e.target.value;
  }

  addStudent = (e) => {
    fetch("http://localhost:5000/students", {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:3000/',
        'Access-Control-Allow-Credentials': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        students: {
          _id: this.studentId,
          email: this.studentEmail,
          name: this.studentName,
          address: {
            road: this.studentRoad,
            zipcode: this.studentZipcode,
            city: this.studentCity
          }
        }
      })
    })
    .then((res) => {
      alert('Student added successfully:)');
      this.getStudents();
    })
    .catch((err) => {
      alert(err);
    })
  }

  render () {
    let listOfStudents = this.state.students;
    console.log(this.state.students);
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2>Bong-bong</h2>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Student id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Address</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
              {listOfStudents.map((studentData, index) => {
                return <tr key={index}>
                        <th scope="row">{studentData.students._id}</th>
                        <td>{studentData.students.name}</td>
                        <td>{studentData.students.email}</td>
                        <td>
                        {studentData.students.address.road}, &nbsp;
                        {studentData.students.address.zipcode}, &nbsp;
                        {studentData.students.address.city}
                        </td>
                        <td><button type="button" className="btn btn-danger" onClick={(e) => this.deleteStudentById(studentData._id, e)}>Delete</button></td>
                       </tr>;
              })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
              <div className="jumbotron">
                <h3>Add student</h3>
                <div className="form-group">
                  <label className="float-left">Student id</label>
                  <input id="studentId" className="form-control" type="text" onChange= {this.handleId}/>
                </div>
                <div className="form-group">
                  <label className="float-left">Name</label>
                  <input id="studentName" className="form-control" type="text" onChange= {this.handleName}/>
                </div>
                <div className="form-group">
                  <label className="float-left">Email</label>
                  <input id="studentEmail" className="form-control" type="email" onChange= {this.handleEmail}/>
                </div>
                <h5>Address</h5>
                <div className="form-group">
                  <label className="float-left">Road</label>
                  <input id="studentRoad" className="form-control" type="email" onChange= {this.handleRoad}/>
                </div>
                <div className="form-group">
                  <label className="float-left">Zip code</label>
                  <input id="studentZipcode" className="form-control" type="email" onChange= {this.handleZipcode}/>
                </div>
                <div className="form-group">
                  <label className="float-left">City</label>
                  <input id="studentCity" className="form-control" type="email" onChange= {this.handleCity}/>
                </div> <br/>
                <button type="button" className="btn btn-success" onClick={this.addStudent}>Add student</button>
             </div>
           </div>
         </div>
       </div>
    );
  }
}

export default DashboardComponent;
