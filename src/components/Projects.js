import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Loading from './Loading';

const Projects = (props) => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const username = props.match.params.username;

    const viewDetails = (projectname, branch) => {
        history.push({
            pathname: `/${username}/${projectname}`,
            state: { branch }
        })
    };

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

   useEffect(() => {
        setLoading(true);
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(res => res.json())
            .then((result) => {
                setRepositories(result);
                setLoading(false);
            });
    }, [username])

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center">
                <h1>{capitalizeFirstLetter(username)}'s projects</h1>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => history.push('/')}>Search Again</button>
            </div>
            <hr></hr>
            {
                loading ? 
                (
                    <Loading message="Loading projects..." />
                ) : (
                    <div className="row justify-content-center align-items-center">
                        <div className="col-6">
                            <ul className="list-style-none mt-5">
                                {
                                    repositories && repositories.map((repo) => (
                                        <li key={repo.id} onClick={() => viewDetails(repo.name, repo.default_branch)}>
                                            {repo.name}
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Projects;