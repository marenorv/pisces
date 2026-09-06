import type {Facility} from '../types/facilities.ts'
import type {FacilityFormValues} from "@type/form.ts";

export async function getAllFacilities(): Promise<Facility[]> {
    return genericFetch<Facility[]>('/api/facilities/getAll', 'Failed to fetch facilities')
}

export async function getFacilityById(id: string): Promise<Facility> {
    return genericFetch<Facility>(`/api/facilities/id/${id}`, `Failed to fetch facility with id ${id}`)
}

export async function updateFacility(id: string, values: FacilityFormValues): Promise<Facility> {
    return genericFetch<Facility>(
        `/api/facilities/id/${id}/update`,
        `Failed to update facility with id ${id}`,
        'PUT',
        values,
    )
}

async function genericFetch<T>(
    url: string,
    customErrorMsg?: string,
    method: string = 'GET',
    body?: unknown,
): Promise<T> {
    const response = await fetch(url, {
        method,
        headers: body !== undefined ? {'Content-Type': 'application/json'} : undefined,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    })
    if (!response.ok) {
        throw new Error(customErrorMsg ?? `Failed to load call: ${response.status}`)
    }
    return response.json()
}