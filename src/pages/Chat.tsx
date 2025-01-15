import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { GrEmoji } from "react-icons/gr";

const Chat = () => {
  const messages = [
    {
      name: "jaeymax",
      createdAt: "23:00",
      imageUrl: "https://github.com/shadcn.png",
      message: "Hi there how are you doing",
    },
    {
      name: "witty",
      createdAt: "20:00",
      imageUrl: "https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid",
      message: "Yoo putty i dey ooh chale long time i see you keep waa where you go hide?",
    },
    {
      name: "sherpherd",
      createdAt: "9:00",
      imageUrl: "https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg?semt=ais_hybrid",
      message: "I almost won that game!!!",
    },
    {
      name: "tony",
      createdAt: "2:00",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
      message: "Congratulations @jaeymax",
    },
    {
      name: "lord",
      createdAt: "3:00",
      imageUrl: "https://t4.ftcdn.net/jpg/09/02/73/97/360_F_902739740_fQTwwpH4YH5NTRJbMTAd2Z6Q1JQKT1iv.jpg",
      message: "Hi",
    },
  ];

  return (
    <div className="bg-blue-4 flex-1 chat flex flex-col">
      <div className="flex flex-col flex-1">
        <div className="flex items-center justify-between p-6 b-blue-500">
          <h1 className="font-bold text-lg">Global</h1>
          <p className="font-bold text-lg">
            <IoMdClose/>
          </p>
        </div>
        <div className="messages flex-1 p-5 flex flex-col gap-8">
          {messages.map((msg, index) => (
            <div className="message-item flex gap-3" key={index} >
              <Avatar className="w-12 h-12">
                <AvatarImage src={msg.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-bold">
                  {msg.name} <span className="text-xs" >{msg.createdAt}</span>
                </p>
                <div className="message p-2 rounded w-fit">
                  <p>{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="p-3">
           <div className="flex gap-3 borde" >
              <div className="flex-1 flex items-center  message rounded-md px-4 min-w-0" >
                 <input type="text" className="flex-1 message min-w-0" placeholder="Your message..." />
                 <GrEmoji/>
              </div>
              <div className="bo message rounded-md px-3 py-3 grid place-items-center" >
                  <FaPlus/>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
