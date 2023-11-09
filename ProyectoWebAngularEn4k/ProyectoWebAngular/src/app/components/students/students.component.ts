import { Component, OnInit } from '@angular/core';
import { StudentsService } from 'src/app/services/students.service';
import { Student } from 'src/app/models/student'
import { FormGroup, NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; //correr en consola, primero: npm config set legacy-peer-deps true      segundo: ng add add @ng-bootstrap/ng-bootstrap
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})

export class StudentsComponent implements OnInit {

  //-
  studentForm: FormGroup
  FormGroup: FormControl
  student = new Student()
  //-

  constructor(private studentService: StudentsService, private modalService: NgbModal) { }

  studentList = new Array<Student>()

  /* @Input() */ //dni: string
  //lastName: string
  //firstName: string
  //email: string
  // id: number       no va porque lo genera el servidor
  //cohort = 10
  //status = 'aaa'
  //phone = '223'
  //address = 'ccc'
  //gender = 'ddd'

  id2: any /////
  dni2: string
  lastName2: string
  firstName2: string
  email2: string



  ngOnInit() {
    this.get()
    //-
    this.studentForm = new FormGroup({
      'dni': new FormControl(this.student.dni, Validators.required),
      'lastName': new FormControl(this.student.lastName, Validators.required),
      'firstName': new FormControl(this.student.firstName, Validators.required),
      'email': new FormControl(this.student.email, Validators.required)
    })
    //-
  }

  get dni() { //nuevo metodo 
    return this.studentForm.get('dni')
  }

  get lastName() { //nuevo metodo 
    return this.studentForm.get('lastName')
  }

  get firstName() { //nuevo metodo 
    return this.studentForm.get('firstName')
  }

  get email() { //nuevo metodo 
    return this.studentForm.get('email')
  }

  get() {
    this.studentService.get().subscribe(response => {
      this.studentList = response
      console.log(this.studentList)
    })
  }

  save() {
    this.student.dni = this.dni.value
    this.student.lastName = this.lastName.value
    this.student.email = this.email.value
    this.student.firstName = this.firstName.value
    this.student.cohort = 1
    this.student.address = "siempreviva 742 X6"
    this.student.gender = "H"
    this.student.status = "-----"
    this.student.phone = "223999x"

    this.studentService.save(this.student).subscribe(() => {
      location.reload()
    })
  }

  delete(id) {
    this.studentService.delete(id).subscribe(() => {
      location.reload()
    }, error => {
      console.error(error)
      alert("Error: " + error.error.message)
    })
  }

  update(ver: any, s: Student) {
    this.id2 = s.id
    this.dni2 = s.dni
    this.lastName2 = s.lastName
    this.firstName2 = s.firstName
    this.email2 = s.email
    //////
    this.modalService.open(ver).result.then(() => { //esto maneja el segundo servicio
      let student = new Student()
      student.id = this.id2
      student.dni = this.dni2
      student.lastName = this.lastName2
      student.firstName = this.firstName2
      student.email = this.email2
      student.cohort = 0
      student.status = "activo"
      student.gender = "masculino"
      student.address = "siempreviva 772"
      student.phone = "223"
      this.studentService.update(student).subscribe(() => {
        location.reload()
      }, error => {

      })
    }, reason => { })
  }
}
