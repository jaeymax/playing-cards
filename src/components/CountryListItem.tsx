import React, { FC } from "react";

interface CountryListItemProps{
    code:string,
    name:string;    
    onClick:(code:string, name:string)=>void; 
}

const CountryListItem:FC<CountryListItemProps> = ({code, name, onClick}) => {


  return (
    <div
      onClick={() => onClick(code, name)}   
      key={code}
      className="cursor-pointer items-center flex p-1 gap-2 border-t border-gray-600"
    >
      <div className="w-4 h-3">
        <img
          className="w-full h-full object-contain"
          src={`https://flagcdn.com/16x12/${code}.png`}
          alt=""
        />
      </div>
      <p>{name}</p>
    </div>
  );
};

export default CountryListItem;
