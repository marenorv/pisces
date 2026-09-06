import {Route, Routes} from "react-router-dom";
import {FacilityList} from "@components/facility-list/FacilityList.tsx";
import {FacilityDetails} from "@components/facility-details/FacilityDetails.tsx";
import {EditFacility} from "@components/facility-edit/EditFacility.tsx";

export const Main = () => {
    return (
        <div className='pisces-main'>
            <Routes>
                <Route path='/' element={<FacilityList/>}/>
                <Route path='/facilities/:id' element={<FacilityDetails/>}/>
                <Route path='/facilities/:id/edit' element={<EditFacility/>}/>
            </Routes>
        </div>
    )
}