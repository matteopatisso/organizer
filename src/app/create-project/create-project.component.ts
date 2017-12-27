import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Project as ProjectModel} from '../model/project';
import {RepositoryService} from "../repository.service";
import { Router }          from '@angular/router';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.sass'],
  providers: [RepositoryService]
})
export class CreateProjectComponent implements OnInit {

  createProjectForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private repository: RepositoryService,
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.createProjectForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  onSubmit({ value, valid }: { value: ProjectModel, valid: boolean }) {
    if(!valid) {
      console.log('not valid');
      return;
    }

    this.repository
      .addProject(value)
      .then((id) => {
        this.router.navigate(['project', id]);
      });

  }

  ngOnInit() {
  }

}
