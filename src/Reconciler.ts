/* eslint-disable no-param-reassign */
import ReactReconciler from 'react-reconciler';
import { createNode } from 'spritejs';

function applyAttrs(target: any, props: any) {
  const events: any = {};
  props = {...props};

  Object.keys(props).forEach((key) => {
    if(key.indexOf('on') === 0) {
      const eventName = key.slice(2).toLowerCase();
      events[eventName] = props[key];
      delete props[key];
    }
    if(key === 'children') {
      delete props.children;
    }
    if(key === 'className') {
      props.class = props.className;
      delete props.className;
    }
  });

  if(typeof target === 'string') {
    console.log('createNode: ', target, props);
    target = createNode(target, props);
  } else {
    target.attr(props);
  }

  Object.keys(events).forEach((key) => {
    target.__originalEvents = target.__originalEvents || {};
    target.off(key, target.__originalEvents[key]);
    target.on(key, events[key]);
    target.__originalEvents[key] = events[key];
  });

  return target;
}

export const Reconciler = ReactReconciler({
  supportsMutation: true,
  now: Date.now,
  getRootHostContext() {},
  getChildHostContext() {},
  shouldSetTextContent() {},


  /** create operation */
  createInstance(type: any, props: any) {
    return applyAttrs(type, props);
  },
  createTextInstance() {},
  /** ui tree operation */
  appendInitialChild(parent: any, child: any) {
    console.log('appendInitialChild:', parent, child)
    parent.appendChild(child);
  },
  appendChild() {},
  appendChildToContainer(parent: any, child: any) {
    parent.appendChild(child);
  },
  removeChild() {},
  /** update prop operation */
  finalizeInitialChildren() {},
  prepareUpdate() {},
  commitUpdate() {},
  prepareForCommit() {},
  resetAfterCommit() {},
});

// export const Reconciler = {
//   render(reactElement: any, domElement: any, callback?: Function) {

//     // Create a root Container if it doesnt exist
//     if (!domElement._rootContainer) {
//       domElement._rootContainer = ReactReconcilerInst.createContainer(domElement, false);
//     }

//     // update the root Container
//     return ReactReconcilerInst.updateContainer(reactElement, domElement._rootContainer, null, callback);
//   }
// };
