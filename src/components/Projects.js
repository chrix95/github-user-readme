import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import Loader from './Loading';
import { capitalizeFirstLetter } from '../utils/Index';
import BackToTop from './BackToTop';

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
                setLoading(false);
            });
    }, [username])

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items-center mt-2">
                <h2 className="m-0">{capitalizeFirstLetter(username)}'s projects</h2>
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
                            <div className="col-xs-12 col-md-8">
                                <div className="card mb-5">
                                    <div className="card-header">
                                        <h5 className="text-success mt-3">Total Project{repositories.length > 1 ? 's' : ''}: {repositories.length} </h5>
                                    </div>
                                    <div className="card-body">
                                        <ul className="list-group list-group-flush list-style-none">
                                            {
                                                repositories && repositories.map((repo) => (
                                                    <li className="list-group-item" key={repo.id} onClick={() => viewDetails(repo.name, repo.default_branch)}>
                                                        {repo.name}
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                )
            }
            <BackToTop />
        </div>
    )
}

export default Projects;