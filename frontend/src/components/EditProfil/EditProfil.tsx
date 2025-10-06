
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector} from "react-redux";
import css from "./EditProfil.module.css";
import { Button, Form, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useUpdateProfileMutation } from "../../redux/apiSlice";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import type { RootState } from "../../redux/store";

const EditProfil: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  
    const currentUser = useSelector((state: RootState) => state.auth.user);
    
     console.log("🔍 EditProfil - currentUser from Redux:", currentUser);
     console.log("🔍 EditProfil - profileImage:", currentUser?.profileImage);
     console.log("🔍 EditProfil - bio:", currentUser?.bio);

  React.useEffect(() => {
    if (currentUser) {
      console.log("🔄 Current user data loaded:", currentUser);
      form.setFieldsValue({
        name: currentUser.name,
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser, form]);

  const handleFileSelect = (file: RcFile): boolean => {
    setSelectedFile(file);

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

    return false;
  };

  const onFinish = async (values: { name: string; bio: string }) => {
    try {
      console.log("📤 Sending update with values:", values);

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("bio", values.bio);

      if (selectedFile) {
        formData.append("profileImage", selectedFile);
      }

      await updateProfile(formData).unwrap();
      message.success("Profile updated successfully!");

      // Переходимо на профіль - дані вже оновлені в authSlice
      navigate(`/profile/${currentUser?.id}`);
    } catch (error) {
      console.error("❌ Update profile error:", error);
      message.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    navigate(`/profile/${currentUser?.id}`);
  };

  const uploadProps: UploadProps = {
    beforeUpload: handleFileSelect,
    showUploadList: false,
    accept: "image/*",
  };

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  console.log("🎨 Rendering with currentUser:", currentUser);

  return (
    <div className={css.editProfil}>
      <h2 className={css.title}>Edit profile</h2>

      <div className={css.profileHeaderConteiner}>
        <img
          className={css.useravatar}
          src={currentUser.profileImage || "/assets/images/profile.svg"}
          alt="Avatar"
        />
        <div className={css.profileHeaderWrapper}>
          <p className={css.textName}>{currentUser.name}</p>
          <p className={css.text}>{currentUser.bio || "No bio available"}</p>
        </div>
        <div className={css.uploadWrapper}>
          <Upload {...uploadProps}>
            <Button
              type="primary"
              style={{
                width: "114px",
                borderRadius: "8px",
              }}
            >
              New photo
            </Button>
          </Upload>
        </div>
      </div>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input placeholder="Enter your username" />
        </Form.Item>

        <Form.Item name="bio" label="About">
          <TextArea
            rows={4}
            placeholder="Tell something about yourself..."
            maxLength={150}
            showCount
          />
        </Form.Item>

        <Form.Item style={{ marginTop: "33px", textAlign: "left" }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            style={{
              width: "268px",
              borderRadius: "8px",
              marginRight: "16px",
            }}
          >
            Save
          </Button>
          <Button
            type="default"
            onClick={handleCancel}
            style={{ marginRight: "10px" }}
          >
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditProfil;