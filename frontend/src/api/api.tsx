

export async function apiCall(endpoint: string) {
    try {
        const response = await fetch('/api/' + endpoint);

        if (!response.ok) {
            throw new Error(`Failed to fetch from endpoint ${'/api/' + endpoint}`)
        }

        const data = await response.json();
        return data.puzzle
    } catch (error) {
        console.error('Error:', error)
    }
}