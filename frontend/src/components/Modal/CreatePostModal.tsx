import { Modal, Button, Upload, message } from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import css from "./CreatePostModal.module.css";
import { useState } from "react";
import MessageInput from "../../ui/MessageInput";
import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { getUserAvatar } from "../../utils/avatarGenerator";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const CreatePostModal = ({
  isOpen,
  onClose,
  onPostCreated,
}: CreatePostModalProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const currentUser = useSelector((state: RootState) => state.auth.user);

    

  const handleCancel = () => {
    onClose();
    setImageUrl("");
    setCaption("");
    setUploadedFile(null);
  };

  const handlePublish = async () => {
    if (!uploadedFile) {
      message.error("Please upload an image first!");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", uploadedFile);
      formData.append("description", caption);

      const response = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Upload failed: ${errorData.message || "Unknown error"}`
        );
      }

      await response.json(); 
      message.success("Post created successfully!");
      onPostCreated?.();
      handleCancel();
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Failed to create post";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (text: string) => {
    setCaption((prev) => (prev ? prev + "\n" + text : text));
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error("Image must be smaller than 5MB!");
      return false;
    }

    setUploadedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);

    return false;
  };

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "removed") {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
      setImageUrl("");
      setUploadedFile(null);
    }
  };

  const uploadButton = (
    <div className={css.uploadPlaceholder}>
      <CloudDownloadOutlined className={css.uploadIcon} />
      <div className={css.uploadText}>Upload photo</div>
    </div>
  );

  const userAvatar = getUserAvatar(currentUser);

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={914}
      centered
      className={css.modal}
      closeIcon={null}
      maskClosable={true}
    >
      {/* Header */}
      <div className={css.hederBox}>
        <h2 className={css.title}>Create new post</h2>
        <div className={css.headerButtons}>
          <Button
            type="text"
            onClick={handlePublish}
            loading={loading}
            disabled={!imageUrl}
            className={css.shareButton}
          >
            Share
          </Button>
        </div>
      </div>

      <div className={css.wrapper}>
        <div className={css.leftBox}>
          {imageUrl ? (
            <img src={imageUrl} alt="upload" className={css.uploadedImage} />
          ) : (
            <Upload
              name="postImage"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleChange}
              accept="image/*"
              className={css.uploadArea}
            >
              {uploadButton}
            </Upload>
          )}
        </div>

        <div className={css.rightBox}>
          <div className={css.userInfo}>
            <img
              className={css.avatar}
              src={userAvatar}
              alt={currentUser?.name || "Username"}
            />
            <p>{currentUser?.name || "Username"}</p>
          </div>

          <textarea
            className={css.textarea}
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={8}
          />

          <div className={css.messageInputContainer}>
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;