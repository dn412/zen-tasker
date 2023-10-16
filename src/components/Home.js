
import Background from '../zentaskerHome.png'

const Home = (props) => {
  // const { msgAlert, user } = props
  console.log("props in home", props);

  return (
    <div className="homePage">
      <div
        className="container-fluid"
        style={{
          backgroundImage: `url(${Background})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          // width: "100%",
          backgroundSize: "cover",
          height: "100vh",
          // backgroundAttachment: "fixed",
          margin: 0,
          padding: 0,
        }}
      >
        <div class="mind">
          <div class="inner-div">
            <h2>Welcome to ZenTasker - Your Companion in Mindful Productivity 🍃</h2>
            <h3>Embark on a journey where tranquility and productivity conincide with ZenTasker - a mindful task management app designed to seamlessly weave wellness into your everyday routine. Discover a space where your to-dos and personal wellbeing coexist, harmoniously blending mindfulness exercises, positivity trackers, and motivational content directly into your daily tasks. 📝✨</h3>

            <button class="btn btn-success">
              <a href="./sign-up">Sign Up</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
