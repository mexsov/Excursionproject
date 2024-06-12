// import '../../../css/Modal.css';
import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
import { AuthContext } from '../utils/AuthContext';
import { useCallback, useContext, useMemo } from 'react';
import { usecreateExcursion } from '../hooks/usecreateExcursion';

export const createExcursion = ({ createExcursion, isAdminOrOwner }) => {

    const { id, name, image_data, duration_minutes, rating, price } = createExcursion;

    const { user } = useContext(AuthContext);

    const { FetchcreateExcursion, OpenUpdateForm, OpenUpdateStatusForm, OpenViewForm, DeletecreateExcursion } = usecreateExcursion();

    let cssStatus = status.replace(/\s/g, '');
    // Make all status words first letter capital
    let displayStatus = status.split(' ').map((value) => value = value[0].toUpperCase() + value.substring(1)).join(" ");


    const RemovecreateExcursion = useCallback(async () => {
        //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

        const [status] = await DeletecreateExcursion(id)
        if (status !== 200) {
            switch (status) {
                case 400: {
                    alert("Task no longer exists");
                    break;
                }
                case 401: {
                    alert("You dont have privileges to perform this action");
                    break;
                }
            }
            return;
        }
        FetchcreateExcursion();
    });

    const created = useMemo(() => {
        const date = new Date(created_on);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [created_on]);

    const deadline = useMemo(() => {
        const date = new Date(planned_end_date);
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
        return `${yyyy}-${mm}-${dd}`;
    }, [planned_end_date]);

    return <tr>
        {/* ID */}
        <td title={id}>{id}</td>
        {/* Name */}
        <td title={name}>
            {
                name.length > 10 ?
                    name.substr(0, 10) + " ..." :
                    name

            }
        </td>
        {/* Worker */}
        <td title={worker_username}>{worker_username}</td>
        {/* Description */}
        <td className="expand" title={description}>
            {
                description.length > 10 ?
                    description.substring(0, 10) + " ..." :
                    description
            }
        </td>
        {/* Status */}
        <td title={displayStatus}>
            <span className={`label label-${cssStatus}`}>{displayStatus}</span>
        </td>
        {/* Task creation date */}
        <td title={created}>{created}</td>
        {/* Task deadline */}
        <td title={deadline}>{deadline}</td>

        {/* Buttons */}

        <td title='actions'>
            <span className="actions">
                <BsFillEyeFill onClick={() => OpenViewForm(task)} />
                {isAdminOrOwner ?

                    <>
                        <BsFillPencilFill onClick={() => OpenUpdateForm(task)} />
                        <BsFillTrashFill className="delete-btn" onClick={RemovecreateExcursion} />
                    </>
                    :
                    (user.username === worker_username ?

                        <BsFillPencilFill onClick={() => OpenUpdateStatusForm(task)} />
                        : <></>)
                }
            </span>
        </td>
    </tr>;
}
