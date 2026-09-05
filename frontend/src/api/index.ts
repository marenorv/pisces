import type {Count} from '../types/count.ts'

export async function incrementCount(): Promise<Count> {
    return genericFetch<Count>('/api/count/increment', 'Failed to increment count')
}

export async function getCurrentCount(): Promise<Count> {
    return genericFetch<Count>('/api/count/current', 'Failed to fetch current count')
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