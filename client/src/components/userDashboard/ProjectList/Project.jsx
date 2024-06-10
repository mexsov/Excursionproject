import React, { useCallback } from 'react';
import { useProjects } from './hooks/useProject';
import { Link } from "react-router-dom";
import "../../css/UserDashboard.css";

export const Project = ({ project }) => {
    const { deleteProject, OpenUpdateForm, FetchProjects } = useProjects();

    const RemoveProject = useCallback(async () => {
        const [status] = await deleteProject(project.id);
        if (status === 200) {
            FetchProjects();
        } else {
            alert('error occured while removing the project')
        }
    }, [project]);



    return (
        <tr className='table'>

            <td title={project.name}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {
                            project.name.length > 15 ?
                                project.name.substring(0, 15) + " ..." :
                                project.name
                        }
                    </div>
                </Link>
            </td>
            <td title={project.status}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {project.status}
                    </div>
                </Link>
            </td>
            <td title={project.description}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {
                            project.description.length > 10 ?
                                project.description.substring(0, 10) + " ..." :
                                project.description
                        }
                    </div>
                </Link>
            </td>
            <td title={project.userRole}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {project.userRole}
                    </div>
                </Link>
            </td>
            <td title={project.toDoTasks}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {project.toDoTasks}
                    </div>
                </Link>
            </td>
            <td title={project.inProgressTasks}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {project.inProgressTasks}
                    </div>
                </Link>
            </td>
            <td title={project.completedTasks}>
                <Link to={`/projects/${project.id}`} className='table-link'>
                    <div>
                        {project.completedTasks}
                    </div>
                </Link>
            </td>
            <td>
                {project.userRole === "owner" &&
                    <>
                        <button className='action-button ' onClick={() => OpenUpdateForm(project)}>Update</button>
                        <button className='action-button ' onClick={RemoveProject}>Remove</button>
                    </>}
            </td>
        </tr>
    );
};