import React from "react";
import styles from "./PostOptionsModal.module.css";
import { Modal } from "antd";

interface PostOptionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onGoToPost: () => void;
  postId: string;
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  onEdit,
  onGoToPost,
  postId,
}) => {
  const handleCopyLink = () => {
    const link = `${window.location.origin}/post/${postId}`;
    navigator.clipboard.writeText(link);
    onClose();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      className={styles.modal}
    >
      <div className={styles.container}>
        <button className={styles.delete} onClick={onDelete}>
          Delete
        </button>
        <button className={styles.edit} onClick={onEdit}>
          Edit
        </button>
        <button className={styles.link} onClick={onGoToPost}>
          Go to post
        </button>
        <button className={styles.link} onClick={handleCopyLink}>
          Copy link
        </button>
        <button className={styles.cancel} onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default PostOptionsModal;
