// import { useCallback, createContext, useContext, useEffect, useState } from "react";
// import ExcursionModel from "../../../components/api/excursion";

// const excursionContext = createContext();

// export const useExcursion = () => useContext(excursionContext);

// export const excursionProvider = ({ children, create_excursion_id }) => {

//     const [excursion, setExcursion] = useState();
//     const [activeExcursion, setActiveExcursion] = useState();
//     const [fetchExcursion, setFetchExcursion] = useState();
//     const FetchExcursion = useCallback(() => setFetchExcursion(v => !v), [fetchExcursion]);

//     const [showCreateForm, setShowCreateForm] = useState(false);
//     const [showUpdateForm, setShowUpdateForm] = useState(false);
//     const [showUpdateStatusForm, setShowUpdateStatusForm] = useState(false);
//     const [showViewForm, setShowViewForm] = useState(false);

//     const OpenCreateForm = useCallback(() => {
//         setShowCreateForm(true);
//     });
//     const CloseCreateForm = useCallback(() => {
//         setShowCreateForm(false);
//     })

//     const OpenUpdateForm = useCallback((excursion) => {
//         setActiveExcursion(excursion);
//         setShowUpdateForm(true);
//     });

//     const CloseUpdateForm = useCallback(() => {
//         setActiveExcursion();
//         setShowUpdateForm(false);
//     });

//     const OpenUpdateStatusForm = useCallback((excursion) => {
//         setActiveExcursion(excursion);
//         setShowUpdateStatusForm(true);
//     })

//     const CloseUpdateStatusForm = useCallback(() => {
//         setActiveExcursion();
//         setShowUpdateStatusForm(false);
//     });

//     const OpenViewForm = useCallback((excursion) => {
//         setActiveExcursion(excursion);
//         setShowViewForm(true);
//     })

//     const CloseViewForm = useCallback(() => {
//         setActiveExcursion();
//         setShowViewForm(false);
//     })

//     const createExcursion = async (data) => {
//         const excursion = { ...data, create_excursion_id };
//         const response = await ExcursionModel.createExcursion(excursion);
//         return [response.status, response.data];
//     };

//     const UpdateExcursion = async (data) => {
//         const excursion = { ...data, create_excursion_id };
//         const response = await ExcursionModel.updateExcursion(excursion);
//         return [response.status, response.data];
//     };

//     const UpdateExcursionStatus = async (excursion) => {
//         const response = await ExcursionModel.updateExcursionStatus(excursion);
//         return [response.status, response.data];
//     };

//     const DeleteExcursion = async (id) => {
//         const response = await ExcursionModel.deleteExcursion(id);
//         return [response.status, response.data];
//     };

//     useEffect(() => {
//         (async () => {
//             const response = await ExcursionModel.getProjectExcursions(create_excursiont_id);
//             if (response.status === 200) {
//                 setExcursions(response.data);
//             }
//         })();

//     }, [fetchExcursions]);


//     return (
//         <excursionContext.Provider value={{
//             excursion, activeExcursion, fetchExcursion, FetchExcursion,
//             CreateExcursion, showCreateForm, OpenCreateForm, CloseCreateForm,
//             UpdateExcursion, showUpdateForm, OpenUpdateForm, CloseUpdateForm,
//             UpdateExcursionStatus, showUpdateStatusForm, OpenUpdateStatusForm, CloseUpdateStatusForm,
//             showViewForm, OpenViewForm, CloseViewForm,
//             DeleteExcursion
//         }}>{excursions && children}</excursionContext.Provider>
//     )
// }



import { useCallback, createContext, useContext, useEffect, useState } from "react";
import ExcursionModel from "../../../components/api/excursion";

const excursionContext = createContext();

export const useExcursion = () => useContext(excursionContext);

export const ExcursionProvider = ({ children, create_excursion_id }) => {
    const [excursions, setExcursions] = useState([]);
    const [activeExcursion, setActiveExcursion] = useState(null);
    const [fetchExcursions, setFetchExcursions] = useState(false);
    const fetchExcursion = useCallback(() => setFetchExcursions(v => !v), []);

    const [showCreateForm, setShowCreateForm] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [showUpdateStatusForm, setShowUpdateStatusForm] = useState(false);
    const [showViewForm, setShowViewForm] = useState(false);

    const openCreateForm = useCallback(() => setShowCreateForm(true), []);
    const closeCreateForm = useCallback(() => setShowCreateForm(false), []);

    const openUpdateForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowUpdateForm(true);
    }, []);

    const closeUpdateForm = useCallback(() => {
        setActiveExcursion(null);
        setShowUpdateForm(false);
    }, []);

    const openUpdateStatusForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowUpdateStatusForm(true);
    }, []);

    const closeUpdateStatusForm = useCallback(() => {
        setActiveExcursion(null);
        setShowUpdateStatusForm(false);
    }, []);

    const openViewForm = useCallback((excursion) => {
        setActiveExcursion(excursion);
        setShowViewForm(true);
    }, []);

    const closeViewForm = useCallback(() => {
        setActiveExcursion(null);
        setShowViewForm(false);
    }, []);

    const createExcursion = async (data) => {
        const excursion = { ...data, create_excursion_id };
        const response = await ExcursionModel.createExcursion(excursion);
        fetchExcursion();
        return [response.status, response.data];
    };

    const updateExcursion = async (data) => {
        const excursion = { ...data, create_excursion_id };
        const response = await ExcursionModel.updateExcursion(excursion);
        fetchExcursion();
        return [response.status, response.data];
    };

    const updateExcursionStatus = async (excursion) => {
        const response = await ExcursionModel.updateExcursionStatus(excursion);
        fetchExcursion();
        return [response.status, response.data];
    };

    const deleteExcursion = async (id) => {
        const response = await ExcursionModel.deleteExcursion(id);
        fetchExcursion();
        return [response.status, response.data];
    };

    useEffect(() => {
        (async () => {
            const response = await ExcursionModel.getProjectExcursions(create_excursion_id);
            if (response.status === 200) {
                setExcursions(response.data);
            }
        })();
    }, [fetchExcursions, create_excursion_id]);

    return (
        <excursionContext.Provider value={{
            excursions,
            activeExcursion,
            fetchExcursion,
            fetchExcursions,
            createExcursion,
            showCreateForm,
            openCreateForm,
            closeCreateForm,
            updateExcursion,
            showUpdateForm,
            openUpdateForm,
            closeUpdateForm,
            updateExcursionStatus,
            showUpdateStatusForm,
            openUpdateStatusForm,
            closeUpdateStatusForm,
            showViewForm,
            openViewForm,
            closeViewForm,
            deleteExcursion
        }}>
            {children}
        </excursionContext.Provider>
    );
};

