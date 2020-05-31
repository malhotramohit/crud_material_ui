import { Injectable } from '@angular/core';
import { Student } from './students';
import { GraphqlApiService } from './graphql-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private graphqlApiService:GraphqlApiService) { }


  async addStudent(student:Student){
    console.log(student);
    return this.graphqlApiService.addStudent(student);
  }

   getStudents() : Observable<any>{
    return  this.graphqlApiService.getStudents();
  }

  getStudents1(){
    return this.graphqlApiService.getStudents1();
  }

  getStudentById(sid:number){
    return this.graphqlApiService.getStudentById(sid);
  }

  async updateStudentById(sid: number, stdObj: Student) {
    return this.graphqlApiService.updateStudentById(sid,stdObj);
  }
}
