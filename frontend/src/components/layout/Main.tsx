import {Navigate, Route, Routes} from "react-router-dom";
import {FacilityList} from "@components/facility-list/FacilityList.tsx";
import {FacilityDetails} from "@components/facility-details/FacilityDetails.tsx";
import {EditFacility} from "@components/facility-form/modes/edit/EditFacility.tsx";
import {AddFacility} from "@components/facility-form/modes/add/AddFacility.tsx";

export const Main = () => {
    return (
        <div className='pisces-main'>
            <Routes>
                <Route path='/' element={<Navigate to='/facilities' replace/>}/>
                <Route path='/facilities' element={<FacilityList/>}/>
                <Route path='/facilities/new' element={<AddFacility/>}/>
                <Route path='/facilities/:id' element={<FacilityDetails/>}/>
                <Route path='/facilities/:id/edit' element={<EditFacility/>}/>
            </Routes>
        </div>
    )
}