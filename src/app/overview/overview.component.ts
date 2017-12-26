import { Component, OnInit } from '@angular/core';
import {RepositoryService} from "../repository.service";
import { Project } from '../model/project';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.sass'],
  providers: [RepositoryService]
})
export class OverviewComponent implements OnInit {

  public allProjects: Project[];

  constructor(private repository: RepositoryService) {}

  ngOnInit() {

    this.repository.addProject(new Project("myTitle"));


    this.repository
      .getAllProjects()
      .then((allProjects) => {
        this.allProjects = allProjects;
      });


  }
}
