import { timeStamp } from "console";

const Updates = () => {
  const updates = [
    {
      timeStamp: "20 hours ago",
      body: "You can now pin up to three of your favourite blog posts to your profile page by enabling the new Sticky post option in the blog settings.Many thanks to yet another Fred for implementing this feature!",
    },
    {
      timeStamp: "43 hours ago",
      body: "Congratulations to Ronaldo Playing Chess for winning our Streamers Battle January 2025! Congrats also to Moon Club for taking 2nd place, to Moon Club for taking 2nd place, to Zhigalko_Sergei & Friends for 3rd place, and to Sadistic Minions for 4th place. Thanks to all participating streamers and 1,811 registered players!",
    },
    {
      timeStamp: "3 days ago",
      body: "Our january week of variant Shield Arenas starts at 16:00 UTC with the 3+2 Chess960 Arena!The winner will get a unique trophy and keep it until tropny and keep it until next month's tournament.",
    },
    {
      timeStamp: "20 hours ago",
      body: "You can now pin up to three of your favourite blog posts to your profile page by enabling the new Sticky post option in the blog settings.Many thanks to yet another Fred for implementing this feature!",
    },
    {
      timeStamp: "20 hours ago",
      body: "You can now pin up to three of your favourite blog posts to your profile page by enabling the new Sticky post option in the blog settings.Many thanks to yet another Fred for implementing this feature!",
    },
  ];

  return (
    <div className="h-[350px] custom-scroll overflow-y-scroll form w-full rounded-md p-5 flex flex-col gap-5 shadow-lg">
      {updates.map((update, index) => (
        <div key={index} className="flex flex-col gap-2">
          <h1 className="font-bold text-sm text-yellow-600">
            {update.timeStamp}
          </h1>
          <p className="text-xs">{update.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Updates;
