/**
 * CommentPost
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import HomeView from './app/components/HomeView';
import reducers from './app/reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

export default class CommentPost extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <HomeView />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('CommentPost', () => CommentPost);
