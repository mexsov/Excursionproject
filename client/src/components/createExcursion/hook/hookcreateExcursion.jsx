import { useCallback, createContext, useContext, useEffect, useState } from "react";
import createExcursion from "../../../../api/createExcursion";

const createExcursionContext = createContext();

export const usecreateExcursion = () => useContext(createExcursionContext);

export const createExcursionProvider = ({ children, createExcursion_id }) => {

    const [createExcursion, setcreateExcursion] = useState();
    const [activecreateExcursion, setActivecreateExcursion] = useState();
    const [fetchcreateExcursion, setFetchcreateExcursion] = useState();
    const FetchcreateExcursion = useCallback(() => setFetchcreateExcursion(v => !v), [fetchcreateExcursion]);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showUpdateStatusForm, setShowUpdateStatusForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);

    const OpenCreateForm = useCallback(() => {
        setShowCreateForm(true);
    });
    const CloseCreateForm = useCallback(() => {
        setShowCreateForm(false);
    })

    const OpenUpdateForm = useCallback((createExcursion) => {
        setActivecreateExcursion(createExcursion);
        setShowUpdateForm(true);
    });

    const CloseUpdateForm = useCallback(() => {
        setActivecreateExcursion();
        setShowUpdateForm(false);
    });

    const OpenUpdateStatusForm = useCallback((createExcursion) => {
        setActivecreateExcursion(createExcursion);
        setShowUpdateStatusForm(true);
    })

    const CloseUpdateStatusForm = useCallback(() => {
        setActivecreateExcursion();
        setShowUpdateStatusForm(false);
    });

    const OpenViewForm = useCallback((createExcursion) => {
        setActivecreateExcursion(createExcursion);
        setShowViewForm(true);
    })

    const CloseViewForm = useCallback(() => {
        setActivecreateExcursion();
        setShowViewForm(false);
    })

    const CreatecreateExcursion = async (data) => {
        const createExcursion = { ...data, createExcursion_id };
        const response = await createExcursionModel.createcreateExcursion(createExcursion);
        return [response.status, response.data];
    };

    const UpdateTask = async (data) => {
        const task = { ...data, project_id };
        const response = await TasksModel.updateTask(task);
        return [response.status, response.data];
    };

    const UpdateTaskStatus = async (task) => {
        const response = await TasksModel.updateTaskStatus(task);
        return [response.status, response.data];
    };

    const DeleteTask = async (id) => {
        const response = await TasksModel.deleteTask(id);
        return [response.status, response.data];
    };

    useEffect(() => {
        (async () => {
            const response = await createExcursionModel.getProjectcreateExcursion(createExcursiont_id);
            if (response.status === 200) {
                setcreateExcursion(response.data);
            }
        })();

    }, [fetchcreateExcursion]);


    return (
        <createExcursionContext.Provider value={{
            createExcursion, activecreateExcursion, fetchcreateExcursion, FetchcreateExcursion,
            CreatecreateExcursion, showCreateForm, OpenCreateForm, CloseCreateForm,
            UpdatecreateExcursion, showUpdateForm, OpenUpdateForm, CloseUpdateForm,
            UpdateTaskStatus, showUpdateStatusForm, OpenUpdateStatusForm, CloseUpdateStatusForm,
            showViewForm, OpenViewForm, CloseViewForm,
            DeleteTask
        }}>{createExcursion && children}</createExcursionContext.Provider>
    )
}