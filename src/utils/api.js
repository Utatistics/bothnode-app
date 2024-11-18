export const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Network Response Error');
    }

    return await response.json();
 }