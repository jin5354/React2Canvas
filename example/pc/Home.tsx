import React from "react";
import { Link } from "react-router-dom";
import './Home.scss';

const HelloWorld = () => (
  <div className="home-container">
    <p>React2Canvas PC Examples</p>
    <ul>
      <li>
        <Link to="/hello-word">Hello World</Link>
      </li>
    </ul>
  </div>
);

export default HelloWorld;
