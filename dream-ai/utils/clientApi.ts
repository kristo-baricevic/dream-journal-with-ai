
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
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: 'DELETE',
        })
    );

    if (res.ok) {
        return 'Entry deleted successfully';
    } else {
        throw new Error('Failed to delete entry');
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