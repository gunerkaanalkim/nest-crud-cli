import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";
import hbs from "handlebars";

export const mapperGenerator = async (className: string) => {
  const contents = readFileSync(join(__dirname, "../templates/mapper.template.hbs"), "utf-8").toString();

  const data = {
    entityName: className,
    entityFileName: `./${className.toLowerCase()}.entity`,
    dtoName: `${className}DTO`,
    dtoFileName: `./${className.toLowerCase()}.dto`,
    mapperName: `${className}Mapper`
  };

  const template = hbs.compile(contents)(data);

  const fileName = `${className.toLowerCase()}.mapper.ts`;

  writeFileSync(join(process.cwd(), `${fileName}`), template, "utf-8");
};

