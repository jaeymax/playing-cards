import kingofheart from '../assets/cards/kingofheart.png'
import kingofspade from '../assets/cards/kingofspade.png'
import kingofclub from '../assets/cards/kingofclub.png'
import kingofdiamond from '../assets/cards/kingofdiamond.png'
import queenofheart from '../assets/cards/queenofheart.png'
import queenofspade from '../assets/cards/queenofspade.png'
import queenofclub from '../assets/cards/queenofclub.png'
import queenofdiamond from '../assets/cards/queenofdiamond.png'
import jackofclub from '../assets/cards/jackofclub.png'

const Play = () => {
  return (
    <div className="flex-1 bg-[url(./assets/background1.jpg)] bg-cover bg-center w-full flex flex-col justify-between" >
        <div className="container flex justify-aroun  borde borde-red-600">
          { [kingofheart,kingofspade, kingofclub,kingofclub, kingofdiamond].map((image, index)=>
            (
              <img src={image} className="card  object-contain"  alt="" />
            )
          ) }
        </div>
        <div className="container borde borde-blue-500 flex justify-aroun">
          { [queenofheart,queenofspade,queenofclub,queenofdiamond, jackofclub].map((image, index)=>
            (
              <img src={image} className="card object-contain"  alt="" />
            )
          ) }
        </div>
    </div>
  )
}

export default Play
