import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(
    private http: HttpClient
  ) { }




  getFileUrl(fileId: string): string {
    // Assuming your backend serves files at this endpoint
    return `${environment.url}/file/download/${fileId}`;
    
    // Or if you're using S3 and have direct access:
    // return `${environment.s3BaseUrl}/${fileId}`;
  }
  
  uploadFile(file: any) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(environment.url + '/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  uploadBulkQuestions(file: any, cType, cName) {
    const formData: FormData = new FormData();
    const fileData: any = {
      file: file,
      is_inactive: false,
      course_type: cType,
      course_name: cName
      // created_at: Date.now()
    };
    formData.append('data', JSON.stringify(fileData));
    formData.append('file', file, file.name);

    // const fd = new FormData();
    // const blob = new Blob(file)
    // fd.append('file',file, file.name);
    console.log(file);
    return this.http.post(environment.url + '/questionFile/uploadBulkQuestions', formData);
  }

  uploadDocument(file: File, student:any) {
    const fd = new FormData();
    fd.append('file', file, file.name);
    return this.http.post(environment.url + '/file/uploadDocument/'+ student, fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  uploadS3File(file: File) {
    const fd = new FormData();
    fd.append('file', file, file.name);

    return this.http.post(environment.url + '/file/uploadS3File', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }


  uploadFilewoName(file: File, mobile: any) {
    const fd = new FormData();
    fd.append('docname', Date.now() + '_' + file.name);
    fd.append('mobile', mobile);
    fd.append('file', file, file.name);
    console.log(fd);

    return this.http.post(environment.url + '/file/upload', fd, {
      reportProgress: true,
      observe: 'events'
    });
  }

  // downloadFile(data:any){
  //   return this.http.get(`${environment.url}/file/download`, data)
  // }

  saveUploadedFile(data: any) {
    return this.http.post(`${environment.url}/fileSave/createFileRecord`, data);
  }

  getFilesList(data: any) {
    return this.http.post(`${environment.url}/fileSave/getFilesList`, data);
  }
}

