import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import homlogo from "../components/assets/img.jpg";

export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-expand-lg">
     
        <Link to="/homepage" className="nav-link">Home</Link>
        <div className="collpase navbar-collapse">
  
        <ul className="navbar-nav mr-auto">
          <li className = "navbar-item">
          <Link to="/" className="nav-link">Analyze</Link>
          </li>
          <li className="navbar-item">
          <Link to="/playlists" className="nav-link">Playlists</Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">Add Playlists</Link>
          </li>
        </ul>
         <img src={homlogo}
        style={{ maxHeight: "40px" }}
        />
        </div>
      </nav>
    );
  }
}
