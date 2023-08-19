const getData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
}

const apidata = await getData();
export default apidata;