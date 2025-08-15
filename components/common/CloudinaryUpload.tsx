"use client";

import { CldUploadWidget } from "next-cloudinary";
import { FaPlus } from "react-icons/fa6";
import styles from "./cloudinary.module.css";

interface CloudinaryUploadProps {
  setImageUrl: (url: string) => void;
  size?: string | null;
}

const CloudinaryUpload = ({ setImageUrl, size = null }: CloudinaryUploadProps) => {
  const handleUploadSuccess = async (result: any) => {
    if (result.event === "success") {
      const imageUrl = result.info.secure_url;
      setImageUrl(imageUrl);
    }
  };

  return (
    <CldUploadWidget
      signatureEndpoint="/api/admin/cloudinary/sign-image"
      onSuccess={handleUploadSuccess}
    >
      {({ open }) => {
        return (
          <div className={styles.upload} onClick={() => open()}>
            <span>
              <FaPlus />
            </span>
            <p>Upload</p>
            {size && <p>({size})</p>}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default CloudinaryUpload;