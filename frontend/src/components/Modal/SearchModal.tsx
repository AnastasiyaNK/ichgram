import React, { useState, useEffect } from "react";
import { getUserAvatar } from "../../utils/avatarGenerator";
import { useNavigate } from "react-router-dom";
import styles from "./SearchModal.module.css";
import { useGetSearchUsersQuery } from "../../redux/apiSlice";
import { Spin, Input } from "antd";


interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const { data: users, isFetching } = useGetSearchUsersQuery(query, {
    skip: query.trim() === "",
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    if (!isOpen) setQuery("");
  }, [isOpen]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleUserClick = (userId: string) => {
    onClose();
    navigate(`/profile/${userId}`);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={styles.overlay} onClick={handleOverlayClick} />
      <aside className={styles.panel}>
        <div className={styles.header}>
          <h3 className={styles.title}>Search</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ✕
          </button>
        </div>

        <div className={styles.searchBox}>
          <Input
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            allowClear
            className={styles.customSearchInput}
          />
        </div>

        <div className={styles.results}>
          {isFetching ? (
            <div className={styles.loader}>
              <Spin size="large" />
            </div>
          ) : users && users.length > 0 ? (
            <ul className={styles.userList}>
              {users.map((u) => (
                <li
                  key={u._id}
                  className={styles.userItem}
                  onClick={() => handleUserClick(u._id)}
                >
                  <img
                    src={getUserAvatar(u)}
                    alt={u.name}
                    className={styles.avatar}
                  />
                  <div>
                    <p className={styles.name}>{u.name}</p>
                    <p className={styles.fullName}>{u.fullName}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.trim() ? (
            <p className={styles.noResults}>No users found 😔</p>
          ) : (
            <p className={styles.hint}>Start typing to search users 🔍</p>
          )}
        </div>
      </aside>
    </>
  );
};

export default SearchModal;

