import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import MarkdownPreview from '@uiw/react-markdown-preview';
import Loading from './Loading';

const ProjectsInfo = (props) => {
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const username = props.match.params.username;
    const projectname = props.match.params.projectname;
    const branch = history.location.state.branch;
    const [source, setSource] = useState('')

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
                    <div className="d-flex justify-content-between align-items-center">
                        <h1>{projectname}</h1>
                        <div className="d-grid gap-2 d-md-block">
                            <button type="button" className="btn btn-outline-warning btn-sm  me-md-2" onClick={() =>history.goBack()}>Back to project list</button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => history.push('/')}>Back home</button>
                        </div>
                    </div>
                    <hr></hr>
                    {
                        loading ? 
                        (
                            <Loading message="Retrieving README markdown content..." />
                        ) : 
                        (
                            <MarkdownPreview source={source} style={{ margin: "2rem auto" }} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectsInfo;