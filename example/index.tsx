import React from 'react';
import ReactDOM from 'react-dom';
import { Scene } from '../dist/index';
import * as spritejs from 'spritejs';
import 'minireset.css';
import './index.scss';

const sprite = spritejs as any;

const Index = () => (
    <div className="container">
        <Scene resolution={[2000, 1000]}>
            <layer>
                <group bgcolor="gray" className="test-group">
                    <sprite className="test-robot" textures="https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png" />
                </group>
            </layer>
        </Scene>
    </div>
);


ReactDOM.render(
    <Index />,
    document.getElementById('root'),
);

const scene = new sprite.Scene('#test', {
    viewport: ['auto', 'auto'],
    resolution: [2000, 1000],
    useDocumentCSS: true,
});

const layer = scene.layer();

const group = new sprite.Group({
    class: 'group'
});

group.attr({
    pos: [1000, 500],
    anchor: 0.5,
    border: [6, '#aaa'],
    bgcolor: 'gray',
})

const robot = new sprite.Sprite({
    textures: 'https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png',
    class: 'robot',
});

robot.attr({
    anchor: 0,
});

layer.append(group);
group.append(robot);
