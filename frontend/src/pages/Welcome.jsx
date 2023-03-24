import Button from "../components/Button"

const Welcome = () => {
  return (
    <div id="welcome" className="col">
      <h1>Welcome to Movie Tracker</h1>
      <div className="button-group row">
        <Button link="/login" name="Login"></Button>
        <Button link="/Register" name="Register" className="purple"></Button>
      </div>
    </div>
  )
}

export default Welcome