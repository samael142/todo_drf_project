import React from "react";
import {Link} from "react-router-dom";
import ProjectForm from "./projectform";
import ProjectFilterForm from "./projectfilterform";
import Select, {components} from 'react-select'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.http_link}
            </td>
            <td>
                {project.users.map(item => item.first_name + ' ' + item.last_name).join(', ')}
            </td>
            <td>
                <button onClick={() => deleteProject(project.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}

// const MultiValueRemove = (props) => {
//     if (props.data.isFixed) {
//         return null;
//     }
//     return <components.MultiValueRemove {...props} />;
// };
//
// const options = [
//         {value: 'chocolate', label: 'Chocolate', isFixed: true},
//         {value: 'strawberry', label: 'Strawberry'},
//         {value: 'vanilla', label: 'Vanilla'}
//     ]
//
// const MyComponent = () => (
//     <Select isMulti options={options} defaultValue={[options[0]]} isClearable={false}
//             components={{MultiValueRemove}}/>
// )


const ProjectsList = ({projects, users, createProject, deleteProject, filter}) => {
    return (
        <div>
            <br/>
            <ProjectFilterForm filter={filter}/>
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
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
                </tbody>
            </table>
            <ProjectForm createProject={createProject} users={users}/>
            {/*<MyComponent/>*/}
        </div>
    )
}


export default ProjectsList