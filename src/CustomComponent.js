// src/CustomComponent.js

import { h, init } from 'snabbdom';
import { classModule, propsModule, eventListenersModule } from "snabbdom";

import useCustomEffect from './useCustomEffect';

const patch = init([classModule, propsModule, eventListenersModule]);

const CustomComponent = () => {
  let vnode;
  let state = { count: 0 };

  const render = (state) => {
    return h('div', [
      h('h1', state.count),
      h('button', { on: { click: increment } }, 'Add'),
    ]);
  };

  const increment = () => {
    updateState({ count: state.count + 1 });
  };

  const updateState = (newState) => {
    state = { ...state, ...newState };
    vnode = patch(vnode, render(state));
  };

  useCustomEffect(() => {
    console.log('Component mounted');
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  useCustomEffect(() => {
    console.log('State changed:', state);
  }, [state]);

  useCustomEffect(() => {
    console.log('Effect triggered by state change');
  }, [state]);

  useCustomEffect(() => {
    console.log('Effect triggered by count change');
  }, [state.count]);

  useCustomEffect(() => {
    console.log('Effect triggered by component mount');
  }, []);

  return null;
};

export default CustomComponent;
