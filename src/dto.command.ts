import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import hbs from "handlebars";

export const dtoGenerator = async (className: string) => {
  const contents = readFileSync(join(__dirname, "../templates/dto.template.hbs"), "utf-8").toString();

  const data = {
    classname: className
  };

  const template = hbs.compile(contents)(data);

  const fileName = `${className.toLowerCase()}.dto.ts`;

  writeFileSync(join(process.cwd(), `${fileName}`), template, "utf-8");
};

