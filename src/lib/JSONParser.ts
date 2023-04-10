import { Model } from "mongoose";
import { APIobject } from "./types/objectType";

const fs = require("fs");
const path2 = require("path");

function JSONWriter(path: string, data: Array<APIobject>) {
  if (fs.existsSync(path)) {
    const extension = String(path.split(".").pop());
    const cheminSansExtension = path.slice(0, -extension.length - 1);
    let i = 1;

    // Trouver un nom de fichier disponible en ajoutant un numéro à la fin
    while (fs.existsSync(`${cheminSansExtension}_${i}.${extension}`)) {
      i++;
    }

    path = `${cheminSansExtension}_${i}.${extension}`;
  }

  fs.writeFile(path, JSON.stringify(data), (err: any) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(
      `Le fichier ${path} a été créé et les données ont été écrites.`
    );
  });
}

function parseDataRequest(
  params: Array<{ key: string; getter: any }>,
  filters: any,
  otherParams: Array<{ key: string; getter: any }>
) {
  const paramsParsed = parseParams(params);
  const filtersParsed = parsedFilters(filters);
  const otherParamsParsed = parsedOtherParams(otherParams);

  return paramsParsed.concat(filtersParsed, otherParamsParsed);
}

//Generate filters

function makeArrayOfObject<T extends Model<any>>(
  item: any,
  model: T
): APIobject {
  const filter = parseDataRequest(
    item.filter,
    item.functionPropeties.filter,
    item.otherParams
  );

  return {
    category: model.modelName,
    name: item.name,
    description: item.description,
    path: item.path,
    request: item.request,
    parameters: filter,
  } as APIobject;
}

/*
 *
 *
 *
 *
 *
 *
 *
 */

//Documenatation parsing

export function parseJsonArray<T extends Model<any>>(
  arr: Array<APIobject>,
  model: T
): void {
  const parsedData: Array<APIobject> = [];

  for (const item of arr) {
    parsedData.push(makeArrayOfObject(item, model));
  }

  JSONWriter("./documentation/data.json", parsedData);
  // mergeJsonFiles("./documentation", "./out/final.json");
}

function parseFunctionParams(funcString1: string) {
  const regex = /"([^"]*)"/g;
  const matches = funcString1.match(regex);
  return matches
    ?.map((param) => param.replace(/"/g, ""))
    .filter((param) => !param.startsWith("$"));
}

function parseParams(params: Array<{ key: string; getter: any }>) {
  const finalArray = [];

  if (!params) {
    return [];
  }

  for (const param of params) {
    if (typeof param.getter === "function") {
      if (
        String(param.getter).includes('"body"') ||
        String(param.getter).includes('"query"')
      ) {
        const value = parseFunctionParams(String(param.getter));
        if (value) {
          finalArray.push({ key: value[0], getter: value[1] });
        }
      }
      continue;
    }
    finalArray.push(param);
  }
  return finalArray;
}

function parsedFilters(filters: any) {
  const params = [];

  if (!filters) {
    return [];
  }

  for (const filter in filters) {
    if (typeof filters[filter] === "function") {
      const value = parseFunctionParams(String(filters[filter]));
      if (value) {
        params.push({ key: value[0], getter: value[1] });
      }
    } else if (typeof filters[filter] === "object") {
      for (const key in filters[filter]) {
        if (typeof filters[filter][key] === "function") {
          const objValue = parseFunctionParams(String(filters[filter][key]));
          if (objValue) {
            params.push({ key: objValue[0], getter: objValue[1] });
          }
        }
      }
    }
  }
  return params;
}

function parsedOtherParams(otherParams: any) {
  const finalArray = [];
  if (!otherParams) {
    return [];
  }

  for (const param of otherParams) {
    if (typeof param.getter === "function") {
      if (
        String(param.getter).includes('"body"') ||
        String(param.getter).includes('"query"')
      ) {
        const value = parseFunctionParams(String(param.getter));
        if (value) {
          finalArray.push({ key: value[0], getter: value[1] });
        }
      }
      continue;
    }
    finalArray.push(param);
  }
  return finalArray;
}
