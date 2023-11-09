import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import hbs from "handlebars";

export const serviceGenerator = async (className: string) => {
  const contents = readFileSync(join(__dirname, "../templates/service.template.hbs"), "utf-8").toString();

  const data = {
    entityName: className,
    entityFileName: `./${className.toLowerCase()}.entity`,
    dtoName: `${className}DTO`,
    dtoFileName: `./${className.toLowerCase()}.dto`,
    mapperName: `${className}Mapper`,
    mapperVariableName: `${className.toLowerCase()}Mapper`,
    mapperFileName: `./${className.toLowerCase()}.mapper`,
    serviceName: `${className}Service`,
    repositoryName: `${className.toLowerCase()}Repository`
  };

  const template = hbs.compile(contents)(data);

  const fileName = `${className.toLowerCase()}.service.ts`;

  writeFileSync(join(__dirname, `../gen/${fileName}`), template, "utf-8");
};

