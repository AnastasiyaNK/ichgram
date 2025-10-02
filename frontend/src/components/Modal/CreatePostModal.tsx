
// import { Modal, Form, Input, Button, message, Upload } from "antd";
// import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
// import type { UploadProps } from "antd";
// import css from './CreatePostModal.module.css';
// import { useState } from "react";
// import MessageInput from "../../ui/MessageInput";

// interface CreatePostModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPostCreated?: () => void;
// }

// interface PostFormValues {
//   description: string;
//   additionalText?: string;
// }

// const CreatePostModal = ({ isOpen, onClose, onPostCreated }: CreatePostModalProps) => {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>();

//   const handleCancel = () => {
//     onClose();
//     form.resetFields();
//     setImageUrl(undefined);
//   };
    
//      const handleSend = (text: string) => {
//        console.log(text);
//      };

//   const onFinish = (values: PostFormValues) => {
//     console.log("Post data:", values);
//     console.log("Image URL:", imageUrl);
//     // Add post creation logic here
//     message.success("Post created successfully!");
//     onPostCreated?.();
//     handleCancel();
//   };

//   const beforeUpload = (file: File) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//       return false;
//     }
//     const isLt5M = file.size / 1024 / 1024 < 5;
//     if (!isLt5M) {
//       message.error('Image must be smaller than 5MB!');
//       return false;
//     }
//     return true;
//   };

//   const getBase64 = (img: File, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
//   };

//   const handleChange: UploadProps['onChange'] = (info) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj as File, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };

//   const uploadButton = (
//     <div className={css.uploadArea}>
//       <div className={css.uploadIcon}>
//         {loading ? <LoadingOutlined /> : <PlusOutlined />}
//       </div>
//       <div className={css.uploadText}>Upload photo</div>
//     </div>
//   );

//   return (
//     <Modal
//       title="Create new post"
//       open={isOpen}
//       onCancel={handleCancel}
//       footer={null}
//       width={800}
//       centered
//       className={css.modal}
//     >
//       <div className={css.modalContent}>
//         {/* Ліва частина - завантаження фото */}
//         <div className={css.leftContainer}>
//           <Upload
//             name="postImage"
//             listType="picture-card"
//             className={css.imageUploader}
//             showUploadList={false}
//             beforeUpload={beforeUpload}
//             onChange={handleChange}
//             customRequest={({ onSuccess }) => {
//               // Simulate upload without using file parameter
//               setTimeout(() => {
//                 onSuccess?.("ok");
//               }, 1000);
//             }}
//           >
//             {imageUrl ? (
//               <img src={imageUrl} alt="post" className={css.uploadedImage} />
//             ) : (
//               uploadButton
//             )}
//           </Upload>
//         </div>

//         {/* Права частина - опис */}
//         <div className={css.rightContainer}>
//           <Form
//             form={form}
//             layout="vertical"
//             onFinish={onFinish}
//             autoComplete="off"
//             className={css.form}
//           >
//             <Form.Item
//               name="description"
//               label="Description"
//               rules={[
//                 { required: true, message: "Please enter post description!" },
//               ]}
//             >
//               <Input.TextArea
//                 rows={6}
//                 placeholder="Write a description..."
//                 className={css.textArea}
//               />
//             </Form.Item>

//             <Form.Item name="additionalText" label="Additional information">
//               <Input.TextArea
//                 rows={3}
//                 placeholder="Add additional information..."
//                 className={css.textArea}
//               />
//               <MessageInput onSend={handleSend} />
//             </Form.Item>

//             <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
//               <Button onClick={handleCancel} style={{ marginRight: 8 }}>
//                 Cancel
//               </Button>
//               <Button type="primary" htmlType="submit">
//                 Publish
//               </Button>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreatePostModal;


// components/CreatePostModal/CreatePostModal.jsx
// import { Modal, Button, Upload, message } from "antd";
// import { PlusOutlined } from '@ant-design/icons';
// import type { UploadProps } from "antd";
// import css from './CreatePostModal.module.css';
// import { useState } from "react";
// import MessageInput from "../../ui/MessageInput";

// interface CreatePostModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPostCreated?: () => void;
// }

// const CreatePostModal = ({ isOpen, onClose, onPostCreated }: CreatePostModalProps) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>();

//   const handleCancel = () => {
//     onClose();
//     setImageUrl(undefined);
//   };

//   const handlePublish = () => {
//     // Add post creation logic here
//     message.success("Post created successfully!");
//     onPostCreated?.();
//     handleCancel();
//   };

//   const handleSend = (text: string) => {
//     console.log(text);
//   };

//   const beforeUpload = (file: File) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//       return false;
//     }
//     const isLt5M = file.size / 1024 / 1024 < 5;
//     if (!isLt5M) {
//       message.error('Image must be smaller than 5MB!');
//       return false;
//     }
//     return true;
//   };

//   const getBase64 = (img: File, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
//   };

//   const handleChange: UploadProps['onChange'] = (info) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj as File, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };

