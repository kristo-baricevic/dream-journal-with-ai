import generateDreamDefer from "../defer/generate";
import askQuestionDefer from "../defer/question";


const createURL = (path: string) => {
    return window.location.origin + path
}

export const updatedEntry = async (id: string, content: string) => {
    const res = await fetch(
        new Request(createURL(`/api/journal/${id}`), {
            method: 'PATCH',
            body: JSON.stringify({ content }),
        })
    )

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
} 

export const createNewEntry = async () => {
    const res = await fetch(
        new Request(createURL('/api/journal'), {
            method: 'POST',
        })
    )

    if (res.ok) {
        const data = await res.json();
        return data.data;
    }
}

export const deleteEntry = async (id: string) => {

    console.log("id param", id);
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

    console.log("question after click", question);

    // const res = await fetch(
    //     new Request(createURL('/api/question'), {
    //         method: 'POST',
    //         body: JSON.stringify({ question }),
    //     }),
    // );

    const res = await askQuestionDefer(question);

    console.log("question res", res);

    // if (res.ok) {
    //     const data = await res.json();
    //     return data.data;
    // };

    if (res) {
        console.log("success?");
        return res;
    } else 
    
    return console.log("no res");
};

export const generateDream = async (question: string) => {
    // const res = await fetch(
    //     new Request(createURL('/api/generate'), {
    //         method: 'POST',
    //         body: JSON.stringify({question}),
    //     })
    // );

    const res = await generateDreamDefer(question);

    console.log("test res", res);

    // if (res.ok) {
    //     const data = await res.json();
    //     return data.data;
    // };
    
    if (res) {
        console.log("success?");
        return res;
    } else 
    
    return console.log("no res");

};