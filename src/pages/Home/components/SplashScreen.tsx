import "../../../SplashScreen.css";

interface SplashScreenProps {
  leaving?: boolean;
}

export default function SplashScreen({
  leaving = false,
}: SplashScreenProps) {
  return (
    <div className={`splash-wrapper ${leaving ? "leaving" : ""}`}>
      <div className="splash">
        <div className="table">
          <div className="card spade" data-corner="K">
            <img className="w-full h-full image-cover" src="https://sparplay-image-uploads.s3.us-east-1.amazonaws.com/king-of-spades.jpg" alt="" />
          </div>
          <div className="card heart" data-corner="K">
            <img className="w-full h-full image-cover" src="https://sparplay-image-uploads.s3.us-east-1.amazonaws.com/king-of-hearts.jpg" alt="" />
          </div>
          <div className="card diamond" data-corner="K">
            <img className="w-full h-full image-cover" src="https://sparplay-image-uploads.s3.us-east-1.amazonaws.com/king-of-diamonds.jpg" alt="" />
          </div>
          <div className="card club" data-corner="K">
            <img className="w-full h-full image-cover" src="https://sparplay-image-uploads.s3.us-east-1.amazonaws.com/king-of-clubs.jpg" alt="" />
          </div>
        </div>

        <div className="wordmark">
          SPAR<span>PLAY</span>
        </div>

        <div className="loader-line" />
      </div>
    </div>
  );
}