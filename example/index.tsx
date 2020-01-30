import React from 'react';
import ReactDOM from 'react-dom';
import 'minireset.css';
import test from '../dist/index';

test(123123)

const Index = () => (
    <p>example</p>
);

ReactDOM.render(
    <Index />,
    document.getElementById('root'),
);
