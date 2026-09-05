export interface Facility {
    id: string;
    name: string;
    registeredDate: string;
    organizations: Organization[]
    fishes: Fish[]
}

export interface Organization {
    id: string;
    name: string;
}

export interface Fish {
    id: string;
    nbLabel: string;
    enLabel: string;
}
