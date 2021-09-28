import React, { useState } from "react";
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const retrieveProjects = () => {
    history.push(`/${username}`);
  };

  return (
    <>
      <section className="mt-5">
        <div className="container">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-6">
              <h1>Github Username</h1>
              <form onSubmit={() => retrieveProjects()}>
                <input type="text" value={username} className="form-control" onChange={handleChange} placeholder="Press 'Enter' after typing" autoFocus></input>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
