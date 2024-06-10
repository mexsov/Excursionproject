import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import { useProjects } from './hooks/useProject';

export const UpdateProjectForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchProjects, updateProject, CloseUpdateForm, activeProject: project } = useProjects();

    const onFormSubmit = useCallback(async (data) => {
        const newProject = {
            id: project.id,
            name: data.name,
            description: data.description,
            status: data.status
        }

        const [status, responseData] = await updateProject(newProject);

        if (status === 200) {
            FetchProjects();
            CloseUpdateForm();
        } else if (status === 400) {
            for (let i = 0; i < responseData.errors.length; i++) {
                setError(responseData.errors[i].path, {
                    type: 'manual',
                    message: responseData.errors[i].msg,
                });
            }
        } else {
            // Handle other error cases
            alert('Error occurred while creating the project');
        }
    }, []);

    return (
        <div className="modal-container" onClick={(e) => {
            if (e.target.className === "modal-container") CloseUpdateForm();
        }}>
            <div className="modal">
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text'{...register('name', {
                    value: project.name,
                    minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters with a max of 255 characters"
                    },
                    maxLength: {
                        value: 255,
                        message: "Name must be at least 3 characters with a max of 255 characters"
                    }
                })} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='description'>description</label>
                <input type='text'{...register('description', {
                    value: project.description,
                    minLength: {
                        value: 10,
                        message: "Description must be at least 10 characters with a max of 500 characters"
                    },
                    maxLength: {
                        value: 500,
                        message: "Description must be at least 10 characters with a max of 500 characters"
                    }
                })} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='status'>Status</label>
                <select {...register('status', {
                    value: project.status
                })}>
                    <option value="ongoing">Ongoing</option>
                    <option value="done">Done</option>
                </select>
                {errors.status && <p>{errors.status.message}</p>}
            </div>

            <button type='submit' className='btn btn-new-task'>Update Project</button>
        </form>
        </div>
        </div>
    );
}
