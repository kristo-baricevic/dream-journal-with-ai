
const createURL = (path: string) => {
    return window.location.origin + path;
}

export const updatedEntry = async (id: string, content: string) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: 'PATCH',
            body: JSON.stringify({ content }),
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
            method: 'POST',
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
};

export const deleteEntry = async (id: string) => {
    try {
        const url = createURL(`/api/journal/${id}`);
        const res = await fetch(
            new Request(url, {
                method: 'DELETE',
            })
        );

        if (res.ok) {
            return 'Entry deleted successfully';
        } else {
            const errorText = await res.text();
            console.error(`Failed to delete entry. Status: ${res.status}, Message: ${errorText}`);
            throw new Error(`Failed to delete entry. Status: ${res.status}, Message: ${errorText}`);
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
        throw error;
    }
};


export const askQuestion = async (question: string) => {
    const res = await fetch(
        new Request(createURL('/api/question'), {
            method: 'POST',
            body: JSON.stringify({ question }),
        }),
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    };
};

export const generateDream = async (question: string) => {
    const res = await fetch(
        new Request(createURL('/api/generate'), {
            method: 'POST',
            body: JSON.stringify({question}),
        })
    );

    if (res.ok) {
        const data = await res.json();
        return data.data;
    };
};
