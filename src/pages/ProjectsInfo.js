import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import MarkdownPreview from '@uiw/react-markdown-preview';
import { capitalizeFirstLetter } from '../utils/Index';

import Loader from '../components/Loading';
import BackToTop from '../components/BackToTop';

const ProjectsInfo = (props) => {
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [source, setSource] = useState('');
    
    const { username, projectname } = props.match.params;
    const { branch } = history.location.state;

    useEffect(() => {
        setLoading(true);
        fetch(`https://raw.githubusercontent.com/${username}/${projectname}/${branch}/README.md`)
            .then(res => res.text())
            .then((result) => {
                setSource(result);
            })
            setLoading(false);
        return () => {
            setSource('');
        }
    }, [username, projectname, branch])

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col">
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <h1>{capitalizeFirstLetter(projectname)}</h1>
                        <div className="d-grid gap-2 d-md-block">
                            <button type="button" className="btn btn-outline-warning btn-sm  me-md-2" onClick={() =>history.goBack()}>Back to project list</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => history.push('/')}>Back home</button>
                        </div>
                    </div>
                    <hr></hr>
                    {
                        loading ? 
                        (
                            <Loader message="Retrieving README markdown content..." />
                        ) : 
                        (
                            <div className="card mb-5">
                                <div className="card-body">
                                    <MarkdownPreview source={source} style={{ margin: "2rem auto" }} />
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <BackToTop />
        </div>
    )
}

export default ProjectsInfo;