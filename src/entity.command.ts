import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import hbs from "handlebars";

export const entityGenerator = async (className: string) => {
  const contents = readFileSync(join(__dirname, "../templates/entity.template.hbs"), "utf-8").toString();

  const data = {
    className: className,
    entityName: `${className.toLowerCase()}s`
  };

  const template = hbs.compile(contents)(data);

  const fileName = `${className.toLowerCase()}.entity.ts`;

  writeFileSync(join(__dirname, `../gen/${fileName}`), template, "utf-8");
};

