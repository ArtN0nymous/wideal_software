import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ResponsePost } from '../interfaces/interfaces';
const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  pagina = 0;
  constructor(private http:HttpClient) { }
  private executeQuery<T>( endpoint: string,params:any) {
    console.log('Petición HTTP realizada');
    return this.http.get<T>(`${ URL }${ endpoint }`, {
      params,
      headers:{
        "x-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7Il9pZCI6IjY0NGFjNjA4MzkwZDJiNTYxN2NhOGEyYSIsIm5vbWJyZSI6IlJhbW9uIiwiZW1haWwiOiJleGFtcGxlOUBtYWlsLmNvbSIsImF2YXRhciI6ImF2LTEucG5nIn0sImlhdCI6MTY4MjYyMTk2MCwiZXhwIjoxNjg1MjEzOTYwfQ.uo7rh4uC4TQvShw2H0kXi8Hzgdikl9snZUMq6iPvz7I"
      }
    });
   }
  getPost(){
    this.pagina ++;
    return this.executeQuery<ResponsePost>('/posts/',{pagina:this.pagina});
  }
}
