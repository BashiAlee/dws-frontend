import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../../components/modals/modals.component';
import { Croppie } from 'croppie/croppie';
import { CroppieDirective } from '../../../../angular-croppie-module/src/lib/croppie.directive';

declare var $: any;
@Component({
  selector: 'app-experience-portfolio',
  templateUrl: './experience-portfolio.component.html',
  styleUrls: ['./experience-portfolio.component.scss']
})
export class ExperiencePortfolioComponent implements OnInit {

  selectedWorkOffered: any  = [];
  bsModalRef: BsModalRef;
  porfolioData: any;
  showAddVideo: any = false;
  showAddPhoto: any = false;
  addVideo: FormGroup;
  addPhotos: FormGroup;
  videosList: any = [];
  imagesList: any = [];
  imageFiles: any = {};
  isAdmin: any;
  loading: any;
  selectedData: any;
  experiencePorfolioInformation: FormGroup;
  submittedPhotos: any;
  submittedVideos: any;
  updateVideos: any;
  updatePhotos: any;
  isUploading:any=false;
  config = {
    class: "custom-modal modal-dialog-centered modal-md"
  };
  id: any;
  images: any = {};

  distanceToTravel = [
    {
      'name': '25 Miles',
      'code': '1'
    },
    {
      'name': '50 Miles',
      'code': '2'
    },
    {
      'name': '75 Miles',
      'code': '3'
    },
    {
      'name': '100 Miles',
      'code': '4'
    },
    {
      'name': '150 Miles',
      'code': '5'
    },
    {
      'name': '200 Miles',
      'code': '6'
    },
    {
      'name': '300 Miles',
      'code': '7'
    },
    {
      'name': '500 Miles',
      'code': '8'
    },
    {
      'name': 'Nationwide',
      'code': '9'
    },
  ]

  typeOfWork = [
    {
      'name': 'Aerial Photography',
      'code': 'AF'
    },
    {
      'name': 'Aerial Video',
      'code': 'AV'
    },
    {
      'name': 'Cinematography',
      'code': 'CG'
    },
    {
      'name': 'Residential Real Estate',
      'code': 'RE'
    },
    {
      'name': 'Commerical Real Estate',
      'code': 'CE'
    },
    {
      'name': 'Flight Training',
      'code': 'FT'
    },
    {
      'name': 'Events',
      'code': 'E'
    },
    {
      'name': 'Weddings',
      'code': 'W'
    },
    {
      'name': 'Agriculture',
      'code': 'A'
    },
    {
      'name': 'Construction',
      'code': 'C'
    },
    {
      'name': 'Telecom',
      'code': 'T'
    },
    {
      'name': 'Utility',
      'code': 'U'
    },
    {
      'name': 'Roof Inspection',
      'code': 'RI'
    },
    {
      'name': 'Mapping/Surveying',
      'code': 'M/E'
    },
    {
      'name': 'Maritime',
      'code': 'MT'
    },
    {
      'name': 'Infrastructure',
      'code': 'I'
    },
    {
      'name': 'Public Safety & Emergency Management',
      'code': 'PSEM'
    },
    {
      'name': 'Law Enforcement and security',
      'code': 'LES'
    },
    {
      'name': 'Insurance',
      'code': 'INC'
    },
    {
      'name': 'Other',
      'code': 'O'
    },
  ]
  workExperience = [
    {
      'name': '0-1',
      'code': '1'
    },
    {
      'name': '1-2',
      'code': '2'
    },
    {
      'name': '2-3',
      'code': '3'
    },
    {
      'name': '3-4',
      'code': '4'
    },
    {
      'name': '4-5',
      'code': '5'
    },
    {
      'name': '5-6',
      'code': '6'
    },
    {
      'name': '6-7',
      'code': '7'
    },
    {
      'name': '7-8',
      'code': '8'
    },
    {
      'name': '8-9',
      'code': '9'
    },
    {
      'name': '9-10',
      'code': '10'
    },
    {
      'name': '10+',
      'code': '11'
    }
  ]
  headShotPicture: any;
  personalPicture: any;
  messages: any = {};
  imageChangedEvent: any;
  croppedImageData: any = {};
  imageChangedEventHeadShot: any;
  imageChangedPersonalPicture: any;
  croppedImageHeadShot: any;
  croppedPersonalPicture: any;
  success: any;
  error: any;
  loaders: any = {};
  @ViewChild('myInput')
myInputVariable: ElementRef;
  constructor(private formBuilder: FormBuilder, private profileService: ProfileService,
    private route: ActivatedRoute, private sanitize: DomSanitizer,
    private modalService: BsModalService,
    private authService: AuthenticationService, private router: Router) {

      if(this.router.url.split('/')[1] =='admin') {
        this.isAdmin = true;
      }
      this.route.parent.url.subscribe((urlPath) => {
        this.id = parseInt(urlPath[1].path);
    })
    $('html, body').stop().animate({scrollTop: 0}, 500);
    }

