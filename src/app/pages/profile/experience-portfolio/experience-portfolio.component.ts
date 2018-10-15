import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalsComponent } from '../../../components/modals/modals.component';

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
  experiencePorfolioInformation: FormGroup;
  config = {
    class: "custom-modal modal-dialog-centered modal-lg"
  };
  id: any;
  images: any = {};

  distanceToTravel = [
    {
      value: "1-2 miles"
    },
    {
      value: "2-20 miles"
    },
    {
      value: "21-40 miles"
    },
    {
      value: "41-60 miles"
    },
    {
      value: "61-80 miles"
    },
    {
      value: "81-100 miles"
    },
    {
      value: "Nationwide"
    }
  ]

  typeOfWork = [
    {
      WorkOffered: "Aerial Photography",
      id: "1"
    },
    {
      WorkOffered: "Aerial Video",
      id: "2"
    },
    {
      WorkOffered: "Cinematography",
      id: "3"
    },
    {
      WorkOffered: "Residential Real Estate",
      id: "4"
    },
    {
      WorkOffered: "Commercial Real Estate",
      id:"5"
    },
    {
      WorkOffered: "Flight Training",
      id: "6"
    }
  ]
  workExperience = [
    {
      value: "Less than 1"
    },
    {
      value: "1-2"
    },
    {
      value: "2-3"
    },
    {
      value: "3-4"
    },
    {
      value: "4-5"
    },
    {
      value: "5-6"
    },
    {
      value: "6-7"
    },
    {
      value: "7-8"
    },
    {
      value: "8-9"
    },
    {
      value: "9-10"
    },
    {
      value: "10+"
    }
  ]
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
        
    }

  ngOnInit() {

 
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
  }
  togglePhotos() {
    this.showAddPhoto = !this.showAddPhoto;
  }

  getPortfolioImagesVideosByID(id) {
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
            } else {
              value.Path =  this.GetVimeoIDbyUrl(value.Path);
            }  
             this.videosList.push(value)
          }
          if(value.Type!="" && value.Type=="Image"){
             this.imagesList.push(value)
          }
        });
       } else {
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
          this.images.HeadshotImage = this.porfolioData.HeadshotImage;
          this.images.OtherPersonalImage = this.porfolioData.OtherPersonalImage;
          this.images.PassportImage = this.porfolioData.PassportImage;
          // this.porfolioData.ValidPassport =  this.porfolioData.ValidPassport == '1'
          // this.porfolioData.TravelOutsideUs =  this.porfolioData.TravelOutsideUs == '1'

          this.experiencePorfolioInformation.patchValue(Object.assign({}, this.porfolioData));
         
        }
      }
    );
  }

  addPortfolioImageVideo(type) {
    if(type =='Video') {
      this.addVideo.patchValue({
        UserId: this.porfolioData.UserId,
        PilotId: this.porfolioData.PilotId,
        ID:this.porfolioData.ID,
        Type: 'Video'
      });
      this.profileService.addProfilioImagesVideos(this.addVideo.value)
      .subscribe(
        data => {
          if(data.status) {
      
                this.getPortfolioImagesVideosByID(this.id)
         
          }
        }
      );
    }
    if(type =='Image') {
      this.profileService.uploadProfilePicture(this.imageFiles.uploadPorfolioImage)
      .subscribe(
        data => {
          if(data.status) {
            this.addPhotos.patchValue({
              UserId: this.porfolioData.UserId,
              PilotId: this.porfolioData.PilotId,
              ID:this.porfolioData.ID,
              Path: data.result,
              Type: 'Image'
            });
            this.profileService.addProfilioImagesVideos(this.addPhotos.value)
            .subscribe(
              data => {
                if(data.status) {
                    setTimeout(() => {
                      this.getPortfolioImagesVideosByID(this.id)
                    }, 5000);
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

    if(type=='uploadImage') {
      this.imageFiles.uploadPorfolioImage = file;
    }
    if(type== 'headshot'){
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
    this.loading = true;
    this.experiencePorfolioInformation.value.ValidPassport = this.experiencePorfolioInformation.value.ValidPassport.toString();
    this.experiencePorfolioInformation.value.TravelOutsideUs = this.experiencePorfolioInformation.value.TravelOutsideUs.toString();
    this.experiencePorfolioInformation.patchValue({
    UserId: this.id
    });
    var data = {
      UserId: this.porfolioData.UserId,
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
          this.bsModalRef = this.modalService.show(ModalsComponent, Object.assign({}, this.config, { initialState }))
          this.bsModalRef.content.closeBtnName = 'Close';
        } else if(!data.status) {
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

}
