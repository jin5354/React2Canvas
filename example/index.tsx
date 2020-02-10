import React, { useCallback, useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Scene } from '../dist/index';
import * as spritejs from 'r2c-spritejs';
import 'minireset.css';
import './index.scss';

const sprite = spritejs as any;

const Index = () => {

    const [count, setCount] = useState<number>(0);
    const [width, setWidth] = useState<number>(1000);
    const [showText, setShowText] = useState<boolean>(true);

    const $test = useRef(null);

    const robotClickHandler = useCallback(() => {
        console.log('showText:', !showText);
        setShowText(!showText);
    }, [showText]);

    const robotMouseEnterHandler = useCallback(() => {
        console.log('robot mouse enter!!');
    }, []);

    useEffect(() => {
        // setInterval(() => {
        //     setCount((oldCount) => {
        //         return oldCount + 1;
        //     })
        // }, 5000);

        function changeWidth() {
            setWidth((oldWidth) => {
                return oldWidth + 1;
            })
            requestAnimationFrame(() => {
                changeWidth();
            })
        }

        // requestAnimationFrame(() => {
        //     changeWidth();
        // })
    }, []);

    return (
        <div className="container">
            <div className="sprite-container">
                <Scene resolution={[2000, 1000]}>
                    <layer>
                        <group bgcolor="gray" className="test-group" width={1800}>
                            <sprite onMouseEnter={robotMouseEnterHandler} onClick={robotClickHandler} className="test-robot" textures="https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png" />
                            {showText ? <txt className="test-t" text={`测试文字${count}`} /> : null}
                        </group>
                    </layer>
                </Scene>
            </div>
        </div>
    )
};

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

let spriteCount = 0
const label = new sprite.Label(`测试文字 ${spriteCount}`)
label.attr({
    pos: [600, 200],
    fontSize: 100,
})

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

setTimeout(() => {
    console.log('修改 class！');
    robot.attr({
        class: 'robot on-ani'
    })
}, 5000);

// setInterval(() => {
//     spriteCount = spriteCount + 1
//     label.attr({
//         text: `测试文字 ${spriteCount}`
//     })
// }, 2000);

layer.append(group);
group.append(robot);

//group.append(label);
