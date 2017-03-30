/**
 * CommentPost
 * https://github.com/facebook/react-native
 * @flow
 */

import Firebase from 'firebase';
import _ from 'lodash';
import {
  FETCH_POSTS,
  DELETE_POST,
  CREATE_POST
} from './types';

const Posts = new Firebase('https://todoredux-b11f4.firebaseio.com/');

export function fetchPosts() {
  return function (dispatch: Function) {
    Posts.on('value', snapshot => {
      dispatch({
        type: FETCH_POSTS,
        payload: snapshot.val()
      });
    });
  };
}

export function createPost(post: string) {
  return function (dispatch: Function) {
    Posts.push(post);
  };
}

export function deletePost(key: string) {
  return function (dispatch: Function) {
    Posts.child(key).remove();
  };
}
