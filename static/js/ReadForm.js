const HttpMethods = {
  GET: "GET",
  POST: "POST",
};

function showModal(msg) {
  loader.className = "none";
  modal.className = "block";
  info.innerText = `${msg}`;
}

const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const loader = document.getElementById("loader");
const info = document.querySelector("#modal > p");

overlay.addEventListener("click", () => {
  overlay.className = "none";
  modal.className = "none";
  loader.className = "none";
  clearFields(form);
});

const form = document.querySelector(".form");

const callApi = async ({ data, method = HttpMethods.GET }) => {
  const response = await fetch("/mail", {
    method,
    body: data ? JSON.stringify(data) : null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  return await response.json();
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
    clearFields(form);
    showModal(err);
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  overlay.className = "block";
  loader.className = "block";
  sendHandler();
});
