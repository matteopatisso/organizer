import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import {Project as ProjectEntity} from "./entity/project";
import {Project as ProjectModel} from "./model/project";

@Injectable()
export class RepositoryService {
  private db = new PouchDB('myDatabase');

  constructor() { }

  public getAllProjects() :Promise<ProjectModel[]> {
    return new Promise((resolve, reject) => {
      this.db.allDocs({ include_docs: true, descending: true })
        .then((docs) => {
          let projects: ProjectModel[] = [];
          docs.rows.forEach((row) => {
            projects.push(new ProjectModel(
              row.doc.title,
              row.doc._id
            ));
          });
          resolve(projects);
       })
        .catch(reject);
    })
  }

  public getProject(id: string) :Promise<ProjectModel>{
    return new Promise((resolve, reject) => {
      this.db.get(id)
        .then((projectEntity) => {
          resolve(new ProjectModel(
            projectEntity.title,
            projectEntity._id
          ));
        })
        .catch(reject);
    });
  }

  public addProject(project: ProjectModel) :Promise<ProjectModel> {
    let entity = ProjectEntity.create(project);
    return new Promise((resolve, reject) => {
      this.db.put(entity)
        .then(resolve)
        .catch(reject);
    });
  }


}
