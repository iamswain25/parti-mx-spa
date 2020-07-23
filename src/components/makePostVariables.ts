import { uploadFileGetUriArray } from "../config/firebase";

export async function makeNewVariables(form: any, other: any) {
  const { imageArr, fileArr, setSuccess, ...rest } = other;
  let images = null;
  if (imageArr.length) {
    images = await Promise.all(imageArr.map(uploadFileGetUriArray));
    setSuccess(images?.length + " 개의 사진 업로드 성공");
  }
  let files = null;
  if (fileArr.length) {
    files = await Promise.all(fileArr.map(uploadFileGetUriArray));
    setSuccess(files?.length + " 개의 파일 업로드 성공");
  }
  return {
    images,
    files,
    ...form,
    ...rest,
  };
}

export async function makeUpdateVariables(form: any, other: any) {
  const { imageArr, fileArr, images2, files2, setSuccess, ...rest } = other;
  let images = null;

  if (imageArr.length) {
    images = await Promise.all(imageArr.map(uploadFileGetUriArray));
    setSuccess(images?.length + " 개의 사진 업로드 성공");
  }
  if (images2) {
    images = [...images2, ...(images || [])];
  }
  let files = null;
  if (fileArr.length) {
    files = await Promise.all(fileArr.map(uploadFileGetUriArray));
    setSuccess(files?.length + " 개의 파일 업로드 성공");
  }
  if (files2) {
    files = [...files2, ...(files || [])];
  }
  return {
    images,
    files,
    ...form,
    ...rest,
  };
}
