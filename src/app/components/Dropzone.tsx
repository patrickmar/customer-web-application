import { IString, ITouchedBoolean } from "../utils/Interface";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import { HiPhoto } from "react-icons/hi2";

type IDrop = {
  banner: string[];
  className: string;
  touched?: ITouchedBoolean;
  formErrors?: IString | any;
  onBannerChange: (file: any) => void;
};

const Dropzone = (props: IDrop) => {
  const { className, onBannerChange } = props;
  const [files, setFiles] = useState<any>([]);
  const [rejected, setRejected] = useState<any>([]);

  const onDrop = useCallback(
    (acceptedFiles: Array<any>, rejectedFiles: Array<any>) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles: any) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);

        onDropHandler(acceptedFiles);
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles: any) => [
          ...previousFiles,
          ...rejectedFiles,
        ]);
      }
    },
    []
  );

  const onDropHandler = (files: Array<any>) => {
    files.map((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        //store result into your state array.
        onBannerChange(event.target?.result);
        console.log(event.target?.result);
      };
      reader.readAsDataURL(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1000, // 10MB
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: any) => {
    setFiles((files: any) => files.filter((file: any) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const removeRejected = (name: any) => {
    setRejected((files: any) =>
      files.filter(({ file }: any) => file.name !== name)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file: any) => formData.append("file", file));
    formData.append("upload_preset", "value");

    const URL = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL!, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

    console.log(data);
  };

  return (
    <>
      <div
        {...getRootProps({
          className: className,
        })}
      >
        <input {...getInputProps()} />

        <div className="flex flex-col items-center justify-center space-y-3">
          {/* <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
            <BiUpload className="w-5 h-5 fill-current" />
          </span> */}
          <HiPhoto
            className="mx-auto h-12 w-12 text-gray-300"
            aria-hidden="true"
          />
          {isDragActive ? (
            <>
              <p>Drop the files here ...</p>
            </>
          ) : (
            <>
              <p>Drag & drop files here, or click to select files</p>
              <p className="text-xs leading-5 text-gray-600">
                PNG, JPG, JPEG up to 10MB
              </p>
            </>
          )}
        </div>
      </div>

      {/* Preview */}
      <section className="mt-10">
        {/* Accepted files */}
        {files.length > 0 && (
          <div className="flex justify-between">
            <h3 className="title text-lg font-semibold text-neutral-600 pb-3">
              Preview
            </h3>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] tracking-wider font-bold text-neutral-500 border border-red-400 rounded-md px-3 hover:bg-red-400 hover:text-white transition-colors"
            >
              Remove all
            </button>
          </div>
        )}

        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-10">
          {files.map((file: any) => (
            <li key={file.name} className="relative h-32 rounded-md shadow-lg">
              <Image
                src={file.preview}
                alt={file.name}
                width={100}
                height={100}
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
                className="h-full w-full object-contain rounded-md"
              />
              <button
                type="button"
                className="w-7 h-7 border border-red-400 bg-red-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                onClick={() => removeFile(file.name)}
              >
                <FaTimes className="w-5 h-5 fill-white hover:fill-red-400 transition-colors" />
              </button>
              <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                {file.name}
              </p>
            </li>
          ))}
        </ul>

        {/* Rejected Files */}
        {/* <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
          Rejected Files
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }: any) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error: any) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-red-400 rounded-md px-3 hover:bg-red-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul> */}
      </section>
    </>
  );
};

export default Dropzone;
