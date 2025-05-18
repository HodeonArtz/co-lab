export interface FileInfo {
  name: string; // nombre del archivo
  fullPath: string; // ruta absoluta
  size: number; // bytes
  isDirectory: boolean;
  createdAt: Date;
  updatedAt: Date;
}
