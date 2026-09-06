import type {FC} from "react";
import {FacilityForm} from "@components/facility-form/FacilityForm.tsx";

export const AddFacility: FC = () => {
   return <FacilityForm mode='new' data={null} isError={false} isLoading={false} />
}