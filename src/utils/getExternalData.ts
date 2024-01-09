import { extract } from '@extractus/article-extractor'
import * as cheerio from 'cheerio'

export default async function getExternalData(URL: string) {
  const extractedData = await extract(URL);
  const content = extractedData ? extractedData.content : null;

  const $ = cheerio.load(content);

  const tablaAnual = $("p:contains('Tabla Anual 2024 (Copas+Descenso)')");
  const zonaA = $("p:contains('ZONA A')");
  const zonaB = $("p:contains('ZONA B')");

  return {
    $,
    tablaAnual,
    zonaA,
    zonaB
  }
}