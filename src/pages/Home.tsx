import Footer from "@/components/Footer";
import Leaderboard from "@/components/Leaderboard";
import TournamentWinners from "@/components/TournamentWinners";
import Updates from "@/components/Updates";
import CardVideo from "@/components/CardVideo";
import PlayGame from "@/components/PlayGame";

{
  /* <div className="flex gap-14 sm:flex-row sm:items-center flex-col" >
  <Leaderboard/>
  <TournamentWinners/>
</div> */
}

const Home = () => {
  return (
    <div className="flex items-center gap-16 max-w-7xl w-full mx-auto ">
      <div className="py-5 flex-1 gap-5 flex flex-col w-full mx-aut ma-w-3xl px-2">
        <div className="flex items  gap-10 borde border-green-500  sm:flex-row flex-col w-full max-w-[800px mx-auto flex-1">
          <PlayGame />

          <CardVideo />
        </div>
        <div className="flex gap-14 md:hidden flex-col">
          <Leaderboard />
          <TournamentWinners />
        </div>
        <Updates />
        <Footer />
      </div>
      <div className="flex-1 md:flex hidden max-w-sm  flex-col gap-5 px-5" >
        <Leaderboard />
        <TournamentWinners/>
      </div>
    </div>
  );
};
// https://i.pinimg.com/originals/73/8a/f6/738af624ab6799643747e5099e622cce.gif
export default Home;