//   return (
//     <Modal
//       open={isOpen}
//       onCancel={handleCancel}
//       footer={null}
//       width={914}
//       centered
//       className={css.modal}
//     >
//       {/* Header */}
//       <div className={css.hederBox}>
//         <h2>Create new post</h2>
//         <div className={css.headerButtons}>
//           <Button type="primary" onClick={handlePublish}>
//             Share
//           </Button>
//           <Button onClick={handleCancel}>
//             Cancel
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className={css.wrapper}>
//         {/* Left Box - Image Upload */}
//         <div className={css.leftBox}>
//           {imageUrl ? (
//             <img src={imageUrl} alt="upload" className={css.uploadedImage} />
//           ) : (
//             <Upload
//               name="postImage"
//               showUploadList={false}
//               beforeUpload={beforeUpload}
//               onChange={handleChange}
//               customRequest={({ onSuccess }) => {
//                 setTimeout(() => {
//                   onSuccess?.("ok");
//                 }, 1000);
//               }}
//               className={css.uploadArea}
//             >
//               <div className={css.uploadPlaceholder}>
//                 <PlusOutlined className={css.uploadIcon} />
//                 <div>Upload photo</div>
//               </div>
//             </Upload>
//           )}
//         </div>

//         {/* Right Box - Content */}
//         <div className={css.rightBox}>
//           {/* User Info */}
//           <div className={css.userInfo}>
//             <img src="" alt="avatar" className={css.avatar} />
//             <p>Username</p>
//           </div>

//           {/* Text Area */}
//           <textarea 
//             className={css.textarea}
//             placeholder="Write a caption..."
//             defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, doloremque hic magni molestias aliquid fugit dolorem praesentium eos sapiente corrupti suscipit debitis laboriosam perspiciatis sit consequatur voluptatibus voluptates architecto ipsam."
//           />

//           {/* Message Input */}
//           <div className={css.messageInputContainer}>
//             <MessageInput onSend={handleSend} />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreatePostModal;

// components/CreatePostModal/CreatePostModal.jsx
// import { Modal, Button, Upload, message } from "antd";
// import { PlusOutlined } from '@ant-design/icons';
// import type { UploadProps } from "antd";
// import css from './CreatePostModal.module.css';
// import { useState } from "react";
// import MessageInput from "../../ui/MessageInput";

// interface CreatePostModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onPostCreated?: () => void;
// }

// const CreatePostModal = ({ isOpen, onClose, onPostCreated }: CreatePostModalProps) => {
//   const [loading, setLoading] = useState(false);
//   const [imageUrl, setImageUrl] = useState<string>();
//   const [caption, setCaption] = useState("");
//   const [description, setDescription] = useState("");

//   const handleCancel = () => {
//     onClose();
//     setImageUrl(undefined);
//     setCaption("");
//     setDescription("");
//   };

//   const handlePublish = () => {
//     message.success("Post created successfully!");
//     onPostCreated?.();
//     handleCancel();
//   };

//  const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//    const newCaption = e.target.value;
//    setCaption(newCaption);
//    setDescription(newCaption); // description завжди дорівнює caption
//  };

//  const handleSend = (text: string) => {
//    if (description) {
//      const updatedDescription = description + "\n" + text;
//      setDescription(updatedDescription);
//      setCaption(updatedDescription); // Оновлюємо також caption
//    } else {
//      setDescription(text);
//      setCaption(text);
//    }
//  };

//   const beforeUpload = (file: File) => {
//     const isImage = file.type.startsWith('image/');
//     if (!isImage) {
//       message.error('You can only upload image files!');
//       return false;
//     }
//     const isLt5M = file.size / 1024 / 1024 < 5;
//     if (!isLt5M) {
//       message.error('Image must be smaller than 5MB!');
//       return false;
//     }
//     return true;
//   };

//   const getBase64 = (img: File, callback: (url: string) => void) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result as string));
//     reader.readAsDataURL(img);
//   };

//   const handleChange: UploadProps['onChange'] = (info) => {
//     if (info.file.status === 'uploading') {
//       setLoading(true);
//       return;
//     }
//     if (info.file.status === 'done') {
//       getBase64(info.file.originFileObj as File, (url) => {
//         setLoading(false);
//         setImageUrl(url);
//       });
//     }
//   };

//   return (
//     <Modal
//       open={isOpen}
//       onCancel={handleCancel}
//       footer={null}
//       width={914}
//       centered
//       className={css.modal}
//     >
//       {/* Header */}
//       <div className={css.hederBox}>
//         <h2>Create new post</h2>
//         <div className={css.headerButtons}>
//           <Button type="primary" onClick={handlePublish}>
//             Share
//           </Button>
//           <Button onClick={handleCancel}>
//             Cancel
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className={css.wrapper}>
//         {/* Left Box - Image Upload */}
//         <div className={css.leftBox}>
//           {imageUrl ? (
//             <img src={imageUrl} alt="upload" className={css.uploadedImage} />
//           ) : (
//             <Upload
//               name="postImage"
//               showUploadList={false}
//               beforeUpload={beforeUpload}
//               onChange={handleChange}
//               customRequest={({ onSuccess }) => {
//                 setTimeout(() => {
//                   onSuccess?.("ok");
//                 }, 1000);
//               }}
//               className={css.uploadArea}
//             >
//               <div className={css.uploadPlaceholder}>
//                 <PlusOutlined className={css.uploadIcon} />
//                 <div>Upload photo</div>
//               </div>
//             </Upload>
//           )}
//         </div>

//         {/* Right Box - Content */}
//         <div className={css.rightBox}>
//           {/* User Info */}
//           <div className={css.userInfo}>
//             <img src="" alt="avatar" className={css.avatar} />
//             <p>Username</p>
//           </div>

//           {/* Text Area with Scroll */}
//           <textarea 
//             className={css.textarea}
//             placeholder="Write a caption..."
//             value={caption}
//             onChange={handleCaptionChange}
//             rows={8}
//           />

//           {/* Message Input */}
//           <div className={css.messageInputContainer}>
//             <MessageInput onSend={handleSend} />
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default CreatePostModal;


// components/CreatePostModal/CreatePostModal.jsx
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