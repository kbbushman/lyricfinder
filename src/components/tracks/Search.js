import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';

class Search extends Component {
  state = {
    trackTitle: '',
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit = (dispatch, event) => {
    event.preventDefault();

    axios.get(`https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
      .then(res => {
        // console.log(res);
        dispatch({
          type: 'SEARCH_TRACKS',
          payload: res.data.message.body.track_list,
        });

        this.setState({ trackTitle: '' })
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <Consumer>
        {value => {
          console.log(value);
          const { dispatch } = value;
          return (
            <div className="card card-body mb-5 p-4">
              <h1 className="display-4 text-center">
                <i className="fas fa-music"></i> Search For A Song
              </h1>
              <p className="lead text-center">Get the lyrics for any song</p>
              <form onSubmit={this.handleSubmit.bind(this, dispatch)}>
                <div className="form-group">
                  <input type="text" className="form-control form-control-lg" placeholder="Song Title..." name="trackTitle" value={this.state.trackTitle} onChange={this.handleChange} />
                </div>
                <button type="submit" className="btn btn-primary btn-lg btn-block mb-3">Get Track Lyrics</button>
              </form>
            </div>
          )
        }}
      </Consumer>
    )
  }
}

export default Search;
