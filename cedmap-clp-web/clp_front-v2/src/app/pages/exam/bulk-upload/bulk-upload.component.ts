import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { CoreApiService } from "src/app/services/core-api.service";
import { FileService } from "src/app/services/file.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-bulk-upload",
  templateUrl: "./bulk-upload.component.html",
  styleUrls: ["./bulk-upload.component.scss"],
})
export class BulkUploadComponent implements OnInit {

  selectedFile: File | null = null;
  course_name: any;
  course_type: any;
  courseList = [];
  notGeneral: Boolean = false;
  uploadButtonStatus = false;




  // questionFile: File;
  // data: any[][];
  // env: any;
  // dataList: any = [];
  // batches = [];
  // batchList = [];
  // batch: any;
  // qps = [];
  // qpList = [];
  // qp: any;

  ngOnInit(): void {

  }

  constructor(
    private http: HttpClient,
    private api: CoreApiService,
    private fileService: FileService,

  ) {}

  getCourseList(){
    this.courseList = [];
    if(this.course_type == 'General'){
      this.notGeneral = false;
    }else{
      this.notGeneral = true;
      const cType ={
        course_type:  this.course_type
      }
      // console.log(cType);

      this.api.get("course",cType).subscribe((resp: any)=>{
        // console.log(resp);

        // if (resp) {
          this.courseList = resp.data;
        // }
      })
    }
  }

  onFileSelected(event: any) {
    if (event.target.files.length) {
      console.log(event.target.files);
      console.log(event.target.files[0].type);
      if(event.target.files[0].type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
      {
        this.uploadButtonStatus = true;
        this.selectedFile = event.target.files[0];
      }else{
        this.uploadButtonStatus = false;
        alert('Please upload file in .xlsx format only!!')
      }
      //     this.questionFile = e.target.files[0];


  }
}


  onSubmit(form: any) {
if(form.valid){

  if (!this.selectedFile) {

    console.log('No file selected');
    return;
  }
  this.fileService.uploadBulkQuestions(this.selectedFile, this.course_type, this.course_name).subscribe
    (
      (resp: any) => {
        if(resp){
          alert(resp.message);
          console.log(resp);
        }
        // Display success message to the user
      },

    );
  }else{
    alert('Please fill all the details!')
  }
}

    // const formData: FormData = new FormData();
    // formData.append('file', this.selectedFile, this.selectedFile.name);

}

  // selectFile(e: any) {
  //   if (e.target.files.length) {
  //     this.questionFile = e.target.files[0];
  //     const questionDataFormSubmit: any = document.getElementById(
  //       "questionDataFormSubmit"
  //     );
  //     questionDataFormSubmit.click();
  //   } else {
  //     this.questionFile = null;
  //   }
  // }
  // getData() {
  //   this.questionFileService.getList({}).subscribe((resp: any) => {
  //     if (resp.success) {
  //       this.dataList = resp.data.reverse();
  //       this.getProgramData();
  //     } else {
  //       this.alert.errorToast(resp.msg);
  //     }
  //   });
  // }
  // getProgramData() {
  //   this.programService.getList({}).subscribe((resp: any) => {
  //     if (resp.success) {
  //       this.getQPData();
  //       this.batches = resp.data;
  //       this.batchList = resp.data.map((o) => {
  //         return {
  //           id: o._id,
  //           text: o.title,
  //         };
  //       });
  //     } else {
  //       this.alert.errorToast(resp.msg);
  //     }
  //   });
  // }
  // getQPData() {
  //   this.http
  //     .post(`${this.env.url}/api/QPModel/getList`, { limit: 1000000 })
  //     .subscribe((resp: any) => {
  //       this.qps = resp.data;
  //       this.qpList = resp.data.map((o) => {
  //         return {
  //           id: o.code,
  //           text: o.name,
  //         };
  //       });
  //     });
  // }

  // submit(frm: NgForm) {
  //   if (frm.valid) {
  //     const fileLabel: any = document.getElementById("uploadProgress");
  //     this.fileService.uploadFile(this.questionFile).subscribe((resp) => {
  //       if (resp.type == HttpEventType.UploadProgress) {
  //         // console.log(resp);
  //         fileLabel.style.width =
  //           Math.round((resp.loaded * 100) / resp.total) + "%";
  //       } else if (resp.type == HttpEventType.Response) {
  //         const body: any = resp.body;
  //         frm.value.path = body.file.path;
  //         frm.value.filename = frm.value.student_data_file;
  //         this.createStudentFile(frm);
  //       }
  //     });
  //   } else {
  //     this.alert.warningToast("Please fill all the fields properly!");
  //   }
  // }

  // createStudentFile(frm: any) {
  //   this.questionFileService.create(frm.value).subscribe((resp: any) => {
  //     if (resp.success) {
  //       this.alert.successToast("File Added!");
  //       frm.reset();
  //     } else {
  //       this.alert.warningToast(resp.msg);
  //     }
  //   });
  // }
  // upload() {
  //   if (this.file) {
  //     const reader: FileReader = new FileReader();
  //     reader.onload = (e: any) => {
  //       const workbook: XLSX.WorkBook = XLSX.read(e.target.result, { type: 'binary' });
  //       const worksheet: XLSX.WorkSheet = workbook.Sheets[workbook.SheetNames[0]];
  //       this.data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  //       this.saveData();
  //     };
  //     reader.readAsBinaryString(this.file);
  //   }
  // }
  // saveData() {
  //   this.api.post('question/uploadQuestions', { data: this.data }).subscribe((response: any) => {
  //     const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  //     console.log(blob);
  //     saveAs(blob, 'result.xlsx');
  //   });
  // }

