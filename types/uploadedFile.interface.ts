export interface IUploadedFile {
    path: string;
    lastModified: number;
    lastModifiedData: Date;
    name: string;
    size: number;
    type: string;
    webkitRelativePath: string;
}