import { useState, useRef, useEffect } from "react";
import { ReactComponent as AddIcon } from "assets/icons/add.svg";
import File from "./File";

const DropZone = (props) => {
  const { files, setFiles } = props;
  const [isDragging, setIsDragging] = useState(false);
  const [filesPreview, setFilesPreview] = useState([]);
  const input = useRef(null);
  return (
    <>
      <input
        type="file"
        name="media"
        ref={input}
        accept="video/*, video/x-m4v, video/webm, video/x-ms-wmv, video/x-msvideo, video/3gpp, video/flv, video/x-flv, video/mp4, video/quicktime, video/mpeg, video/ogv, .ts, .mkv, image/*, image/heic, image/heif"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files[0];
          if (
            file?.type.startsWith("image") ||
            file?.type.startsWith("video")
          ) {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.addEventListener("load", (e) => {
              setFilesPreview((prev) => {
                let newArray = Array.of(...prev);
                newArray.push(e.currentTarget.result);
                return newArray;
              });
            });
            setFiles((prev) => {
              let newArray = Array.of(...prev);
              newArray.push(file);
              return newArray;
            });
          }
        }}
      />
      <div
        className="w-full min-h-[200px]"
        onDragOver={() => {
          setIsDragging(true);
        }}
        onDragLeave={() => {
          setIsDragging(false);
        }}
      >
        {isDragging ? (
          <div
            className="dropzone flex justify-center items-center
            p-5 border-dashed border-[var(--primary-color)] border-2 bg-300 cursor-pointer min-h-[200px]"
            // onDragEndCapture={(e) => { //TODO:search for a way to implement the drop function
            //   setIsDragging(false);
            // }}
          >
            أفلت الملفات هنا
          </div>
        ) : (
          <div className="flex flex-col items-start gap-3">
            <div
              className="dropzone grid gap-2 w-full grid-cols-6
            p-5 border-solid border-[var(--primary-color)] border-2 bg-300 min-h-[200px]"
            >
              {filesPreview &&
                filesPreview.map((filePreview, i) => (
                  <File
                    filePreview={filePreview}
                    file={files[i]}
                    setFiles={setFiles}
                    setFilesPreview={setFilesPreview}
                  />
                ))}
            </div>
            <button
              onClick={() => input.current.click()}
              className="bg-[var(--primary-color)] h-[50px] w-[50px] radius "
            >
              <AddIcon stroke="white" />
            </button>
          </div>
        )}
      </div>
    </>
  );
};
export default DropZone;
