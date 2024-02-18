

export async function apiCall(endpoint: string): Promise<any> {
    try {
        const response = await fetch('/api/' + endpoint);

        if (!response.ok) {
            throw new Error(`Failed to fetch from endpoint ${'/api/' + endpoint}`)
        }

        const data = await response.json();
        console.log("api call")
        console.log(data)
        return data
    } catch (error) {
        console.error('Error:', error)
        return null;
    }
}

export function getPuzzle(response: any) {
    console.log("getting puzzle")
    console.log(response.puzzle)
    return response.puzzle;
}