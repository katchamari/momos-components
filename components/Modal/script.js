(function () {
  function closeModal(modal) {
    modal.classList.add("invisible");
    setTimeout(() => {
      modal.classList.add("hidden");
    }, 300);
  }
  function openModal(modal) {
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("invisible");
    }, 10);
  }
  function getModal(link) {
    const modalId = link.getAttribute("href");
    return document.querySelector(modalId);
  }
  const openModalLinks = document.querySelectorAll(".open-modal");
  for (let link of openModalLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modal = getModal(this);
      openModal(modal);
    });
  }
  const closeModalLinks = document.querySelectorAll(".close-modal");
  for (let link of closeModalLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const modal = getModal(this);
      closeModal(modal);
    });
  }
})();
