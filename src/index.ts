#!/usr/bin/env node
import EntityCommand from "./commands/entity.command";
import ControllerCommand from "./commands/controller.command";
import DtoCommand from "./commands/dto.command";
import ServiceCommand from "./commands/service.command";
import ModuleCommand from "./commands/module.command";
import MapperCommand from "./commands/mapper.command";
import chalk from "chalk";
import {program} from 'commander';
import fs from 'fs';


async function commandRunner() {
    program
        .name('nest-crud-cli')
        .description('nest-crud-cli')
        .version('0.0.8');

    program
        .option('-n, --name', 'entity name', 'SampleCLIEntity')
        .option('-p, --props', 'entity properties');

    program.parse();

    console.log()

    const className = program.args[0];
    const columns= program.args[1];

    fs.writeFile(`${className.toLowerCase()}.schema.json`,columns, function(err){
        if(err) {
            console.log(chalk.red(`Error : ${err}`));
        }

        console.log(chalk.green(
            'Creating file ' +
            chalk.blue.underline.bold(`${className.toLowerCase()}.schema.json`) +
            ' has been successful!'
        ));
    });

    console.log(chalk.yellow(`Working directory is ${process.cwd()}`));

    new EntityCommand().builder({
        data: {
            className: className,
            entityName: `${className.toLowerCase()}s`,
            props : {

            }
        },
        templatePath: "../../templates/entity.template.hbs",
    }).execute();

    new ControllerCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceVariableName: `${className.toLowerCase()}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerPathName: `${className.toLowerCase()}s`
        },
        templatePath: "../../templates/controller.template.hbs",
    }).execute();

    new DtoCommand().builder({
        data: {
            className: className
        },
        templatePath: "../../templates/dto.template.hbs",
    }).execute();

    new ServiceCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`,
            mapperVariableName: `${className.toLowerCase()}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            repositoryName: `${className.toLowerCase()}Repository`
        },
        templatePath: "../../templates/service.template.hbs",
    }).execute();

    new ModuleCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            mapperName: `${className}Mapper`,
            mapperFileName: `./${className.toLowerCase()}.mapper`,
            serviceName: `${className}Service`,
            serviceFileName: `./${className.toLowerCase()}.service`,
            controllerName: `${className.charAt(0).toUpperCase() + className.slice(1)}Controller`,
            controllerFileName: `./${className.toLowerCase()}.controller`,
            moduleName: `${className.charAt(0).toUpperCase() + className.slice(1)}Module`,
        },
        templatePath: "../../templates/module.template.hbs",
    }).execute();

    new MapperCommand().builder({
        data: {
            className: className,
            entityName: className,
            entityFileName: `./${className.toLowerCase()}.entity`,
            dtoName: `${className}DTO`,
            dtoFileName: `./${className.toLowerCase()}.dto`,
            mapperName: `${className}Mapper`
        },
        templatePath: "../../templates/mapper.template.hbs",
    }).execute();
}

commandRunner();
