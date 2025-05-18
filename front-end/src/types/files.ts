export interface FileInfo {
  name: string; // nombre del archivo
  size: number; // bytes
  createdAt: Date;
}
export interface IncomingFileInfo {
  name: string; // nombre del archivo
  size: number; // bytes
  createdAt: string;
}
