import React from "react";
import {Link} from "react-router-dom";


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.http_link}
            </td>
            <td>
                {project.users.map(item => item).join(', ')}
            </td>
        </tr>
    )
}

const ProjectsList = ({projects}) => {
    return (
        <table className="table">
            <thead>
            <tr>
            <th>
                Project Name
            </th>
            <th>
                Link
            </th>
            <th>
                Users
            </th>
            </tr>
            </thead>
            <tbody>
                {projects.map((project) => <ProjectItem project={project} />)}
            </tbody>
        </table>
    )
}


export default ProjectsList