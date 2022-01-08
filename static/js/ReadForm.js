const HttpMethods = {
  GET: "GET",
  POST: "POST",
};

function showModal(err) {
  const info = document.querySelector(".modal > p");
  modal.style.display = "block";
  info.innerHTML = `${err}`;
}

const modalOverlayBlock = document.querySelector(".overlay");
const modal = document.querySelector(".wrapper");

modalOverlayBlock.addEventListener("click", () => {
  modal.style.display = "none";
  clearFields(form);
});

const form = document.querySelector(".form");

const callApi = ({ data, method = HttpMethods.GET }) => {
  return fetch(process.env.API_ROOT, {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((err) => showModal(err));
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
    }

    clearFields(form);
    showModal(response);
    return;
  } catch (err) {
    showModal(err);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendHandler();
});
