import { EmotionType } from "../paramters/emotions";

const createURL = (path: string) => {
    return window.location.origin + path;
}

export const updatedEntry = async (id: string, content: string, personality: string, mood: EmotionType) => {
    try {
        const response = await fetch(createURL(`/api/journal/${id}`), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content, personality, mood }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Entry updated successfully:', data);
            return data;
        } else {
            const errorData = await response.json();
            console.error('Failed to update entry:', errorData);
            throw new Error('Failed to update entry');
        }
    } catch (error) {
        console.error('Error updating entry:', error);
        throw error;
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
    } else {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create entry');
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
