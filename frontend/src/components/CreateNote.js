import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { withRouter } from '../utils/withRouter';

class CreateNote extends Component {
  state = {
    users: [],
    userSelected: '',
    title: '',
    content: '',
    date: new Date(),
    editing: false,
    _id: ''
  };

  async componentDidMount() {
    const res = await axios.get('/api/users');
    this.setState({
      users: res.data.map(user => user.username),
      userSelected: res.data[0]?.username || ''
    });

    // Usar this.props.router.params.id
    const noteId = this.props.router.params.id; // Aquí usamos router.params.id
    if (noteId) {
      const res = await axios.get(`/api/notes/${noteId}`);
      this.setState({
        title: res.data.title,
        content: res.data.content,
        date: new Date(res.data.date),
        userSelected: res.data.author,
        editing: true,
        _id: noteId
      });
    }
  }

  onSubmit = async (e) => {
    e.preventDefault();

    const newNote = {
      title: this.state.title,
      content: this.state.content,
      date: this.state.date,
      author: this.state.userSelected
    };

    if (this.state.editing) {
      // Asegúrate de que hay una barra después de 'notes/'
      await axios.put('/api/notes/' + this.state._id, newNote);
    } else {
      await axios.post('/api/notes', newNote);
    }

    window.location.href = '/';
  };

  onInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeDate = date => {
    this.setState({ date });
  };

  render() {
    return (
      <div className="col-md6 offset-md-3">
        <div className="card card-body">
          <h4>{this.state.editing ? 'Edit Note' : 'Create a Note'}</h4>

          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <select
                className="form-control"
                name="userSelected"
                value={this.state.userSelected}
                onChange={this.onInputChange}
              >
                {this.state.users.map(user =>
                  <option key={user} value={user}>
                    {user}
                  </option>
                )}
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                name="title"
                value={this.state.title}
                onChange={this.onInputChange}
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="content"
                className="form-control"
                placeholder="Content"
                value={this.state.content}
                onChange={this.onInputChange}
                required
              />
            </div>

            <div className="form-group">
              <DatePicker
                className="form-control"
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {this.state.editing ? 'Update' : 'Save'}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(CreateNote);
