import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import {Project as ProjectEntity} from "./entity/project";
import {Project as ProjectModel} from "./model/project";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class RepositoryService {
  private db = new PouchDB('myDatabase');
  private _allProjectsSubject: BehaviorSubject<ProjectModel[]>;
  private _dataStore: ProjectModel[];

  constructor() {
    this._allProjectsSubject = <BehaviorSubject<ProjectModel[]>>new BehaviorSubject([]);
    this._dataStore = [];
  }

  get allProjects() :Observable<ProjectModel[]>{
    return this._allProjectsSubject.asObservable();
  }

  public getAllProjects() :Promise<ProjectModel[]> {
    return new Promise((resolve, reject) => {
      this.db.allDocs({ include_docs: true, descending: true })
        .then((docs) => {
          this._dataStore = [];
          docs.rows.forEach((row) => {
            this._dataStore.push(new ProjectModel(
              row.doc.title,
              row.doc._id
            ));
          });
          resolve(this._dataStore);
          this.notifyObservers();
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
        .then((result) => {resolve(result.id)})
        .catch(reject);
    });
  }


  private notifyObservers() {
    //this._allProjects.next(Object.assign({}, this._dataStore).allProjects);
    this._allProjectsSubject.next(this._dataStore);
  }
}
