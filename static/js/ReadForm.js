const HttpMethods = {
  GET: "GET",
  POST: "POST",
};

const form = document.querySelector(".form");

const callApi = ({ data, method = HttpMethods.GET }) => {
  return fetch(`https://dhushchin-first-website.herokuapp.com/mail`, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => console.err(`Error fetch request -> ${err}`));
};

const getFormData = (form) => {
  const formData = {};
  new FormData(form).forEach((value, key) => {
    formData[key] = value;
  });
  return formData;
};

const clearFields = (form) => {
  const fields = form.querySelectorAll("input");
  for (const field of fields) {
    field.value = "";
  }
};

const sendHandler = async () => {
  try {
    const formData = getFormData(form);

    const response = await callApi({
      data: formData,
      method: HttpMethods.POST,
    });

    if (response.error) {
      throw response;
    } else {
      clearFields(form);
      alert(response);
      return;
    }
  } catch (err) {
    throw new Error(err);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendHandler();
});
