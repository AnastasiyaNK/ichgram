
import { Modal, Button, Upload, message } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import type { UploadProps } from "antd";
import css from './CreatePostModal.module.css';
import { useState } from "react";
import MessageInput from "../../ui/MessageInput";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated?: () => void;
}

const CreatePostModal = ({ isOpen, onClose, onPostCreated }: CreatePostModalProps) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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
      
      // Create form data for backend upload
      const formData = new FormData();
      formData.append('image', uploadedFile);
      formData.append('description', caption);
      
      // Upload to your backend (which will handle Cloudinary)
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: formData,
        credentials: 'include', // include cookies for authentication
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend error:", errorData);
        throw new Error(`Upload failed: ${errorData.message || 'Unknown error'}`);
      }

      const data = await response.json();
      
      console.log("Post created successfully:", data);
      
      message.success("Post created successfully!");
      onPostCreated?.();
      handleCancel();
      
    } catch (error) {
      console.error("Upload error:", error);
      let errorMessage = "Failed to create post";
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (text: string) => {
    console.log("Comment:", text);
    // Add comment to caption
    setCaption(prev => prev ? prev + "\n" + text : text);
  };

  const beforeUpload = (file: File) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('Image must be smaller than 5MB!');
      return false;
    }
    
    // Store the file for later upload
    setUploadedFile(file);
    
    // Create temporary preview URL
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
    
    return false; // Return false to prevent automatic upload
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'removed') {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl); // Clean up object URL
      }
      setImageUrl("");
      setUploadedFile(null);
    }
  };

  const uploadButton = (
    <div className={css.uploadPlaceholder}>
      <PlusOutlined className={css.uploadIcon} />
      <div className={css.uploadText}>Upload photo</div>
    </div>
  );

  return (
    <Modal
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={914}
      centered
      className={css.modal}
    >
      {/* Header */}
      <div className={css.hederBox}>
        <h2>Create new post</h2>
        <div className={css.headerButtons}>
          <Button 
            type="primary" 
            onClick={handlePublish}
            loading={loading}
            disabled={!imageUrl}
          >
            Share
          </Button>
          <Button onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className={css.wrapper}>
        {/* Left Box - Image Upload */}
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

        {/* Right Box - Content */}
        <div className={css.rightBox}>
          {/* User Info */}
          <div className={css.userInfo}>
            <div className={css.avatar} />
            <p>Username</p>
          </div>

          {/* Text Area with Scroll */}
          <textarea 
            className={css.textarea}
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            rows={8}
          />

          {/* Message Input */}
          <div className={css.messageInputContainer}>
            <MessageInput onSend={handleSend} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreatePostModal;