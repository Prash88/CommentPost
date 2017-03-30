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
  View,
  ListView,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Item from './Item'

type State = {
  todoSource: Object,
};

type Props = {
  dispatch: any,
};

class HomeView extends Component<void, Props, State> {

  props:Props;
  state: State;
  items: Array<any>;

  constructor(props: Props) {
    super(props);
    this.items = [];
    this.state = {
      todoSource: new ListView.DataSource(
        {rowHasChanged: (row1, row2) => row1 !== row2}
      ).cloneWithRows(this.items),
    };
  }

  componentWillReceiveProps(nextProps: any) {
    this.items =  _.map(nextProps.items, (post, key) => {
      return {'key': key, 'value': post};
    });
    this.setState({
      todoSource: new ListView.DataSource(
        {rowHasChanged: (row1, row2) => row1 !== row2}
      ).cloneWithRows(this.items),
    });
  }


  componentWillMount() {
    this.props.dispatch(actions.fetchPosts());
  }

  render() {
    return (
      <View style={styles.appContainer}>
         <View style={styles.titleView}>
           <Text style={styles.titleText}>
             My Todos
           </Text>
         </View>
         <View style={styles.inputcontainer}>
           <TextInput
             style={styles.input}
             blurOnSubmit={true}
             placeholder={'Enter todo here ...'}
             multiline={true}
             returnKeyType={'done'}
             enablesReturnKeyAutomatically={true}
             onEndEditing={(event) => this._addTodo(event)}
           />
         </View>
         <ListView
           enableEmptySections={true}
           dataSource={this.state.todoSource}
           renderRow={(rowData) => this._renderRow(rowData)} />
       </View>
    );
  }

  _addTodo(event: any) {
    console.log(event.nativeEvent.text);
    this.props.dispatch(actions.createPost(event.nativeEvent.text));
  }

  _removeToDo(key: string) {
    this.props.dispatch(actions.deletePost(key));
  }

  _renderRow(rowData: Object) {
    return (
     <Item name={rowData.value}
       removable={true}
       onRemove={() => this._removeToDo(rowData.key)} />
   );
  }
}

var styles = StyleSheet.create({
  appContainer:{
    flex: 1
  },
  titleView:{
    backgroundColor: '#48afdb',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row'
  },
  titleText:{
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 20,
  },
  inputcontainer: {
    marginTop: 5,
    padding: 10,
    flexDirection: 'row'
  },
  button: {
    height: 36,
    flex: 2,
    flexDirection: 'row',
    backgroundColor: '#48afdb',
    justifyContent: 'center',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 6,
  },
  input: {
    height: 36,
    padding: 4,
    marginRight: 5,
    flex: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48afdb',
    borderRadius: 4,
    color: '#48BBEC'
  },
  row: {
    flexDirection: 'row',
    padding: 12,
    height: 44
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  todoText: {
    flex: 1,
  }
});


function mapStateToProps(state) {
  return { items: state.posts };
}

export default connect(mapStateToProps)(HomeView)
