import { FC } from 'react'

interface LeaderboardItemProps{
    name:string,
    index:number;
}

const LeaderboardItem:FC<LeaderboardItemProps> = ({name, index}) => {
  return (
    <div  className={`p-2 ${index % 2 == 0?'':'bg-[#FFFFFF1A]'}`} >
         <p>{name}</p>
     </div>
  )
}

export default LeaderboardItem
