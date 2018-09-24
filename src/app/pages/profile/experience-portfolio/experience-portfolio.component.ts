import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-experience-portfolio',
  templateUrl: './experience-portfolio.component.html',
  styleUrls: ['./experience-portfolio.component.scss']
})
export class ExperiencePortfolioComponent implements OnInit {
  selectedSuffix;
  suffix = [
      { name: 'Jr.' },
      { name: 'Sr.' }
  ]

  distanceToTravel = [
    {
      value: "1-2"
    },
    {
      value: "2-20"
    },
    {
      value: "21-40"
    },
    {
      value: "41-60"
    },
    {
      value: "61-80"
    },
    {
      value: "81-100"
    }
  ]

  typeOfWork = [
    {
      name: "Aerial Photography"
    },
    {
      name: "Aerial Video"
    },
    {
      name: "Cinematography"
    },
    {
      name: "Residential Real Estate"
    },
    {
      name: "Commercial Real Estate"
    },
    {
      name: "Flight Training"
    }
  ]
  workExperience = [
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
  constructor() { }

  ngOnInit() {
  }

}
