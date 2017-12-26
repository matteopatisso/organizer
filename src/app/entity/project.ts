import { Project as ProjectModel } from '../model/project'

export class Project {

  private constructor(private _id: string, public title: string) {}

  static create(project: ProjectModel) {
    return new Project(
      new Date().toISOString(),
      project.title
    );
  }
}
