import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Loader from './Loading';
import { capitalizeFirstLetter } from '../utils/Index';

const Projects = (props) => {
    const [repositories, setRepositories] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const username = props.match.params.username;

    const viewDetails = (projectname, branch) => {
        history.push({
            pathname: `/${username}/${projectname}`,
            state: { branch }
        })
    };

    useEffect(() => {
        setLoading(true);
        fetch(`https://api.github.com/users/${username}/repos`)
            .then(res => res.json())
            .then((result) => {
                if (result.message) {
                    setRepositories(undefined);
                } else {
                    setRepositories(result);
                }
                console.log(result)
                setLoading(false);
            });
    }, [username])

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-2">
                <h1>{capitalizeFirstLetter(username)}'s projects</h1>
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => history.push('/')}>Search Again</button>
            </div>
            <hr></hr>
            {
                loading ? 
                (
                    <Loader message="Loading projects..." />
                ) : (
                    repositories === undefined ? 
                    (
                        <p className="text-danger"><i>Oops! {capitalizeFirstLetter(username)}'s repository not found</i> 😳 </p>
                    ) : (
                        <div className="row justify-content-center align-items-center">
                            <div className="col-xs-12 col-md-6">
                                <h5 className="text-success mt-3">Total Project{repositories.length > 1 ? 's' : ''}: {repositories.length} </h5>
                                <hr></hr>
                                <ul className="list-style-none">
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
                )
            }
        </div>
    )
}

export default Projects;