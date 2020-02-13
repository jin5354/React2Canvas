import React, { useState, useRef, useCallback, useEffect } from "react";
import { Scene } from "react2canvas";
import * as sprite from 'r2c-spritejs';
import Hilo from 'hilojs';
import Stats from 'stats.js';
import "./BenchMark.scss";

const BenchMark = () => {
  const [ballNum, setBallNum] = useState<number>(0);
  const [hiloStage, setHiloStage] = useState<any>(null);
  const [spriteScene, setSpriteScene] = useState<any>(null);
  const [spriteLayer, setSpriteLayer] = useState<any>(null);
  const $ball = useRef(new Array(500).fill(1).map(e => React.createRef()));
  const $hilo = useRef(null);
  const $sprite = useRef(null);

  const initStats = useCallback(() => {
    const stats = new Stats();
    stats.showPanel(0);
    document.body.appendChild(stats.dom);
    function animate() {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, []);

  const initAnimations = useCallback(() => {
    $ball.current.forEach(e => {
      if(e.current) {
        e.current.animate([{
          x: Math.random() * 100,
        }, {
          x: 1820 - Math.random() * 100,
        }], {
          duration: 1000 * (Math.random() + 0.5),
          iterations: Infinity,
          direction: 'alternate',
        })
      }
    })
  }, [$ball]);

  const initBalls = useCallback(() => {
    return new Array(ballNum).fill(1).map((e, i) => {
      return (<sprite
      ref={$ball.current[i]}
      pos={[0, Math.random() * 820]}
      key={i}
      id={i}
      textures="http://awp-assets.sankuai.com/wm/waimai_ad_fe_lingbo_game_gacha/assets/giftBallRed-eaace1c7e45458dadb12ff9caa46e6dd.png"
    />)
    });
  }, [ballNum]);

  const initHilo = useCallback((num) => {
    let stage
    if(hiloStage) {
      stage = hiloStage
    }else {
      stage = new Hilo.Stage({
        renderType:'canvas',
        container: $hilo.current,
        width: 300,
        height: 150
      });
      setHiloStage(stage);
      const ticker = new Hilo.Ticker(60);
      ticker.addTick(stage)
      ticker.addTick(Hilo.Tween)
      ticker.start();
    }

    const scale = 300 / 2000;

    stage.removeAllChildren();

    for(let i = 0; i < num; i++) {
      const ball = new Hilo.Bitmap({
        image: 'http://awp-assets.sankuai.com/wm/waimai_ad_fe_lingbo_game_gacha/assets/giftBallRed-eaace1c7e45458dadb12ff9caa46e6dd.png'
      })
      ball.x = Math.random() * 100 * scale;
      ball.y = Math.random() * 820 * scale;
      ball.width = 180 * scale;
      ball.height = 180 * scale;

      Hilo.Tween.to(ball, {
        x: (1820 - Math.random() * 100) * scale,
      }, {
          duration: 1000 * (Math.random() + 0.5),
          loop: true,
          reverse: true,
      });

      stage.addChild(ball);
    }
  }, [hiloStage]);

  const startR2C = useCallback((num) => {
    if(hiloStage) {
      hiloStage.removeAllChildren();
    }
    setBallNum(num);
    setTimeout(() => {
      initAnimations();
    }, 100);
  }, [hiloStage]);

  const startHilo = useCallback((num) => {
    setBallNum(0);
    initHilo(num);
  }, []);

  const startSprite = useCallback((num) => {
    let scene;
    let layer;
    if(spriteScene) {
      scene = spriteScene;
      layer = spriteLayer;
    }else {
      scene = new sprite.Scene('#sprite-compare', {
        viewport: ['auto', 'auto'],
        resolution: [2000, 1000],
      });
      setSpriteScene(scene);

      layer = scene.layer();
      setSpriteLayer(layer);
    }

    for(let i = 0; i < num; i++) {
      const ball = new sprite.Sprite('http://awp-assets.sankuai.com/wm/waimai_ad_fe_lingbo_game_gacha/assets/giftBallRed-eaace1c7e45458dadb12ff9caa46e6dd.png');
      ball.attr({
        x: Math.random() * 100,
        y: Math.random() * 820,
      })

      ball.animate([{
        x: Math.random() * 100,
      }, {
        x: 1820 - Math.random() * 100,
      }], {
        duration: 1000 * (Math.random() + 0.5),
        iterations: Infinity,
        direction: 'alternate',
      })

      layer.append(ball);
    }
  }, [spriteScene]);

  useEffect(() => {
    initStats();
  }, []);

  return (
    <div className="benchmark-container">
      <div className="controls">
        <p>
        <button onClick={() => { startR2C(10); }}>r2c 10</button>
        <button onClick={() => { startR2C(100); }}>r2c 100</button>
        <button onClick={() => { startR2C(500); }}>r2c 500</button>
        </p>
        <p>
          <button onClick={() => { startSprite(10); }}>sprite 10</button>
          <button onClick={() => { startSprite(100); }}>sprite 100</button>
          <button onClick={() => { startSprite(500); }}>sprite 500</button>
        </p>
        <p>
          <button onClick={() => { startHilo(10); }}>hilo 10</button>
          <button onClick={() => { startHilo(100); }}>hilo 100</button>
          <button onClick={() => { startHilo(500); }}>hilo 500</button>
        </p>
      </div>
      <div className="r2c-wrapper">
        <Scene resolution={[2000, 1000]}>
          <layer>
            <group className="benchmark-group">
              {initBalls()}
            </group>
          </layer>
        </Scene>
      </div>
      <div ref={$sprite} id="sprite-compare" />
      <div ref={$hilo} id="hilo-compare" />
    </div>
  );
};

export default BenchMark;
