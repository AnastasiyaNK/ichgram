// import React, { useState } from "react";
// import { Button, Input, Popover } from "antd";
// import { SmileOutlined } from "@ant-design/icons";
// import EmojiPicker from "emoji-picker-react";
// import type { EmojiClickData } from "emoji-picker-react";

// interface MessageInputProps {
//   onSend: (text: string) => void;
// }

// const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
//   const [message, setMessage] = useState("");
//   const [open, setOpen] = useState(false);

//   const handleEmojiSelect = (emojiData: EmojiClickData) => {
//     setMessage((prev) => prev + emojiData.emoji);
//   };

//   const handleSend = () => {
//     if (!message.trim()) return;
//     onSend(message);
//     setMessage("");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         gap: 8,
//         padding: 8,
//         borderTop: "1px solid #ddd",
//       }}
//     >
//       <Popover
//         content={<EmojiPicker onEmojiClick={handleEmojiSelect} />}
//         trigger="click"
//         open={open}
//         onOpenChange={setOpen}
//       >
//         <Button icon={<SmileOutlined />} />
//       </Popover>

//       <Input.TextArea
//         autoSize={{ minRows: 1, maxRows: 3 }}
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Напишіть повідомлення..."
//         onPressEnter={(e) => {
//           if (!e.shiftKey) {
//             e.preventDefault();
//             handleSend();
//           }
//         }}
//       />

//       <Button type="primary" onClick={handleSend}>
//         Send
//       </Button>
//     </div>
//   );
// };

// export default MessageInput;

// ui/MessageInput.jsx
import React, { useState, useRef } from "react";
import { Input, Button } from "antd";
import { SmileOutlined, SendOutlined } from "@ant-design/icons";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";
import css from './MessageInput.module.css';

interface MessageInputProps {
  onSend: (text: string) => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend }) => {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const inputRef = useRef(null);

  const handleEmojiSelect = (emojiData: EmojiClickData) => {
    setMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={css.messageInputContainer}>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className={css.emojiPickerWrapper}>
          <EmojiPicker 
            onEmojiClick={handleEmojiSelect}
            width={280}
            height={300}
            previewConfig={{ showPreview: false }}
          />
        </div>
      )}

      {/* Compact Input Area */}
      <div className={css.inputWrapper}>
        <Button 
          type="text"
          icon={<SmileOutlined />} 
          onClick={toggleEmojiPicker}
          className={css.emojiButton}
        />
        
        <Input.TextArea
          ref={inputRef}
          autoSize={{ minRows: 1, maxRows: 2 }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Add a comment..."
          onKeyPress={handleKeyPress}
          className={css.textArea}
        />
        
        <Button 
          type="text"
          icon={<SendOutlined />} 
          onClick={handleSend}
          disabled={!message.trim()}
          className={css.sendButton}
        />
      </div>
    </div>
  );
};

export default MessageInput;
