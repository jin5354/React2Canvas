import React, { useState, useRef, useCallback } from "react";
import { Scene } from "react2canvas";
import "./HelloWorld.scss";

const HelloWorld = () => {
  const [text, setText] = useState<string>("react2canvas");
  const [showText, setShowText] = useState<boolean>(true);
  const $robot = useRef<any>(null);

  const robotClickHandler = useCallback(() => {
    console.log("showText:", !showText);
    setShowText(!showText);
  }, [showText]);

  const robotMouseEnterHandler = useCallback(() => {
    console.log("robot mouse enter!!");
  }, []);

  return (
    <div className="hello-world-container">
      <div className="r2c-wrapper">
        <Scene resolution={[2000, 1000]}>
          <layer>
            <group className="group">
              <sprite
                onMouseEnter={robotMouseEnterHandler}
                onClick={robotClickHandler}
                ref={$robot}
                className="robot"
                textures="https://p5.ssl.qhimg.com/t01c33383c0e168c3c4.png"
              />
              {showText ? (
                <txt className="txt" text={`Hello ${text}`} />
              ) : null}
            </group>
          </layer>
        </Scene>
      </div>
    </div>
  );
};

export default HelloWorld;
