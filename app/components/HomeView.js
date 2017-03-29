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

import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions';

type State = {
  newTodo: string,
  todoSource: Object,
};

class HomeView extends Component<void, void, State> {

  state: State;
  items: Array<any>;

  constructor() {
    super();
    this.items = [];
    this.state = {
      newTodo: '',
      todoSource: new ListView.DataSource(
        {rowHasChanged: (row1, row2) => row1 !== row2}
      ).cloneWithRows(this.items),
    };
  }

  componentWillReceiveProps(nextProps) {
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
    this.props.fetchPosts();
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
             onChangeText={(text) => this.setState({newTodo: text})}
             value={this.state.newTodo}
           />
           <TouchableHighlight
             style={styles.button}
             onPress={() => this._addTodo()}
             underlayColor='#dddddd'>
             <Text style={styles.btnText}>Add!</Text>
           </TouchableHighlight>
         </View>
         <ListView
           enableEmptySections={true}
           dataSource={this.state.todoSource}
           renderRow={(rowData) => this._renderRow(rowData)} />
       </View>
    );
  }

  _addTodo() {
    this.props.createPost(this.state.newTodo);
  }

  _removeToDo(key: string) {
    this.props.deletePost(key);
  }

  _renderRow(rowData: Object) {
    return (
     <TouchableHighlight
       underlayColor='#dddddd'
       onPress={() => this._removeToDo(rowData.key)}>
       <View>
         <View style={styles.row}>
           <Text style={styles.todoText}>{rowData.value}</Text>
         </View>
         <View style={styles.separator}/>
       </View>
     </TouchableHighlight>
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

export default connect(mapStateToProps, actions)(HomeView)
