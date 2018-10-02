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
  constructor() { }

  ngOnInit() {
  }

}
