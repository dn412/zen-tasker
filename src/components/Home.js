const Home = (props) => {
	// const { msgAlert, user } = props
	console.log('props in home', props)

	return (
    <div className="homePage">
      <h2>Home Page</h2>
      <button class="btn btn-success">
        <a href="./sign-up">Sign Up</a>
      </button>
    </div>
  );
}

export default Home
