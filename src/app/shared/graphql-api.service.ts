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

  getStudents1() {
    return this.apollo.watchQuery<any>({
      query: Query.GetQuery,
      fetchPolicy : "no-cache"
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

  getStudentById(sid: number) {
    return this.apollo.watchQuery<any>({
      query: Query.GetQueryById,
      variables: {
        'sid': sid
      }
    });

  }

  updateStudentById(sid: number, stdObj: Student) {
    this.apollo.mutate({
      mutation: Query.UpdateMutation,
      variables: {
        "where": {
          "student_id": {
            "_eq": sid
          }
        },
        "set": stdObj
      }
    }).subscribe(({ data }) => {
      console.log('recieved data :: ' + data);
    },
      (error) => {
        console.log('Could not add due to ' + error);
      }
    );
  }

  deleteStudentById(sid:number){
    return this.apollo.mutate({
      fetchPolicy : "no-cache",
      mutation : Query.DeleteMutation,
      variables : {
        "where": {
          "student_id": {
            "_eq": sid
          }
        }
      }
    });
  }

}
