import { Component, OnInit, OnDestroy } from '@angular/core';
import {TodoService} from  '../services/todo.service';
import {Todo} from '../todo';

@Component({
    moduleId:module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html',
    providers: [TodoService]
})

export class TodosComponent {
    todos:any;
   constructor(private _todoService: TodoService){
        
   }

   addToTodo(event, todoText){
      var result;
      var newtodo = {
          text: todoText.value,
          isCompleted: false
      }

      result = this._todoService.saveTodo(newtodo);
      result.subscribe(x=>{
          this._todoService.getTodos().subscribe(res=>this.todos = res);
      });
      todoText.value = '';
   }

   setEditState(todo, state){
       if(state){
           todo.isEditMode = state;
       }else
       {
           delete todo.isEditMode;
       }
   }

   updateStatus(todo){
       console.log(todo._id);
       var _todo = {
           _id: todo._id,   
           text: todo.text,
           isCompleted: !todo.isCompleted
       }
       this._todoService.updateTodo(_todo)
       .subscribe(data=>{
           todo.isCompleted = !todo.isCompleted
       });
   }

   updateTodoText(event, todo)
   {
       
    if(event.which == 13)
    {
        todo.text = event.target.value;
        var _todo = {
            _id : todo._id,
            text: todo.text,
            isCompleted: todo.isCompleted
        }

        this._todoService.updateTodo(_todo)
        .subscribe(data=> this.setEditState(todo,false));
    }
        
   }

   deleteTodo(todo){
       var todos = this.todos;
       this._todoService.deleteTodo(todo._id)
       .subscribe(data=>
           {
               for(var i=0; i<todos.length; i++)
               {
                   if(todos[i]._id == todo._id)
                   todos.splice(i,1);
               }
           }
       );
   }

   ngOnInit(){
        this.todos = [];
        this._todoService.getTodos().subscribe(res=>this.todos = res);
   }

   ngOnDestroy(){
       
   }
 }
 