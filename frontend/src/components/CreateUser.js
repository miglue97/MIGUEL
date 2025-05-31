import React, { Component } from 'react'
import axios from 'axios';

export default class CreateUser extends Component {

  state = {
    users: [],
    username: ''
  }


  getUsers = async () => {
    const res = await axios.get('/api/users');
    this.setState({ users: res.data });
  }

  async componentDidMount() {
    this.getUsers();
    console.log(this.state.users);
  }



  onChangeUserName = (e) => {
    this.setState({
      username: e.target.value
    })
  }

  onSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/users', {
      username: this.state.username
    })
    this.setState({username: ""})
    this.getUsers();

  }

   deleteuser = async (id) => {
    await axios.delete('/api/users/' + id)
    this.getUsers();
  }


  render() {
    return (
      <div className='row'>
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type='text'
                  className='form-control'
                  value={this.state.username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <button type='submit' className="btn btn-rpimary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {
              this.state.users.map(user => (
                <li 
                  className="list-group-item list-group-item-action" 
                  key={user._id}
                  onDoubleClick={() => this.deleteuser(user._id )}
                  >
                  {user.username}
                </li>)
              )
            }
          </ul>
        </div>


      </div>
    )
  }
}
