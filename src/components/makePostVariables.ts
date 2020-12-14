import { uploadFileByUUID } from "../config/firebase";
import { RawDraftContentState } from "react-draft-wysiwyg";
export async function makeNewVariables(form: any, other: any) {
  const { imageArr, fileArr, setSuccess, ...rest } = other;
  let images = null;
  if (imageArr.length) {
    images = await Promise.all(imageArr.map(uploadFileByUUID));
    setSuccess(images?.length + " 개의 사진 업로드 성공");
  }
  let files = null;
  if (fileArr.length) {
    files = await Promise.all(fileArr.map(uploadFileByUUID));
    setSuccess(files?.length + " 개의 파일 업로드 성공");
  }
  if (form.isHtml) {
    const html = form.html as RawDraftContentState;
    /* entityMap -> data -> _map이 Map 데이터타입(keyed collection) 안데 이걸 일반 object로 변환 처리 */
    form.html = JSON.parse(JSON.stringify(html));
    form.body = html.blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
  }
  // if ("tags" in form && "customTags" in form) {
  //   const tagSet = new Set([...form.tags, ...form.customTags]);
  //   form.tags = Array.from(tagSet);
  //   delete form.customTags;
  // }
  // else if ("tags" in form) {
  //   form.tag_map = form.tags.reduce((prev: any, curr: string) => {
  //     prev[curr] = true;
  //     return prev;
  //   }, {});
  // }
  delete form.isHtml;
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
    images = await Promise.all(imageArr.map(uploadFileByUUID));
    setSuccess(images?.length + " 개의 사진 업로드 성공");
  }
  if (images2) {
    images = [...images2, ...(images || [])];
  }
  let files = null;
  if (fileArr.length) {
    files = await Promise.all(fileArr.map(uploadFileByUUID));
    setSuccess(files?.length + " 개의 파일 업로드 성공");
  }
  if (form.isHtml) {
    const html = form.html as RawDraftContentState;
    form.html = JSON.parse(JSON.stringify(html));
    form.body = html.blocks
      .map((block) => (!block.text.trim() && "\n") || block.text)
      .join("\n");
  }
  delete form.isHtml;
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
