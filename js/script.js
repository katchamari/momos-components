(async function () {
  function createComponent(component) {
    function createCodeBlock(type, content) {
      const pre = document.createElement("pre");
      const code = document.createElement("code");
      pre.classList.add("component-code", `code-${type}`);
      code.classList.add(`language-${type}`);
      code.textContent = content;
      pre.append(code);
      return pre;
    }
    const componentSection = document.createElement("section");
    componentSection.classList.add("component");
    const componentHeader = document.createElement("header");
    componentHeader.classList.add("component-header");
    componentHeader.innerHTML = `
    <nav>
        <ul>
            <li>
            <ul>
                <li class="active"><a class="#result">Result</a></li>
            </ul>
            </li>
            <li>
            <ul>
                <li><a class="view-code" href="#html">HTML</a></li>
                <li><a class="view-code" href="#css">CSS</a></li>
                <li><a class="view-code" href="#js">JavaScript</a></li>
            </ul>
            </li>
        </ul>
        </nav>
    `;
    const componentContent = document.createElement("div");
    componentContent.classList.add("component-content");
    const iframe = document.createElement("iframe");
    iframe.setAttribute("src", component.path);
    iframe.classList.add("component-result");

    componentContent.append(iframe);
    for (let type of ["html", "css", "js"]) {
      componentContent.append(createCodeBlock(type, component[type]));
    }
    componentSection.append(componentHeader);
    componentSection.append(componentContent);
    return componentSection;
  }

  const container = document.querySelector(".container");
  const data = await (await fetch("./contents.json")).json();
  for (let component of data) {
    const section = createComponent(component);
    container.append(section);

    for (let viewCodeLink of section.querySelectorAll(".view-code")) {
      viewCodeLink.addEventListener("click", function (e) {
        e.preventDefault();
        const component = this.closest(".component");
        const codeType = this.getAttribute("href").replace("#", "");

        const selectedBlock = component.querySelector(
          `.component-code.code-${codeType}`
        );
        const selectedBlockAlreadyActive =
          selectedBlock.classList.contains("active");
        for (let block of component.querySelectorAll(".component-code")) {
          block.classList.remove("active");
        }
        for (let tab of component.querySelectorAll(
          ".component-header li:has(>.view-code)"
        )) {
          tab.classList.remove("active");
        }
        if (selectedBlockAlreadyActive) return;
        selectedBlock.classList.add("active");
        this.closest("li").classList.add("active");
      });
    }
  }
})();
