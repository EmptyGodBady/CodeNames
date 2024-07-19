import React from "react";

const CopyTextButton: React.FC = () => {
  const textToCopy = "Текст, который нужно скопировать";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div>
      <button onClick={copyToClipboard}>Invite friends</button>
    </div>
  );
};

export default CopyTextButton;
