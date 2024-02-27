

export async function apiCall(endpoint: string, method: string = 'GET', body: any = null): Promise<any> {
    try {
        const params = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body !== null ? JSON.stringify(body) : null,
        }
        const response = await fetch('/api/' + endpoint, params);

        if (!response.ok) {
            throw new Error(`Failed to fetch from endpoint ${'/api/' + endpoint}`)
        }

        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error:', error)
        return null;
    }
}