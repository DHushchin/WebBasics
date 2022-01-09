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

const callApi = async ({ data, method = HttpMethods.GET }) => {
  try {
    const response = await fetch("/mail", {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    return showModal(err);
  }
};

const getFormData = (form) => {
  const temp = Array.from(form.elements).map((elem) => elem.value);
  temp.splice(-1);
  return Object.assign(
    ...["name", "surname", "age", "email", "phone"].map((n, i) => ({
      [n]: temp[i],
    }))
  );
};

const clearFields = (form) => {
  for (const field of form.elements) {
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
