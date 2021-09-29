import React from 'react'

const ProjectListItem = (props) => {
    const { viewDetails, repo } = props;

    return (
        <li className="list-group-item" key={repo.id} onClick={() => viewDetails(repo.name, repo.default_branch)}>
            {repo.name}
        </li>
    )
}

export default ProjectListItem;