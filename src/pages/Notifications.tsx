// import { useState} from 'react';
// import { Link } from 'react-router-dom';
// import { Bell, CheckCircle, AlertCircle, Mail, XCircle } from 'lucide-react';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([
//     {
//       id: 1,
//       type: 'success',
//       title: 'Commission Unlocked',
//       message: 'Your commission of $250 has been unlocked.',
//       date: '2025-03-15',
//       read: false,
//     },
//     {
//       id: 2,
//       type: 'warning',
//       title: 'Monthly Purchase Reminder',
//       message: 'You have 5 days left to make your monthly purchase.',
//       date: '2025-03-10',
//       read: true,
//     },
//     {
//       id: 3,
//       type: 'info',
//       title: 'New Product Available',
//       message: 'Check out our new Premium Package!',
//       date: '2025-03-05',
//       read: false,
//     },
//     {
//       id: 4,
//       type: 'error',
//       title: 'Payment Failed',
//       message: 'Your recent payment failed. Please update your payment details.',
//       date: '2025-03-01',
//       read: false,
//     },
//   ]);

//   const markAsRead = (id) => {
//     setNotifications((prev) =>
//       prev.map((notification) =>
//         notification.id === id ? { ...notification, read: true } : notification
//       )
//     );
//   };

//   const deleteNotification = (id) => {
//     setNotifications((prev) => prev.filter((notification) => notification.id !== id));
//   };

//   const markAllAsRead = () => {
//     setNotifications((prev) =>
//       prev.map((notification) => ({ ...notification, read: true }))
//     );
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'success':
//         return <CheckCircle className="w-6 h-6 text-green-600" />;
//       case 'warning':
//         return <AlertCircle className="w-6 h-6 text-yellow-600" />;
//       case 'info':
//         return <Mail className="w-6 h-6 text-blue-600" />;
//       case 'error':
//         return <XCircle className="w-6 h-6 text-red-600" />;
//       default:
//         return <Bell className="w-6 h-6 text-gray-600" />;
//     }
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
//           <button
//             onClick={markAllAsRead}
//             className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
//           >
//             Mark All as Read
//           </button>
//         </div>

//         {/* Notifications List */}
//         <div className=" rounded-lg shadow">
//           {notifications.length > 0 ? (
//             notifications.map((notification) => (
//               <div
//                 key={notification.id}
//                 className={`p-4 border-b border-gray-200 last:border-b-0 ${
//                   notification.read ? 'bg-gray-50' : 'test'
//                 }`}
//               >
//                 <div className="flex items-start">
//                   <div className="flex-shrink-0">
//                     {getIcon(notification.type)}
//                   </div>
//                   <div className="ml-4 flex-1">
//                     <div className="text-sm font-medium text-gray-900">
//                       {notification.title}
//                     </div>
//                     <div className="text-sm text-gray-600 mt-1">
//                       {notification.message}
//                     </div>
//                     <div className="text-xs text-gray-500 mt-2">
//                       {notification.date}
//                     </div>
//                   </div>
//                   <div className="flex items-center space-x-4">
//                     {!notification.read && (
//                       <button
//                         onClick={() => markAsRead(notification.id)}
//                         className="text-sm text-blue-600 hover:text-blue-800"
//                       >
//                         Mark as Read
//                       </button>
//                     )}
//                     <button
//                       onClick={() => deleteNotification(notification.id)}
//                       className="text-sm text-red-600 hover:text-red-800"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="p-6 text-center text-gray-600">
//               No notifications found.
//             </div>
//           )}
//         </div>

//         {/* Back to Dashboard Link */}
//         <div className="mt-8 text-center">
//           <Link to="/dashboard" className="text-blue-600 hover:underline">
//             ← Back to Dashboard
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;