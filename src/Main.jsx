import React from 'react';
import ReactDOM from 'react-dom';
import InputArea from './view/InputArea';
import TodoList from './view/TodoList';
import MessageArea from './view/MessageArea';

var TodoListModel = require("./model/TodoListModel");
var model = new TodoListModel();

ReactDOM.render(
   <div>
      <MessageArea model={model} />
      <InputArea model={model} />
      <TodoList model={model}/>
   </div>,
   document.body
);
