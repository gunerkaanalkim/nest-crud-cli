import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import hbs from "handlebars";

export const moduleGenerator = async (className: string) => {
  const contents = readFileSync(join(__dirname, "../templates/module.template.hbs"), "utf-8").toString();

  const data = {
    entityName: className,
    entityFileName: `./${className.toLowerCase()}.entity`,
    mapperName: `${className}Mapper`,
    mapperFileName: `./${className.toLowerCase()}.mapper`,
    serviceName: `${className}Service`,
    serviceFileName: `./${className.toLowerCase()}.service`,
    controllerName: `${className.charAt(0).toUpperCase() + className.slice(1)}Controller`,
    controllerFileName: `./${className.toLowerCase()}.controller`,
    moduleName: `${className.charAt(0).toUpperCase() + className.slice(1)}Module`,
  };

  const template = hbs.compile(contents)(data);

  const fileName = `${className.toLowerCase()}.module.ts`;

  writeFileSync(join(__dirname, `../gen/${fileName}`), template, "utf-8");
};

