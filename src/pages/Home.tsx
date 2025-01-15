import React from "react";
import { SlSocialInstagram } from "react-icons/sl";
import { TiSocialYoutube } from "react-icons/ti";
import { TiSocialFacebookCircular } from "react-icons/ti";
import crown from "../assets/crown.png";
import { Link } from "react-router-dom";

const Home = () => {

  const topPlayers = [
    {
      name:"jaeymax",
      imageUrl:"https://github.com/shadcn.png",
      countryImageUrl:"https://flagcdn.com/16x12/gh.png",
      rating:3304,
    },
    {
      name:"witty",
      imageUrl:"https://img.freepik.com/premium-vector/logo-kid-gamer_573604-730.jpg?semt=ais_hybrid",
      countryImageUrl:"https://flagcdn.com/16x12/ua.png",
      rating: 3301
    },
    {
      name:"sherperd",
      imageUrl:"https://img.freepik.com/free-vector/cute-ninja-gaming-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-flat_138676-8079.jpg?semt=ais_hybrid",
      countryImageUrl:"https://flagcdn.com/16x12/us.png",
      rating: 3300
    },
    {
      name:"tony",
      imageUrl:"https://static.vecteezy.com/system/resources/previews/016/773/467/non_2x/gamer-esport-gaming-mascot-logo-design-illustration-vector.jpg",
      countryImageUrl:"https://flagcdn.com/16x12/ng.png",
      rating: 3299
    },
    {
      name:"lord",
      imageUrl:"https://img.freepik.com/free-vector/cute-robot-gaming-cartoon-vector-icon-illustration-people-technology-icon-isolated-flat-vector_138676-11801.jpg",
      countryImageUrl:"https://flagcdn.com/16x12/fr.png",
      rating: 3295
    },
    {
      name:"rick",
      imageUrl:"https://t4.ftcdn.net/jpg/09/02/73/97/360_F_902739740_fQTwwpH4YH5NTRJbMTAd2Z6Q1JQKT1iv.jpg",
      countryImageUrl:"https://flagcdn.com/16x12/au.png",
      rating: 3293
    }
  ]



  return (
    <div className="py-5 flex-1 flex flex-col px-2 b-[url('https://aeadmin.adamellis.com/wp-content/uploads/2023/10/adam-ellis-wallpaper-playing-cards-landscape-full-artwork.jpg')]">
      <div className="flex items-cente gap-5 sm:flex-row flex-col w-full max-w-[700px] mx-auto flex-1">
        <div className="flex flex-col gap-3 items-center flex-1 borde">
          <h1 className="font-extrabold text-4xl text-center" >Play Cards Online on the #1 Site!</h1>
          <div className="bg-green-600 w-full text-center rounded p-2 hover:cursor-pointer shadow-md">
            Play game
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            Create game
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            Invite a friend
          </div>
          <div className="button w-full text-center rounded p-2 shadow-md">
            Play with Computer
          </div>
          <div className="flex justify-between items-center borde w-full">
            <p className="font-bold text-xs">
              13533<span className="font-normal"> players</span>
            </p>
            <p className="font-bold text-xs">
              4844972 <span className="font-normal"> playing now</span>
            </p>
          </div>
        </div>
        <div className="p- flex-1">
          <div className="w-[300p h-[300px button rounded shadow-md">
            <div className="header flex items-center p-1">
              <div className="w-7 h-7">
                <img
                  className="w-full h-full object-contain"
                  src={crown}
                  alt=""
                />
              </div>
              <h2 className="font-bold flex-1 ml-4">Leaderboard</h2>
        <Link to = '/leaderboard' className="cursor-pointer hover:text-blue-500">More</Link>

            </div>
            <div className="players p-1 flex flex-col gap-2">
              {
                topPlayers.map((player, index)=>(
                  <div className="player flex items-center gap-2" key={index} >
                  <div className={`w-8 h-8 ${index+1 === 1?"bg-yellow-500":index+1 === 2?"bg-gray-400":index+1 === 3?"bg-red-300":""}rounded grid place-items-center`} >
                        <p className="font-bold" >{`#${index+1}`}</p>
                  </div>
                  <div className="w-8 h-8 rounded" >
                      <img src={player.imageUrl} className="w-full h-full object-contain" alt="" />
                  </div>
                  <div className="flex-1 flex items-center gap-1" >
                    <p className="font-bold" >{player.name}</p>
                     <div className="w-4 h-4" >
                        <img src={player.countryImageUrl} className="w-full h-full object-contain" alt="" />
                     </div>
                  </div>
                  <div>
                      <p className="font-bold text-xs" >{player.rating}</p>
                  </div>
              </div>
                ))
              }
            
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1 borde sm:mb-0 mb-10">
        <div className="flex gap-2 font-bold text-xs mx-auto borde flex-wrap">
          <p className="min-w-fit">About Lichess</p>
          <p className="min-w-fit">FAQ</p>
          <p className="min-w-fit">Contact</p>
          <p className="min-w-fit">Mobile App</p>
          <p className="min-w-fit">Terms of Service</p>
          <p className="min-w-fit">Privacy</p>
          <p className="min-w-fit">Source Code</p>
          <p className="min-w-fit">Ads</p>
        </div>
        <div className="flex gap-3 mx-auto items-center">
          <TiSocialFacebookCircular className="w-6 h-6" />
          <TiSocialYoutube className="w-6 h-6" />
          <SlSocialInstagram className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default Home;
