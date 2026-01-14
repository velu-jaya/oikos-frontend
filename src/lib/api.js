const API_BASE_URL = 'http://127.0.0.1:8000'; // Using IP to avoid localhost/IPv6 resolution issues

export async function createProperty(propertyData) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to create property:', error);
        throw error;
    }
}

export async function getProperties() {
    try {
        const response = await fetch(`${API_BASE_URL}/properties`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        throw error;
    }
}

export async function getProperty(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`);

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch property details:', error);
        throw error;
    }
}

export async function updateProperty(id, propertyData) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyData),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to update property:', error);
        throw error;
    }
}

export async function deleteProperty(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to delete property:', error);
        throw error;
    }
}
