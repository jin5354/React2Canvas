/* eslint-disable max-params */
/* eslint-disable no-param-reassign */
import ReactReconciler from 'react-reconciler';
import { createNode } from 'r2c-spritejs';

const rootHostContext = {};
const childHostContext = {};
const UPDATE_SIGNAL = {};

function applyAttrs(target: any, props: any) {
  const events: any = {};
  const newProps = {...props};

  Object.keys(newProps).forEach((key) => {
    if(key.indexOf('on') === 0) {
      const eventName = key.slice(2).toLowerCase();
      events[eventName] = newProps[key];
      delete newProps[key];
    }
    if(key === 'children') {
      delete newProps.children;
    }
    if(key === 'className') {
      newProps.class = newProps.className;
      delete newProps.className;
    }
  });

  if(typeof target === 'string') {
    if(target === 'txt') {
      target = 'label';
    }
    target = createNode(target, newProps);
  } else {
    target.attr(newProps);
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
  scheduleTimeout: typeof setTimeout === 'function' ? setTimeout : undefined,
  cancelTimeout: typeof clearTimeout === 'function' ? clearTimeout : undefined,
  getRootHostContext() {
    return rootHostContext;
  },
  getChildHostContext() {
    return childHostContext;
  },
  getPublicInstance(instance: any) {
    return instance;
  },
  shouldSetTextContent(type: any, props: any) {
    return typeof props.children === 'string' || typeof props.children === 'number';
  },

  /** create operation */
  createInstance(type: any, props: any) {
    // console.log('createInstance:', type, props);
    return applyAttrs(type, props);
  },
  createTextInstance() {},
  /** ui tree operation */
  appendInitialChild(parent: any, child: any) {
    // console.log('appendInitialChild:', parent, child);
    parent.appendChild(child);
  },
  appendChild(parent: any, child: any) {
    // console.log('appendChild:', parent, child);
    parent.appendChild(child);
  },
  appendChildToContainer(parent: any, child: any) {
    // console.log('appendChildToContainer:', parent, child);
    parent.appendChild(child);
  },
  removeChild(parent: any, child: any) {
    // console.log('removeChild:', child, parent);
    parent.removeChild(child);
  },
  removeChildFromContainer(parent: any, child: any) {
    // console.log('removeChildFromContainer:', child, parent);
    parent.removeChild(child);
  },
  insertBefore(parent: any, child: any, beforeChild: any) {
    // console.log('insertBefore', parent, child, beforeChild);
  },
  insertInContainerBefore() {
    // console.log('insertInContainerBefore');
  },
  /** update prop operation */
  finalizeInitialChildren() {
    return false;
  },
  prepareUpdate() {
    return UPDATE_SIGNAL;
  },
  commitUpdate(instance: any, updatePayload: any, type: any, oldProps: any, newProps: any) {
    applyAttrs(instance, newProps);
  },
  prepareForCommit() {},
  resetAfterCommit() {},
  shouldDeprioritizeSubtree() {
    return false
  },
});
