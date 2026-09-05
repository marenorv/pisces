import {FacilityList} from "@components/facility-list/FacilityList.tsx";
import type {Facility} from "@type/facilities.ts";

export const Main = () => {
    const facilities: Facility[] = [
        {
            name: 'Marens merder'
        },
        {
            name: 'Bergen oppdrett'
        }
    ]

    return (
        <div className='pisces-main'>
            <FacilityList facilities={facilities}/>
        </div>
    )
}