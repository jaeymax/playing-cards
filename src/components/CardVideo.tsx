

const CardVideo = () => {
  return (
    <div className="h-full borde w-full flex-1 self-center" >
    {/* <img className="rounded-md shadow-md object-contain" src={"https://i.pinimg.com/originals/73/8a/f6/738af624ab6799643747e5099e622cce.gif"} alt="" /> */}
    <video autoPlay = {true} loop = {true} muted = {true} className='w-full h-full object-contain rounded-md' >
        <source src='/vid.webm' type='video/webm' />
           Your browser does not support this file format
    </video>
    </div>
  )
}

export default CardVideo
