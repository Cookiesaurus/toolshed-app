'use server';
 export async function formHandler(formData) {
    let rawFormData = [];
    for (const pair of formData.entries()) {
        const formDataEntry = {
            key: pair[0],
            value: pair[1]
        };
        rawFormData.push(formDataEntry);
    }
    
    // Now rawFormData is an array of objects, each representing a key-value pair from the FormData
    console.log(rawFormData);
}