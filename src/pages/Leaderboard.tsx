import leaderboard from "../assets/podium.png";
import globe from "../assets/earth.png";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa6";
import { countries } from "../data/countries";
import CountryList from "../components/CountryList";

const Leaderboard = () => {
  const [collapse, setCollapse] = useState(false);
  const [country, setCountry] = useState("Global");
  const [flag, setFlag] = useState(globe);

  const handleClick = (code: string, name: string) => {
    setCountry(name);
    setFlag(`https://flagcdn.com/40x30/${code}.png`);
    setCollapse(false);
    if(name.toLocaleLowerCase() == 'global'){
      setFlag(globe);
    }
  };

  return (
    <div className="flex-1 h-100  py-5">
      <div className="flex items-center gap-5">
        <div className="w-[40px] h-[40px]">
          <img src={leaderboard} alt="" />
        </div>
        <h1 className="font-extrabold text-4xl">Leaderboard</h1>
      </div>
      <div className="bg-[#FFFFFF1A] flex items-center p-3 gap-3 mt-10 relative mb-10">
        <div className="w-[30px] h-[30px]">
          <img className="w-full h-full object-cover" src={flag} alt="" />
        </div>
        <h1 className="font-bold text-xl flex-1">{country}</h1>
        <div onClick={() => setCollapse(!collapse)} className="cursor-pointer">
          {collapse ? <FaChevronUp /> : <FaChevronDown />}
        </div>
        <CountryList collapse = {collapse} countries={countries} onClick={handleClick} />
        
      </div>
      <div className="bg-[#FFFFFF1A] w-full h-[500px]" >

      </div>
    </div>
  );
};

export default Leaderboard;
