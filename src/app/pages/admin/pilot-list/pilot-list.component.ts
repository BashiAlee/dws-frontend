import { JobService } from './../../../services/job/job.service';
import { Component, OnInit, AfterViewInit, OnChanges, DoCheck, AfterContentChecked } from '@angular/core';
import { PilotService } from '../../../services/admin/pilots/pilots.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NotificationService } from '../../../services/notifications/notification.service';


@Component({
  selector: 'app-pilot-list',
  templateUrl: './pilot-list.component.html',
  styleUrls: ['./pilot-list.component.scss']
})
export class PilotListComponent implements OnInit {
  paginationData: any = {};
  pageNumber: any = 10;
  maxSize = 5;
  bigTotalItems: any;
  bigCurrentPage = 1;
  pendingList: any = [];
  approvedList: any = [];
  isApprovedPilots: any = true;
  keyword: any;
  selectedOption: any;
  states: any = [];
  selectedState: any;
  selectedCountry: any;
  countires: any = [];
  allPilots: any = [];
  jobId: any;
  creatorId: any;
  pilotIds: any = [];
  apiResponse: any = {};
  timeout: any = 0;
  msg: any;
  constructor(
    private pilotService: PilotService,
    private router: Router,
    private route: ActivatedRoute,
    private jobService: JobService,
    private notification: NotificationService
  ) { }
  pilotList: any;
  search = [
    {
      name: 'City',
      value: 'city'
    },
    {
      name: 'State',
      value: 'state'
    },
    {
      name: 'Country',
      value: 'country'
    },
    {
      name: 'Zipcode',
      value: 'zipcode'
    }
    // {
    //   name: 'Jobs Title',
    //   value: 'jobs'
    // }
  ];

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      console.log(params); // {order: "popular"}
      this.jobId = params.jobId;
      this.creatorId = params.creatorId;
    });
    console.log('this is data from component', this.jobId);
    console.log('this is datakjgbt', this.creatorId);
    // setTimeout(() => {
    //   var url_string = window.location.href;
    //   var url = new URL(url_string);
    //   var pageNo = parseInt(url.searchParams.get('page-no'));
    //   this.bigCurrentPage = parseInt(pageNo);
    // }, 500);

    //  var url_string = window.location.href;
    //   var url = new URL(url_string);
    //   var pageNo = parseInt(url.searchParams.get('page-no'));
    // this.bigCurrentPage = parseInt(pageNo);
    // if(pageNo) {
    //     var fromLimit = pageNo.toString() +'0'
    //     var data = {
    //       from: this.pageNumber, //skip
    //       to: parseInt(fromLimit) - 10 //limit
    //     }
    //     this.bigCurrentPage = pageNo;
    //     console.log('TTTTT', this.bigCurrentPage)
    //     console.log('aaaa', pageNo)
    //     this.getAllPilots(data.from, data.to);
    this.onPageLoad();
    // } else {
    //   console.log('Elseee')
    // this.getAllPilots(this.pageNumber, 0);
    // }

    // this.getAllPilots(this.pageNumber, 0);
    // this.getAllStates();
    // setTimeout(() => {
    //   this.getSpecificPilotsInit()
    // }, 500);
    this.getAllStates();
    this.getAllCountries();
  }

  onPageLoad() {
    var fromLimit = this.bigCurrentPage.toString() + '0';
    var data = {
      from: this.pageNumber, //skip //offsert
      to: parseInt(fromLimit) - 10 //limit
    };
    if (this.isApprovedPilots) {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getAllApprovedPilots(data.from, data.to);
    } else {
      this.bigCurrentPage = 1;
      this.pageNumber = 10;
      this.getAllRejectedPilots(data.from, data.to);
    }
  }
  assignPilot(jobId, pilotId) {
    this.apiResponse.fail = false;
    this.apiResponse.success = false;
    const data = {
      JobId: jobId,
      PilotIds: [{
        PilotId: pilotId,
        JobStatus: 'assigned',
      }],
      Status: 'assigned',
    };

    this.jobService.assignPolits(data).subscribe(data => {
      // console.log('this is data', this.creatorId);
      const notificationdata = [
        {
          UserId: pilotId,
          Message: 'A Job has been assigned to you',
          JobId: jobId,
        },
        {
          UserId: parseInt(this.creatorId, 10),
          Message: 'Pilot(s) are assigned to your Job',
          JobId: jobId,
        }
      ];
      if (data.status) {
        notificationdata.forEach(element => {
          this.notification.saveNotification(element)
            .subscribe(data1 => {
            });
        });
        this.apiResponse.success = true;
        this.msg = data.message;
        this.timeout = 2500;
      } else {
        // console.log('this is called');
        this.apiResponse.fail = true;
        this.msg = data.message,
          this.timeout = 2500
      }
    });

  }
  getAllRejectedPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllRejectedPilots(data).subscribe(data => {
      if (data.status && data.result) {
        this.pendingList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (data.status && !data.result) {
        this.pendingList = [];
        this.bigTotalItems = 0;
      }
    });
  }
  getAllApprovedPilots(num, val) {
    var data = { from: val, to: num };
    this.pilotService.getAllApprovedPilots(data).subscribe(data => {
      if (data.status && data.result) {
        this.approvedList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else if (data.status && !data.result) {
        this.approvedList = [];
        this.bigTotalItems = 0;
      }
    });
  }

  getAllStates() {
    this.keyword = '';
    this.pilotService.getAllStates().subscribe(data => {
      if (data.status == true) {
        this.states = data.result;
        // console.log('All States ---> ', this.states);
      } else {
        console.log('States Not Found !!');
      }
    });
  }

  getAllCountries() {
    this.pilotService.getAllCountries().subscribe(data => {
      if (data.status == true) {
        this.countires = data.result;
        this.keyword = 231;
        // console.log('All Countries ---> ', this.countires);
      } else {
        console.log('Countries Not Found !!');
      }
    });
  }

  getPilots(num, val) {
    this.getAllApprovedPilots(num, val);
  }

  openApprovedPilot() {
    this.isApprovedPilots = true;
    this.onPageLoad();
  }

  openPendingPilot() {
    this.isApprovedPilots = false;
    this.onPageLoad();
  }

  searchPilot() {
    var fromLimit = this.bigCurrentPage.toString() + '0';
    var keywordString = this.keyword.toString();
    var searchData = {
      SearchType: this.selectedOption,
      SearchKeyword: keywordString,
      Offset: parseInt(fromLimit) - 10,
      Limit: this.pageNumber
    };
    this.pilotService.searchPilotList(searchData).subscribe(data => {
      if (data.status) {
        this.approvedList = data.result;
        this.bigTotalItems = parseInt(data.totalRecord);
      } else {
        this.approvedList = [];
      }
    });
  }

  // getSpecificPilots() {
  //   this.router.navigate([], { queryParams: { 'page-no': this.bigCurrentPage }})
  //   setTimeout(() => {
  //     var fromLimit = this.bigCurrentPage.toString() +'0'
  //     var url_string = window.location.href;
  //     var url = new URL(url_string);
  //     var pageNo = url.searchParams.get('page-no');
  //     console.log('page Number:   ', url)
  //     var data = {
  //         from: this.pageNumber, //skip
  //         to: parseInt(fromLimit) - 10 //limit
  //     }
  //     this.getPilots(data.from,data.to)
  //   }, 100);

  // }

  convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
      var line = '';
      for (var index in array[i]) {
        if (line != '') line += ',';

        line += array[i][index];
      }

      str += line + '\r\n';
    }

    return str;
  }

  exportCSVFile(headers, items, fileTitle) {
    if (headers) {
      items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = this.convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv';

    var blob = new Blob([csv], {
      type: 'text/csv;charset=utf-8;'
    });
    if (navigator.msSaveBlob) {
      // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
      var link = document.createElement('a');
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        var url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', exportedFilenmae);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }

  downloadCSV(value) {
    this.pilotService.exportPilots(value).subscribe(data => {
      if (data.status) {
        this.allPilots = data.result;
        var headers = {
          firstName: 'First Name'.replace(/,/g, ''), // remove commas to avoid errors
          lastName: 'Last Name',
          email: 'Email',
          phoneNumber: 'Phone Number'
        };

        var itemsFormatted = [];

        // format the data
        this.allPilots.forEach(item => {
          itemsFormatted.push({
            firstName: item.FirstName,
            lastName: item.LastName,
            email: item.Email,
            phoneNumber: item.Phone
          });
        });
      }
      this.exportCSVFile(headers, itemsFormatted, 'pilots'); // call the exportCSVFile() function to process the JSON and trigger the download
    });
  }
}