  ngOnInit() {

    // $('html,body').animate({
    //   scrollTop: $(".custom-tabs").offset().top
    // },
    // 'slow');

    console.log("dfsdf", this.id)
    this.addVideo = this.formBuilder.group({
      UserId: [this.id],
      PilotId: [],
      ID:[],
      Title: ['',Validators.required],
      Description:['',Validators.required],
      Path: ['',Validators.required],
      Type: ['']
    })
    this.addPhotos = this.formBuilder.group({
      UserId: [this.id],
      PilotId: [],
      ID:[],
      Title: ['',Validators.required],
      Description:['',Validators.required],
      Path: ['',Validators.required],
      Type: ['']
    })

    this.experiencePorfolioInformation = this.formBuilder.group({
      BusinessFacebook: [],
      BusinessWebsite: [],
      HeadshotImage: [],
      ID: [],
      Instagram: [],
      JobNotification: [],
      LinkedInBusinessPage: [],
      OtherPersonalImage: [],
      PassportImage: [],
      PersonalFacebook: [],
      PersonalLinkedInProfile: [],
      PilotId: [],
      TravelOutsideUs: [0],
      TwitterHandle: [],
      UserId: [this.id],
      ValidPassport:[0],
      ViemoChannel: [],
      YearsOfExperience: [],
      YoutubeChannel: []
    });
        // this.modalService._showModal(ModalsComponent)

      this.getWorkOffered(this.id)
      this.getPortfolioImagesVideosByID(this.id)
      this.geExperiencedPorfolioByID(this.id)
    // this.getPortfolioByID();
  }

  toggleVideo() {
    this.showAddVideo = !this.showAddVideo;
    this.updateVideos = false;
  }
  togglePhotos() {
    this.showAddPhoto = !this.showAddPhoto;
    this.updatePhotos = false;
  }

  get videosForm() { return this.addVideo.controls; }
  get photosForm() { return this.addPhotos.controls; }

  getPortfolioImagesVideosByID(id) {
    this.loaders.VideosLoader = true;
    this.loaders.PhotosLoader = true;
    this.imagesList = [];
    this.videosList = [];
    this.profileService.getPortfolioVideosImagesByID(id)
    .subscribe(
      data => {
       if(data.status && data.result.length) {
        data.result.forEach(value => {
          if(value.Type!="" && value.Type=="Video"){
            var videoClient = value.Path.search("you");
            if(videoClient>-1) {
              value.Path = this.getYouTubeId(value.Path);
              this.loaders.VideosLoader = false;
            } else {
              value.Path =  this.GetVimeoIDbyUrl(value.Path);
              this.loaders.VideosLoader = false;
            }
             this.videosList.push(value)
          } else {
            this.loaders.VideosLoader = false;
          }
          if(value.Type!="" && value.Type=="Image"){
             this.imagesList.push(value)
             this.loaders.PhotosLoader = false;
          } else {
            this.loaders.PhotosLoader = false
          }
          // if(value.Type!="") {
          //   this.loaders.VideosLoader = false;
          //   this.loaders.PhotosLoader = false;
          // }
        });
       } else {
        this.loaders.VideosLoader = false;
        this.loaders.PhotosLoader = false;
         this.videosList = [];
         this.imagesList = [];
       }
      }
    );
  }
  geExperiencedPorfolioByID(id) {
    this.profileService.getExperiencePorfileWorkByID(id)
    .subscribe(
      data => {
        if(data.status) {
          this.porfolioData = data.result;

          // this.check(this.porfolioData.HeadshotImage, this.headShotPicture)
          // this.check(this.porfolioData.OtherPersonalImage,this.personalPicture)
          // this.check(this.porfolioData.PassportImage,this.images.PassportImage)
          this.headShotPicture = this.porfolioData.HeadshotImage;
          this.personalPicture = this.porfolioData.OtherPersonalImage;
          this.images.PassportImage = this.porfolioData.PassportImage;
          // this.porfolioData.ValidPassport =  this.porfolioData.ValidPassport == '1'
          // this.porfolioData.TravelOutsideUs =  this.porfolioData.TravelOutsideUs == '1'

          this.experiencePorfolioInformation.patchValue(Object.assign({}, this.porfolioData));

        }
      }
    );
  }

