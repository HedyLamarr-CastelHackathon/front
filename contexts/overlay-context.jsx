import { createContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import makeContext from './context';

const DEFAULT_STATE = [];
const OverlayContentContext = createContext();
OverlayContentContext.displayName = 'OverlayContentContext';

const overlayContentReducer = (state, action) => {
  switch (action.type) {
    case 'show': {
      return [...state, { ...action.payload, key: uuidv4() }];
    }
    case 'hide': {
      const newState = [...state];
      newState.pop();
      return newState;
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const { Provider: OverlayContentProvider, useContext: useOverlayContent } = makeContext({
  context: OverlayContentContext,
  defaultState: DEFAULT_STATE,
  reducer: overlayContentReducer,
});

export { OverlayContentProvider, useOverlayContent };
