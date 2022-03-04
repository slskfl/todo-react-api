import { Paper, List, Container } from '@material-ui/core';
import React from 'react';
import './App.css';
import Todo from './Todo';
import AddTodo from './AddTodo';
import {callApi} from "./service/ApiService"

class App extends React.Component{

  //2.Todo에 아이템 리스트 넘기기
  constructor(props){
    super(props);
    this.state = {items : [],  };
  }

  componentDidMount() {
    callApi("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  add = (item) => {
    callApi("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    callApi("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  //update는 원래 프론트엔드(todo)에서 처리하였지만, 이제 백엔드에서 가져와서 수정하고 보내야하기 때문에 app에서도 추가해준다.
  update = (item) => {
    callApi("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin : 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item = {item} key = {item.id} delete = {this.delete} update = {this.update}/>  
            ))}
        </List>
      </Paper>
    );
    return (
      <div className="App"> 
        <Container maxWidth="md">
          <AddTodo add={this.add}/>
          <div className="TodoList">{todoItems}</div>
        </Container>
      </div>
    );
  }
}
export default App; // App 컴포넌트를 다른 컴포넌트에서 사용할 수 있다.