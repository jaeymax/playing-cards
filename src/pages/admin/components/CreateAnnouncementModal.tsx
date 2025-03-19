import React, { useState } from "react";
import Modal from "../../../components/Modal";

interface CreateAnnouncementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateAnnouncementModal: React.FC<CreateAnnouncementModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<"update" | "event" | "maintenance" | "news">(
    "update"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle announcement creation
    console.log({ title, content, type });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create Announcement">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white"
          >
            <option value="update">Update</option>
            <option value="event">Event</option>
            <option value="maintenance">Maintenance</option>
            <option value="news">News</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2"
        >
          Create Announcement
        </button>
      </form>
    </Modal>
  );
};

export default CreateAnnouncementModal;
