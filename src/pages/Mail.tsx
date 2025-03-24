import React, { useState, FC } from 'react';
import { Mail, Star, Inbox, Send, Archive, Trash2, Search, MoreVertical, Paperclip } from 'lucide-react';

interface Folder {
  id: string;
  label: string;
  icon: React.ElementType;
  count?: number;
}

interface Message {
  id: number;
  from: string;
  email: string;
  subject: string;
  preview: string;
  time: string;
  unread: boolean;
  starred: boolean;
  hasAttachment?: boolean;
  folder: string;
}

const MailPage: FC = () => {
  const [selectedFolder, setSelectedFolder] = useState<string>('inbox');
  const [selectedMail, setSelectedMail] = useState<Message | null>(null);
  
  const folders: Folder[] = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 4 },
    { id: 'sent', label: 'Sent', icon: Send },
    { id: 'archived', label: 'Archived', icon: Archive },
    { id: 'trash', label: 'Trash', icon: Trash2 }
  ];

  const messages: Message[] = [
    {
      id: 1,
      from: 'Sarah Williams',
      email: 'sarah.w@example.com',
      subject: 'Project Update - Q1 Results',
      preview: 'I wanted to share the latest updates regarding our Q1 project milestones...',
      time: '10:30 AM',
      unread: true,
      starred: true,
      hasAttachment: true,
      folder: 'inbox'
    },
    {
      id: 2,
      from: 'Michael Chen',
      email: 'm.chen@example.com',
      subject: 'Team Meeting Schedule',
      preview: "Here's the proposed schedule for next week's team sync-up...",
      time: 'Yesterday',
      unread: false,
      starred: false,
      folder: 'inbox'
    },
    {
      id: 3,
      from: 'Alex Thompson',
      email: 'alex.t@example.com',
      subject: 'New Feature Discussion',
      preview: "I've been thinking about the new feature we discussed...",
      time: '2 days ago',
      unread: true,
      starred: false,
      hasAttachment: true,
      folder: 'inbox'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-800 p-4">
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-3 flex items-center justify-center gap-2 mb-6">
            <Mail className="h-5 w-5" />
            <span>Compose</span>
          </button>

          <div className="space-y-1">
            {folders.map((folder) => {
              const Icon = folder.icon;
              return (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    selectedFolder === folder.id
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5" />
                    <span>{folder.label}</span>
                  </div>
                  {folder.count && (
                    <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
                      {folder.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Search Bar */}
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search emails..."
                  className="w-full bg-gray-800 text-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-auto">
            {messages
              .filter(msg => msg.folder === selectedFolder)
              .map((message) => (
                <div
                  key={message.id}
                  onClick={() => setSelectedMail(message)}
                  className={`
                    flex items-center gap-4 p-4 border-b border-gray-800 cursor-pointer
                    ${message.unread ? 'bg-gray-800/50' : 'bg-transparent'}
                    hover:bg-gray-800 transition-colors
                  `}
                >
                  <div className="flex items-center gap-4 min-w-[200px]">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Toggle star
                      }}
                      className={`${
                        message.starred ? 'text-yellow-400' : 'text-gray-400'
                      } hover:text-yellow-400`}
                    >
                      <Star className="h-5 w-5" />
                    </button>
                    <div className={`font-medium ${message.unread ? 'text-white' : 'text-gray-400'}`}>
                      {message.from}
                    </div>
                  </div>
                  
                  <div className="flex-1 flex items-center gap-4">
                    <div>
                      <div className={`${message.unread ? 'font-semibold text-white' : 'text-gray-400'}`}>
                        {message.subject}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {message.preview}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-gray-400">
                    {message.hasAttachment && (
                      <Paperclip className="h-4 w-4" />
                    )}
                    <span className="text-sm">
                      {message.time}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show actions menu
                      }}
                      className="hover:text-white"
                    >
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Message View */}
        {selectedMail && (
          <div className="w-1/2 border-l border-gray-800 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">{selectedMail.subject}</h2>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">{selectedMail.from}</div>
                  <div className="text-sm text-gray-400">{selectedMail.email}</div>
                </div>
                <div className="text-gray-400">{selectedMail.time}</div>
              </div>
              <p className="text-gray-300">
                {selectedMail.preview}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MailPage;