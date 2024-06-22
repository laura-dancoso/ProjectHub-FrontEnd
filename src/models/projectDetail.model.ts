export interface ProjectDetail{
    ProjectId: number,
    Title: string,
    Description: string,
    CreationDate: string,
    Technologies: string[],
    RepoUrl: string,
    OtherLinks: Link[],
    DegreeName: string,
    SubjectName: string,
    ProfessorName: string,
    Members: string[],
    ProjectUrl: string
}

export interface Link{
    Name: string,
    Url: string
}