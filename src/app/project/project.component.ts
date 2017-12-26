import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RepositoryService} from "../repository.service";
import {Project} from '../model/project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.sass'],
  providers: [RepositoryService]
})
export class ProjectComponent implements OnInit, OnDestroy  {

  private parameterSubscribtion: any;
  public project: Project;

  constructor(private route: ActivatedRoute, private repository: RepositoryService) { }

  ngOnInit() {
    this.parameterSubscribtion = this.route.params.subscribe(params => {
      this.repository
        .getProject(params['id'])
        .then((project) => { this.project = project; });
    });
  }

  ngOnDestroy(): void {
    this.parameterSubscribtion.unsubscribe();
  }
}
