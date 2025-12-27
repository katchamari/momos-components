(function () {
  function closeAccordionItem(item) {
    return item.classList.remove("active");
  }
  function closeAllAccordionItems(accordion) {
    for (let item of accordion.querySelectorAll(".accordion-item"))
      closeAccordionItem(item);
  }
  function openAccordionItem(item) {
    return item.classList.add("active");
  }
  function toggleAccordionItem(item, accordion) {
    const toggledItemIsActive = item.classList.contains("active");
    closeAllAccordionItems(accordion);
    if (toggledItemIsActive) return closeAccordionItem(item);
    openAccordionItem(item);
  }

  const accordionItemLinks = document.querySelectorAll(
    ".toggle-accordion-item"
  );
  for (let link of accordionItemLinks) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const item = link.closest(".accordion-item");
      const accordion = link.closest(".accordion");
      toggleAccordionItem(item, accordion);
    });
  }
})();
