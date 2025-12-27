const { readFile, writeFile } = require("fs/promises");

(function () {
  const fs = require("fs");
  const path = require("path");
  async function script() {
    try {
      const components = [];
      function getDirectories(dirPath) {
        const dirents = fs.readdirSync(dirPath, { withFileTypes: true });

        const folders = dirents
          .filter((dirent) => dirent.isDirectory())
          .map((dirent) => dirent.name);

        return folders;
      }
      const componentsDir = "./components/";
      const foldersInComponentsDir = getDirectories(componentsDir);
      for (let folder of foldersInComponentsDir) {
        const htmlFilePath = path.join(componentsDir, folder, "index.html");
        const cssFilePath = path.join(componentsDir, folder, "styles.css");
        const jsFilePath = path.join(componentsDir, folder, "script.js");
        const component = { name: folder, path: htmlFilePath };

        const [htmlData, cssData, jsData] = await Promise.all([
          readFile(htmlFilePath, "utf8"),
          readFile(cssFilePath, "utf8"),
          readFile(jsFilePath, "utf8"),
        ]);
        component.html = htmlData.split("<body>")[1];
        component.html = component.html.split("</body>")[0];
        component.html = component.html
          .replace('<script src="./script.js"></script>', "")
          .trim();
        component.css = cssData;
        component.js = jsData
          .split("(function () {")[1]
          .split("})();")[0]
          .trim();
        components.push(component);
      }
      await writeFile("contents.json", JSON.stringify(components));
      console.log("Successfully replaced contents.json");
    } catch (err) {
      console.error(err);
    } finally {
      process.exit();
    }
  }
  script();
})();
