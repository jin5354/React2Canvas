import React, { useEffect, useRef } from 'react';
import * as spritejs from 'spritejs';
import { Reconciler } from './Reconciler';

const sprite = spritejs as any;

(window as any).React2 = React;

interface SceneProps {
  viewport?: 'auto' | ['auto' | number, 'auto' | number];
  resolution?: 'flex' | [number, number];
  useDocumentCSS?: boolean;
  children: any;
}

export function Scene(props: SceneProps) {
  const $div = useRef(null);

  const style = {
    width: '100%',
    height: '100%',
  }

  useEffect(() => {
    const sceneProps = {
      viewport: props.viewport || 'auto',
      resolution: props.resolution || 'flex',
      useDocumentCSS: props.useDocumentCSS || true,
    }
    const scene = new sprite.Scene($div.current, sceneProps);
    const container = Reconciler.createContainer(scene);
    Reconciler.updateContainer(props.children, container, this);
  }, []);

  return <div style={style} ref={$div} />
}
