import React, { useEffect, useRef, useState } from 'react';
import * as spritejs from 'r2c-spritejs';
import { Reconciler } from './Reconciler';

const sprite = spritejs as any;
spritejs.Resource.loadTimeout = 9999999999;

(window as any).React2 = React;

type StickMode = 'width' | 'height' | 'top' | 'bottom' | 'left' | 'right';

interface SceneProps {
  viewport?: 'auto' | ['auto' | number, 'auto' | number];
  resolution?: 'flex' | [number, number];
  useDocumentCSS?: boolean;
  stickMode?: StickMode;
  stickExtend?: boolean;
  displayRatio?: string;
  maxDisplayRatio?: number;
  children: any;
}

export function Scene(props: SceneProps) {
  const $div = useRef(null);
  const [container, setContainer] = useState(null);

  const style = {
    width: '100%',
    height: '100%',
  }

  useEffect(() => {
    const sceneProps = {
      viewport: props.viewport || 'auto',
      resolution: props.resolution || 'flex',
      useDocumentCSS: props.useDocumentCSS || true,
      stickMode: props.stickMode || 'top',
      stickExtend: props.stickExtend || true,
      displayRatio: props.displayRatio || 'auto',
      maxDisplayRatio: props.maxDisplayRatio || undefined,
    }
    const scene = new sprite.Scene($div.current, sceneProps);
    const _container = Reconciler.createContainer(scene);
    setContainer(_container)
    Reconciler.updateContainer(props.children, _container, this);

    setTimeout(() => {
      console.log('scene:', scene);
    }, 3000);

    return () => {
      Reconciler.updateContainer(null, _container, this);
    }
  }, []);

  useEffect(() => {
    if(container) {
      Reconciler.updateContainer(props.children, container, this);
    }
  }, [props]);

  return <div style={style} ref={$div} />
}
