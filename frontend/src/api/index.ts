import type {Facility} from '../types/facilities.ts'

export async function getAllFacilities(): Promise<Facility[]> {
    return genericFetch<Facility[]>('/api/facilities/getAll', 'Failed to fetch facilities')
}

export async function getFacilityById(id: string): Promise<Facility> {
    return genericFetch<Facility>(`/api/facilities/id/${id}`, `Failed to fetch facility with id ${id}`)
}

async function genericFetch<T>(url: string, customErrorMsg?: string): Promise<T> {
    const response = await fetch(url)
    if (!
        response.ok
    ) {
        throw new Error(customErrorMsg ?? `Failed to load call: ${response.status}`)
    }
    return response.json()
}