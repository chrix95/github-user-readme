import React from 'react'
import { useHistory } from 'react-router'
import ProjectListItem from './ProjectListItem';

const ProjectList = (props) => {
    const history = useHistory();

    const { repositories, username } = props

    const viewDetails = (projectname, branch) => {
        history.push({
            pathname: `/${username}/${projectname}`,
            state: { branch }
        })
    };

    return (
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
                                    <ProjectListItem repo={repo} viewDetails={viewDetails}></ProjectListItem>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectList;