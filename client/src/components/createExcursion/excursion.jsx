// // import '../../../css/Modal.css';
// import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
// import { AuthContext } from '../utils/AuthContext';
// import { useCallback, useContext, useMemo } from 'react';
// import { useExcursion } from '../hooks/usecreateExcursion';

// export const Excursion = ({ excursion, isAdminOrOwner }) => {

//     const { id, name, image_data, duration_minutes, rating, price } = excursion;

//     const { user } = useContext(AuthContext);

//     const { FetchExcursions, OpenUpdateForm, OpenUpdateStatusForm, OpenViewForm, DeleteExcursion } = useExcursion();

//     let cssStatus = status.replace(/\s/g, '');
//     // Make all status words first letter capital
//     let displayStatus = status.split(' ').map((value) => value = value[0].toUpperCase() + value.substring(1)).join(" ");


//     const RemoveExcursion = useCallback(async () => {
//         //TODO Make a pop up with question: Are you sure you want to delete this task? Yes & No

//         const [status] = await DeleteExcursion(id)
//         if (status !== 200) {
//             switch (status) {
//                 case 400: {
//                     alert("Task no longer exists");
//                     break;
//                 }
//                 case 401: {
//                     alert("You dont have privileges to perform this action");
//                     break;
//                 }
//             }
//             return;
//         }
//         FetchExcursions();
//     });

    

//     return <tr>
//         {/* ID */}
//         <td title={id}>{id}</td>
//         {/* Name */}
//         <td title={name}>
//             {
//                 name.length > 10 ?
//                     name.substr(0, 10) + " ..." :
//                     name

//             }
//         </td>
//         {/* Worker */}
//         <td title={worker_username}>{worker_username}</td>
//         {/* Description */}
//         <td className="expand" title={description}>
//             {
//                 description.length > 10 ?
//                     description.substring(0, 10) + " ..." :
//                     description
//             }
//         </td>
//         {/* Status */}
//         <td title={displayStatus}>
//             <span className={`label label-${cssStatus}`}>{displayStatus}</span>
//         </td>
//         {/* Task creation date */}
//         <td title={created}>{created}</td>
//         {/* Task deadline */}
//         <td title={deadline}>{deadline}</td>

//         {/* Buttons */}

//         <td title='actions'>
//             <span className="actions">
//                 <BsFillEyeFill onClick={() => OpenViewForm(excursion)} />
//                 {isAdminOrOwner ?

//                     <>
//                         <BsFillPencilFill onClick={() => OpenUpdateForm(excursion)} />
//                         <BsFillTrashFill className="delete-btn" onClick={RemoveExcursion} />
//                     </>
//                     :
//                     (user.username === worker_username ?

//                         <BsFillPencilFill onClick={() => OpenUpdateStatusForm(excursion)} />
//                         : <></>)
//                 }
//             </span>
//         </td>
//     </tr>;
// }

import { BsFillTrashFill, BsFillPencilFill, BsFillEyeFill } from "react-icons/bs";
// import { AuthContext } from '../utils/AuthContext';
import { useCallback } from 'react';
import { useExcursion } from './hook/useExcursion';

export const Excursion = ( excursion ) => {
    const { id, name,  duration_minutes, rating, price } = excursion;

    // const { user } = useContext(AuthContext);

    const { FetchExcursions, OpenUpdateForm, OpenUpdateStatusForm, OpenViewForm, DeleteExcursion } = useExcursion();

    // const cssStatus = status?.replace(/\s/g, '') || '';
    // const displayStatus = status ? status.split(' ').map(value => value.charAt(0).toUpperCase() + value.slice(1)).join(" ") : '';

    const RemoveExcursion = useCallback(async () => {
        if (!window.confirm("Are you sure you want to delete this excursion?")) return;

        const [status] = await DeleteExcursion(id);
        if (status !== 200) {
            switch (status) {
                case 400:
                    alert("Excursion no longer exists");
                    break;
                case 401:
                    alert("You don't have privileges to perform this action");
                    break;
                default:
                    alert("An error occurred");
            }
            return;
        }
        FetchExcursions();
    }, [ DeleteExcursion, FetchExcursions]);

    return (
        <tr>
             {/* ID */}
        <td title={id}>{id}</td>
            {/* Name */}
            <td title={name}>
                {name.length > 10 ? `${name.substring(0, 10)} ...` : name}
            </td>
            {/* Image Data */}
            {/* <td>
                {image_data && <img src={image_data} alt={name} title={name} />}
            </td> */}
            {/* Duration */}
            <td title={`${duration_minutes} minutes`}>{duration_minutes} min</td>
            {/* Rating */}
            <td title={`Rating: ${rating}`}>{rating}</td>
            {/* Price */}
            <td title={`Price: $${price}`}>${price}</td>
                    
            {/* Actions */}
            <td title="actions">
                <span className="actions">
                    <BsFillEyeFill aria-label="View Excursion" onClick={() => OpenViewForm(excursion)} />
                    
                            <BsFillPencilFill aria-label="Edit Excursion" onClick={() => OpenUpdateForm(excursion)} />
                            <BsFillTrashFill className="delete-btn" aria-label="Delete Excursion" onClick={RemoveExcursion} />
                    
                    
                        <BsFillPencilFill aria-label="Update Status" onClick={() => OpenUpdateStatusForm(excursion)} />
                    
                </span>
            </td>
        </tr>
    );
}
