#!/usr/bin/env node
import { input } from "@inquirer/prompts";
import { dtoGenerator } from "./dto.command";
import { entityGenerator } from "./entity.command";
import { serviceGenerator } from "./service.command";
import { mapperGenerator } from "./mapper.command";
import { controllerGenerator } from "./controller.command";
import { moduleGenerator } from "./module.command";

async function bootstrap() {
  const className = await input({ message: "Enter your entity name : " });

  await dtoGenerator(className);
  await entityGenerator(className);
  await serviceGenerator(className);
  await mapperGenerator(className);
  await controllerGenerator(className);
  await moduleGenerator(className);
}

bootstrap();
