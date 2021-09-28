import React, { useState } from "react";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const retrieveProjects = () => {
    if (!username) {
      alert("Enter a valid username")
      return
    }
    history.push(`/${username}`);
  };

  return (
    <>
      <section className="mt-5">
        <div className="container">
          <div className="row justify-content-center align-items-center">
            <div className="col-xs-12 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h2 className="mb-2">Github Username</h2>
                  <form onSubmit={() => retrieveProjects()}>
                    <input type="text" value={username} className="form-control" onChange={handleChange} placeholder="Press 'Enter' after typing" autoFocus></input>
                    <small>Letter counter: {username.length}</small>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