  addPortfolioImageVideo(type) {
    this.submittedVideos = true;
    if(type =='Video') {
      this.loaders.addVideoLoader = true;
      if (this.addVideo.invalid) {
        this.loaders.addVideoLoader = false;
        return;
      }
      this.addVideo.patchValue({
        UserId: this.id,
        PilotId: this.porfolioData.PilotId,
        ID:this.porfolioData.ID,
        Type: 'Video'
      });
      this.profileService.addProfilioImagesVideos(this.addVideo.value)
      .subscribe(
        data => {
          if(data.status) {

                this.getPortfolioImagesVideosByID(this.id)
                this.addVideo.patchValue({
                  Title: '',
                  Description:'',
                  Path: '',
                  Type: ''
                });
                this.loaders.addVideoLoader = false;

          } else {
            this.loaders.addVideoLoader = false;
          }
        }
      );
    }
    if(type =='Image') {
      this.loaders.addPhotoLoader = true;
      this.submittedPhotos = true;
      this.profileService.uploadProfilePicture(this.imageFiles.uploadPorfolioImage)
      .subscribe(
        data => {
          if(data.status) {
            this.addPhotos.patchValue({
              UserId: this.id,
              PilotId: this.porfolioData.PilotId,
              ID:this.porfolioData.ID,
              Path: data.result,
              Type: 'Image'
            });
            this.myInputVariable.nativeElement.value = "";
            if (this.addPhotos.invalid) {
              this.loaders.addPhotoLoader = false;
              return;

            }
            this.profileService.addProfilioImagesVideos(this.addPhotos.value)
            .subscribe(
              data => {
                if(data.status) {
                    setTimeout(() => {
                      this.getPortfolioImagesVideosByID(this.id)
                    }, 5000);

                    this.imageFiles.uploadPorfolioImage = '';
                    this.addPhotos.patchValue({
                      Path: '',
                      Type: '',
                      Description: '',
                      Title: ''
                    });
                    this.loaders.addPhotoLoader = false;
                } else {
                  this.loaders.addPhotoLoader = false;
                }
              }
            );
          }
        }
      )
    }
  }
  getYouTubeId(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return "https://www.youtube.com/embed/"+match[2];
    } else {
      return 'error';
    }
  }

  GetVimeoIDbyUrl(url) {
    var id = false;
    $.ajax({
      url: 'https://vimeo.com/api/oembed.json?url='+url,
      async: false,
      success: function(response) {
        if(response.video_id) {
          id = response.video_id;
        }
      }
    });
    return "https://player.vimeo.com/video/"+id;
  }

  getWorkOffered(id) {
    var test = [];
    this.profileService.getWorkOfferedByID(id)
    .subscribe(
      data => {
       if(data.status) {
          if(data.result && data.result.length) {
            data.result.forEach(value => {
              test.push(value.WorkOffered)
            });
          }

         this.selectedWorkOffered = test;
       }
      }
    )
  }

  uploadImage(file, type) {
    console.log("this is data", file);

    if(type=='uploadImage') {
      this.imageFiles.uploadPorfolioImage = file;
    }
    if(type== 'headshot'){
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          console.log("DDD", event.target.result)
          this.images.HeadshotImage = event.target.result;

        }
        reader.readAsDataURL(file.target.files[0]);
      }

      this.imageFiles.headshotImage = file;
      this.profileService.uploadProfilePicture(this.imageFiles.headshotImage)
      .subscribe(
        data => {
         if (data.status) {
            this.experiencePorfolioInformation.patchValue({
              HeadshotImage: data.result
            })
          }
        }
      )
    }
    if(type=='personal-pic'){
      this.imageFiles.personalImage = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.images.OtherPersonalImage = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(this.imageFiles.personalImage)
      .subscribe(
        data => {
         if (data.status) {
            this.experiencePorfolioInformation.patchValue({
              OtherPersonalImage: data.result
            })
          }
        }
      )
    }
    if(type== 'passport-pic'){
      this.imageFiles.passportImage = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.images.PassportImage = event.target.result;
        }
        reader.readAsDataURL(file.target.files[0]);
      }
      this.profileService.uploadProfilePicture(this.imageFiles.passportImage)
      .subscribe(
        data => {
         if (data.status) {
            this.experiencePorfolioInformation.patchValue({
              PassportImage: data.result
            })
          }
        }
      )
    }
  }

  save() {
    this.success = false;
    this.error = false;
    this.loading = true;
    this.experiencePorfolioInformation.value.ValidPassport = this.experiencePorfolioInformation.value.ValidPassport.toString();
    this.experiencePorfolioInformation.value.TravelOutsideUs = this.experiencePorfolioInformation.value.TravelOutsideUs.toString();
    this.experiencePorfolioInformation.patchValue({
    UserId: this.id
    });
    var data = {
      UserId: this.id,
      PilotId: this.porfolioData.PilotId,
      WorkOffered: this.selectedWorkOffered
    }

    this.profileService.addWorkOffered(data)
    .subscribe(
      data => {
      }
    )
    this.profileService.updateExperienceWorkPortfolio(this.experiencePorfolioInformation.value)
    .subscribe(
      data => {
        if(data.status) {
          this.loading = false;
          const initialState = {
            type: 'success',
            page: 'document-declaration',
            id: this.id
          }
          this.success = true;
          this.error = false;
          // this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          // this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status) {
          this.success = false;
          this.error = true;
          const initialState = {
            type: 'error'
          }
          this.loading = false;
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        }
      }
    )
  }

  openModalWithClass(template: TemplateRef<any>,id) {
    var initialState = {
      id: id
    }
    var config  = {
      class: 'custom-modal modal-dialog-centered modal-lg'
    }
    this.selectedData = initialState;
    this.bsModalRef = this.modalService.show(template, Object.assign({}, config))

  }

  deleteByID() {
    this.profileService.deletePortfolioVideosAndImages(this.selectedData.id)
    .subscribe(data => {
      if(data.status) {
        this.getPortfolioImagesVideosByID(this.id)
        this.bsModalRef.hide();
      }
    })
  }

  zoomImage(value) {
    var initialState  = {
      data: value,
      type: 'zoom'
    };
    var config  = {
      class: 'custom-modal modal-dialog-centered modal-lg'
    }
    this.selectedData = initialState;
    this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
  }
  zoomPic(url) {
    console.log("DFDDDD", url)
    var initialState  = {
      data: url,
      type: 'zoom-admin'
    };
    var config  = {
      class: 'custom-modal modal-dialog-centered modal-lg'
    }
    this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))

}
  uploadCoverImage(file, type) {

    if(type=='headshot') {
      this.messages.headshotImageChoosed = true;
      var target = file.target || file.srcElement
      this.croppedImageData.imageHeadShotName = target.files[0].name;
      this.imageChangedEventHeadShot = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.croppieDirective.croppie.bind({ url: event.target.result});
        }
        reader.readAsDataURL(file.target.files[0]);
      }
    }
    if(type =='other-personal') {
      this.messages.personalImageChoosed = true;
      var target = file.target || file.srcElement
      this.croppedImageData.imageChangedPersonalPicture = target.files[0].name;
      this.imageChangedPersonalPicture = file;
      if (file.target.files && file.target.files[0]) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.croppieDirective.croppie.bind({ url: event.target.result});
          // this.headShotPicture = event.target.result
          // this.displayPicture = event.target.result;

        }
        reader.readAsDataURL(file.target.files[0]);
      }

    }
  }
  editRow(value, type) {
    if(type=='photos') {
      // this.selectedDrone = value;
      this.showAddPhoto = true;
      this.updatePhotos = true;
      this.addPhotos.patchValue(Object.assign({}, value));
    }
    if(type=='videos') {
      // this.selectedEquipment = value;
      // this.updateEquipment = true;
      this.showAddVideo = true;
      this.updateVideos = true;
      this.addVideo.patchValue(Object.assign({}, value));
    }

  }
  updatePhotosByID() {
    this.loaders.addPhotoLoader = true;
    var data = Object.assign({}, this.addPhotos.value)
    this.profileService.updatePortfolioVideosAndImages(data)
    .subscribe(
      data => {
        if(data.status) {
          this.getPortfolioImagesVideosByID(this.id);
          this.addPhotos.patchValue({
            Path: '',
            Description: '',
            Title: ''
          });
          this.loaders.addPhotoLoader = false;
        } else {
          this.loaders.addPhotoLoader = false;
        }
      }
    )
  }
  updateVideoByID() {
    this.loaders.addVideoLoader = true;
    var data = Object.assign({}, this.addVideo.value)
    this.profileService.updatePortfolioVideosAndImages(data)
    .subscribe(
      data => {
        if(data.status) {
          this.getPortfolioImagesVideosByID(this.id);
          this.addVideo.patchValue({
            Path: '',
            Description: '',
            Title: ''
          });
          this.loaders.addVideoLoader = false;
        } else {
          this.loaders.addVideoLoader = false;
        }
      }
    )
  }
  uploadCroppedImage(file, type) {

    if(type=='headshot'){
      this.messages.uploadingHeadShotImage = true;
      this.messages.headshotImageChoosed = false;
      fetch(file.headshotbase64)
      .then(res => res.blob())
      .then(blob => {
        var file1 = new File([blob], file.imageChangedEventHeadShot);
        this.profileService.uploadCroppedImage(file1, file.imageChangedEventHeadShot)
          .subscribe(data => {
            if (data) {
              if(data.status) {
                this.experiencePorfolioInformation.patchValue({
                  HeadshotImage: data.result
                })
              }
              this.messages.uploadingHeadShotImage = false;
            }

          })
      })

    }
    if(type=='other-personal'){
      this.messages.uploadingPersonalImage = true;
      this.messages.personalImageChoosed = false;
      fetch(file.personalbase64)
      .then(res => res.blob())
      .then(blob => {
        var file1 = new File([blob], file.imageChangedPersonalPicture);
        this.profileService.uploadCroppedImage(file1, file.imageChangedPersonalPicture)
          .subscribe(data => {
            if (data) {
              if(data.status) {
                this.experiencePorfolioInformation.patchValue({
                  OtherPersonalImage: data.result
                })
              }
              this.messages.uploadingPersonalImage = false;
            }

          })
      })
    }


  }

  public croppieOptions: Croppie.CroppieOptions = {
    boundary: { width: 200, height: 200 },
    viewport: { width: 160, height: 160 },

    enableOrientation: true,
  };
  @ViewChild('croppie')


  public croppieDirective: CroppieDirective;

  handleUpdate(data, type) {
    var x = this.croppieDirective.croppie.result('canvas','original').then(function (src) {
      return src;

  });

  this.deepdive(x, type);

  }

  deepdive(e, type){
    e.then((value)=> {
      if(type=='headshot'){
        this.croppedImageData.headshotbase64 = value;
        this.croppedImageHeadShot = value;
        this.headShotPicture = value;
      }
      if(type=='other-personal') {
        this.croppedImageData.personalbase64 = value;
        this.croppedPersonalPicture = value;
        this.personalPicture = value;
      }
    });

  }
  goBack() {
    this.router.navigate(['/user/profile/'+this.id+'/equipment']);
  }

  check(url, val) {
    this.authService.checkImageExists(url)
    .subscribe(data =>{
      val = url;
      console.log("hereeee", url)
      // this.userInfo.ProfileImage = url;
    },
    err => {
      val = "";
      // this.userInfo.ProfileImage = "";
    })
  }


}
