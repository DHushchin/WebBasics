const API_ROOT = 'https://web-basics-dhushchin.vercel.app/api';

const HttpMethods = {
    GET: 'GET',
    POST: 'POST',
};

const callApi = ({ data, method = HttpMethods.GET }) => {
    return fetch(`${API_ROOT}/MessageHandler`, {
        method,
        //'Access-Control-Allow-Origin': `${API_ROOT}`,
        'Content-Type': data ? 'application/json' : null,
        body: data ? JSON.stringify(data) : null,
    }).then((response) => response.json());
    console.log(response.json);
    console.log(JSON.stringify(data));
};

const getFormData = (form) => {
    const formData = {};
    new FormData(form).forEach((value, key) => {
        formData[key] = value;
    });
    console.log(formData);
    
    return formData;
};

const clearFields = (form) => {
    const fields = form.querySelectorAll('input');
    for (const field of fields) {
        field.value = '';
    }
};

const form = document.querySelector('.form');

const sendHandler = async () => {
    const formData = getFormData(form);

    const response = await callApi({
        data: formData,
        method: HttpMethods.POST,
    });

    if (response.error) {
        throw response;
    } else {
        //clearFields(form);
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    sendHandler();
});