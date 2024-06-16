import { useCallback, createContext, useContext, useEffect, useState } from "react";
import ExcursionModel from "../../../components/api/excursion";

const excursionContext = createContext();

export const useExcursion = () => useContext(excursionContext);

export const excursionProvider = ({ children, excursion_id }) => {

    const [excursion, setExcursion] = useState();
    const [activeExcursion, setActiveExcursion] = useState();
    const [fetchExcursion, setFetchExcursion] = useState();
    const FetchExcursion = useCallback(() => setFetchExcursion(v => !v), [fetchExcursion]);

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

    const OpenUpdateForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowUpdateForm(true);
    });

    const CloseUpdateForm = useCallback(() => {
        setActiveExcursion();
        setShowUpdateForm(false);
    });

    const OpenUpdateStatusForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowUpdateStatusForm(true);
    })

    const CloseUpdateStatusForm = useCallback(() => {
        setActiveExcursion();
        setShowUpdateStatusForm(false);
    });

    const OpenViewForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowViewForm(true);
    })

    const CloseViewForm = useCallback(() => {
        setActiveExcursion();
        setShowViewForm(false);
    })

    const createExcursion = async (data) => {
        const excursion = { ...data, create_excursion_id };
        const response = await ExcursionModel.createExcursion(excursion);
        return [response.status, response.data];
    };

    const UpdateExcursion = async (data) => {
        const excursion = { ...data, create_excursion_id };
        const response = await ExcursionModel.updateExcursion(excursion);
        return [response.status, response.data];
    };

    const UpdateExcursionStatus = async (excursion) => {
        const response = await ExcursionModel.updateExcursionStatus(excursion);
        return [response.status, response.data];
    };

    const DeleteExcursion = async (id) => {
        const response = await ExcursionModel.deleteExcursion(id);
        return [response.status, response.data];
    };

    useEffect(() => {
        (async () => {
            const response = await ExcursionModel.getProjectExcursions(create_excursiont_id);
            if (response.status === 200) {
                setExcursions(response.data);
            }
        })();

    }, [fetchExcursions]);


    return (
        <excursionContext.Provider value={{
            excursion, activeExcursion, fetchExcursion, FetchExcursion,
            CreateExcursion, showCreateForm, OpenCreateForm, CloseCreateForm,
            UpdateExcursion, showUpdateForm, OpenUpdateForm, CloseUpdateForm,
            UpdateExcursionStatus, showUpdateStatusForm, OpenUpdateStatusForm, CloseUpdateStatusForm,
            showViewForm, OpenViewForm, CloseViewForm,
            DeleteExcursion
        }}>{excursions && children}</excursionContext.Provider>
    )
}
