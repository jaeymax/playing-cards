import { FC } from 'react'

interface TournamentWinnersItemProps{
    name:string,
    index:number;
}

const TournamentWinnersItem:FC<TournamentWinnersItemProps> = ({name, index}) => {
  return (
    <div  className={`p-2 ${index % 2 == 0?'':'bg-[#FFFFFF1A]'}`} >
         <p>{name}</p>
     </div>
  )
}

export default TournamentWinnersItem
