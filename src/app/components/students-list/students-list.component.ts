import { ApiService } from './../../shared/api.service';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Student } from 'src/app/shared/students';
import { resolve, reject } from 'q';

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})

export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['student_id', 'student_name', 'student_email', 'section', 'action'];

  constructor(private studentApi: ApiService) {
    // this.studentApi.GetStudents().subscribe(data => {
    //   this.StudentData = data;
    //   this.dataSource = new MatTableDataSource<Student>(this.StudentData);
    //   setTimeout(() => {
    //     this.dataSource.paginator = this.paginator;
    //   }, 0);
    // })    
    
  }
  
  ngOnInit() { 
    
    this.studentApi.getStudents1().valueChanges.subscribe(
      ({ data }) => {
        console.log("ngOnInit ::"+data)
        console.log("ngOnInit ::"+data['students'])
        this.StudentData = data['students'];
        this.dataSource = new MatTableDataSource<Student>(this.StudentData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 1);
      }
    )

   // this.getAllStudents();
  }

  deleteStudent(index: number, e) {
    if (window.confirm('Are you sure')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      //this.studentApi.DeleteStudent(e._id).subscribe()
    }
  }

   getAllStudents(){

    this.studentApi.getStudents().subscribe(
      data => {
        console.log(data)
        this.StudentData = data;
        this.dataSource = new MatTableDataSource<Student>(this.StudentData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      }
    )

  }

}