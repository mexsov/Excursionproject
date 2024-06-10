import React from 'react'
import { useProjects } from './hooks/useProject'
import { Project } from './Project'
import { CreateProjectForm } from './CreateProjectForm'
import { UpdateProjectForm } from './UpdateProjectForm'
import { Spinner } from '../../Spinner'

export const ProjectList = () => {
    const { projects, showCreateForm, OpenCreateForm, showUpdateForm, activeProject } = useProjects();

    return (
        <div>
            {showCreateForm && <CreateProjectForm />}
            {showUpdateForm && <UpdateProjectForm />}
            {!projects && <Spinner />}
            {
                projects &&
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Description</th>
                            <th>Role</th>
                            <th>To Do Tasks</th>
                            <th>In Progress Tasks</th>
                            <th>Done Tasks</th>
                            <th>Actions</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? (
                            projects.map(project => (
                                <Project key={project.id} project={project} />
                            ))
                        ) : (
                            <tr>
                                <td className="text-center">No projects available</td>
                            </tr>
                        )}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className="text-center">
                                <button className='btn btn-new-task' onClick={OpenCreateForm}>Create new project</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            }
        </div>
    );
};

