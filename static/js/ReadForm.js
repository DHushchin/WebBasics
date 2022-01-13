const HttpMethods = {
  GET: "GET",
  POST: "POST",
};

function showModal(msg) {
  modal.classList.remove("none");
  modal.classList.add("block");
  loader.classList.remove("block");
  loader.classList.add("none");
  document.querySelector(".modal > p").innerText = msg;
}

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const loader = document.querySelector(".loader");

const form = document.querySelector(".form");

overlay.addEventListener("click", () => {
  overlay.classList.remove("block");
  overlay.classList.add("none");
  modal.classList.remove("block");
  modal.classList.add("none");
  loader.classList.remove("block");
  loader.classList.add("none");
  form.reset();
});

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

    showModal(response);
    return;
  } catch (err) {
    showModal(err);
  } finally {
    form.reset();
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  overlay.classList.remove("none");
  loader.classList.remove("none");
  overlay.classList.add("block");
  loader.classList.add("block");
  sendHandler();
});
