// import React, { useState } from "react";

// interface ChatBoxProps {
//   gameId: string;
//   opponent: string;
//   className?: string;
// }

// const ChatBox: React.FC<ChatBoxProps> = ({ gameId, opponent, className }) => {
//   const [message, setMessage] = useState("");

//   const handleSend = (e: React.FormEvent) => {
//     e.preventDefault();
//     // Handle message sending
//     setMessage("");
//   };

//   return (
//     <div className={`bg-gray-800 rounded-lg flex flex-col ${className}`}>
//       <div className="p-3 border-b border-gray-700">
//         <h3 className="text-white">Chat with {opponent}</h3>
//       </div>

//       <div className="flex-1 p-4 overflow-y-auto">
//         {/* Messages will go here */}
//       </div>

//       <form onSubmit={handleSend} className="p-3 border-t border-gray-700">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="flex-1 bg-gray-700 text-white rounded px-3 py-2"
//             placeholder="Type a message..."
//           />
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//           >
//             Send
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ChatBox;
