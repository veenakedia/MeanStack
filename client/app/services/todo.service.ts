import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Todo} from '../todo';

@Injectable()

export class TodoService{  
    constructor(private _http:Http){
        
    }

    getTodos(){
        return this._http.get('/api/v1/todos').map(res=>res.json());
    }



    saveTodo(newtodo){
        var headers = new Headers();
        headers.append('Content-type','application/json');
        return this._http.post('/api/v1/todo', JSON.stringify(newtodo), {headers:headers})
            .map(res=>res.json());

    }

    updateTodo(todo){
        console.log('compaonent' + todo);
        var headers = new Headers();
        headers.append('Content-type','application/json');
        return this._http.put('/api/v1/todo/' + todo._id, JSON.stringify(todo), {headers:headers})
            .map(res=>res.json());
    }

    deleteTodo(id){
        console.log(id);
        return this._http.delete('/api/v1/todo/' + id)
            .map(res=>res.json());
    }
}