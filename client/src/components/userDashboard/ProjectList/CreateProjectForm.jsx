import React, { useCallback } from 'react'
import { useForm } from "react-hook-form";
import { useProjects } from './hooks/useProject';

export const CreateProjectForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const { FetchProjects, createProject, CloseCreateForm } = useProjects();

    const onFormSubmit = useCallback(async (data) => {


        const [status, responseData] = await createProject(data);

        if (status === 201) {
            FetchProjects();
            CloseCreateForm();
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
            if (e.target.className === "modal-container") CloseCreateForm();
        }}>
            <div className="modal">
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <div className='form-group'>
                <label htmlFor='name'>Name</label>
                <input type='text'{...register('name')} />
                {errors.name && <p>{errors.name.message}</p>}
            </div>
            <div className='form-group'>
                <label htmlFor='description'>Description</label>
                <input type='text'{...register('description')} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>

            <button type='submit'>Create Project</button>
        </form>
        </div>
        </div>
    )
}