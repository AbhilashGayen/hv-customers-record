import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import * as XLSX from 'xlsx';
import { Customer } from '../customers/customer.model';
import { CustomersService } from '../customers/customers.service';

@Component({
  selector: 'app-excel-import',
  templateUrl: './excel-import.component.html',
  styleUrls: ['./excel-import.component.scss'],
})
export class ExcelImportComponent implements OnInit {
  file: File = new File([''], '.xlsx');
  excelData: Customer[];
  showUploadButton: boolean = false;
  @Output() importExcelEvent = new EventEmitter<boolean>();

  constructor(private customersSvc: CustomersService) {}

  ngOnInit(): void {}

  arrayBuffer: any;

  incomingfile(event: any) {
    this.file = event.target.files[0];
  }

  showButton(value: boolean) {
    this.showUploadButton = value;
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let json = XLSX.utils.sheet_to_json(worksheet, { raw: true });

      this.excelData = json.map(
        (item: any) =>
          <Customer>{
            name:
              item['Company Name']?.toString() || '*********ENTER NAME********',
            location: item['Location'],
            email: item['E Mail Id']
              ?.toString()
              .replace(/\r?\n|\r/, '')
              .split(','),
            phone: item['Contact No']?.toString().split(','),
            contactPerson: item['Name']?.toString().split(','),
            contactRole: item['Role'],
            internalComment: item['Remarks']?.toString(),
            priority:
              item['Priority'] == 'A'
                ? 1
                : item['Priority'] == 'B'
                ? 2
                : item['Priority'] == 'C'
                ? 3
                : item['Priority'] == 'D'
                ? 4
                : 0,
            isMailSent: item['Mail Sent']?.toString() == 'Yes' ? true : false,
            vendorCode: item['Vendor Code']?.toString()
          }
      );
      if (this.excelData.length > 0) {
        this.showUploadButton = false;
      }
      this.excelData.forEach((row) => {
        this.customersSvc.createCustomer(row).subscribe(
          (res) => {
            console.log('Customer successfully created!');
          },
          (error) => {
            console.log(error);
          }
        );
      });
      this.importExcelEvent.emit(true);
    };
    fileReader.readAsArrayBuffer(this.file);
  }
}
