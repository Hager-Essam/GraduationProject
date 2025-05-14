import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.scss'
})
export class LearnComponent {
  videoUrl = 'https://www.youtube.com/watch?v=rDGqkMHPDqE';

  skeletonResources = [
    {
    title: 'biodigital',
    url: 'https://www.biodigital.com/',
  },
    {
    title: 'zygotebody',
    url: 'https://www.zygotebody.com/?page=%3C/script%3E%3Csvg/onload=confirm(/OPENBUGBOUNTY/',
  },

  ]


  pdfResources = [
    {
      title: 'Anatomy of Bones & Joints (PDF)',
      url: 'https://docs.neu.edu.tr/staff/wayne.fuller/Handout%205.%20Anatomy%20of%20Bones%20&%20Joints_5.pdf'
    },
    {
      title: 'Skeletal Lab Manual (PDF)',
      url: 'https://clinicalanatomy.ca/labs/411skeletal.pdf'
    }
  ];

  externalLinks = [
    {
      title: 'Visible Body – Skeleton',
      url: 'https://www.visiblebody.com/learn/skeleton'
    },
    {
      title: 'Cleveland Clinic – Bones',
      url: 'https://my.clevelandclinic.org/health/body/25176-bones'
    },
    {
      title: 'Hopkins Medicine – Anatomy of the Bone',
      url: 'https://www.hopkinsmedicine.org/health/wellness-and-prevention/anatomy-of-the-bone'
    },
    {
      title: 'Bones Types',
      url: 'https://www.kenhub.com/en/library/anatomy/bones'
    },
  ];
}
