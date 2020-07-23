import React from "react";
import ImageUploader from "react-images-upload";
export default function CustomImageUploader({ setImageArr }: any) {
  function imageUploaderHandler(files: File[], pictures: string[]) {
    setImageArr(files);
  }
  return (
    <ImageUploader
      withIcon={true}
      buttonText="이미지를 첨부하세요"
      onChange={imageUploaderHandler}
      withPreview={true}
      imgExtension={[".jpg", ".gif", ".png", ".gif"]}
      maxFileSize={5242880}
    />
  );
}
