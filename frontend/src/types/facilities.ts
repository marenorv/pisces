export interface Facility {
    id: string;
    name: string;
    registeredDate: string;
    organizations: Organization[]
}

export interface Organization {
    id: string;
    name: string;
}
