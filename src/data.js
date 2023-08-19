const getData = async () => {
    const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    localStorage.setItem("api-local", JSON.stringify(data));
    return data;
}

const apidata = localStorage['api-local'] ? JSON.parse(localStorage['api-local']) : await getData();
export default apidata;
