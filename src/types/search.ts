export interface ImageObject {
  assetId: string | null;
  base64: string | null;
  duration: number | null;
  exif: any | null;
  fileName: string;
  fileSize: number;
  height: number;
  mimeType: string;
  rotation: number | null;
  type: string;
  uri: string;
  width: number;
}
