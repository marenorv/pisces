import {Navigate, Route, Routes} from "react-router-dom";
import {FacilityList} from "@components/facility-list/FacilityList.tsx";
import {EditFacility} from "@components/facility-form/modes/edit/EditFacility.tsx";
import {AddFacility} from "@components/facility-form/modes/add/AddFacility.tsx";
import {ReadOnlyFacilityDetails} from "@components/facility-form/modes/read-only/ReadOnlyFacilityDetails.tsx";

export const Main = () => {
    return (
        <div className='pisces-main'>
            <Routes>
                <Route path='/' element={<Navigate to='/facilities' replace/>}/>
                <Route path='/facilities' element={<FacilityList/>}/>
                <Route path='/facilities/new' element={<AddFacility/>}/>
                <Route path='/facilities/:id' element={<ReadOnlyFacilityDetails/>}/>
                <Route path='/facilities/:id/edit' element={<EditFacility/>}/>
            </Routes>
        </div>
    )
}