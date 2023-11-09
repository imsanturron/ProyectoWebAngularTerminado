import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Student } from 'src/app/models/student'

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  private url = 'https://backend-idra-production.up.railway.app/student'


  get(): Observable<any> {
    return this.http.get(this.url + '/getAll')
  }

  save(student: Student): Observable<any> {
    return this.http.post(this.url, student)
  }

  update(student: Student): Observable<any> {
    return this.http.post(this.url + '/' + student.id + '/update', student)
  }

  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }
}
