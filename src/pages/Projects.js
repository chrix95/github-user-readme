import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { capitalizeFirstLetter } from '../utils/Index';

import Loader from '../components/Loading';
import BackToTop from '../components/BackToTop';
import ProjectList from '../components/ProjectList';

const Projects = (props) => {
    const [repositories, setRepositories] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    
    const { username } = props.match.params;

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
                        <ProjectList repositories={repositories} username={username}></ProjectList>
                    )
                )
            }
            <BackToTop />
        </div>
    )
}

export default Projects;