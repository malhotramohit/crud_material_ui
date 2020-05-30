import { Injectable } from '@angular/core';
import { Student } from './students';
import { Apollo } from 'apollo-angular';
import * as Query from '../queries/student-crud-query';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GraphqlApiService {

  constructor(private apollo: Apollo) { }

  addStudent(student: Student) {
    console.log(student);
    this.apollo.mutate({
      mutation: Query.AddMutation,
      variables: {
        'object': [
          student
        ]
      }
    }).subscribe(
      ({ data }) => {
        console.log('recieved data :: ' + data);
      },
      (error) => {
        console.log('Could not add due to ' + error);
      }
    );
  }

  getStudents1(){
    return this.apollo.watchQuery<any>({
      query: Query.GetQuery
    });
  }


  getStudents(): Observable<any> {
    return Observable.create(observer => {
      this.apollo.watchQuery<any>({
        query: Query.GetQuery
      }).valueChanges
        .subscribe(({ data }) => {
          console.log(data['students'])
          observer = data['students'];
        });
    })
  }


}
