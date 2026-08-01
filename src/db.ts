import { readFile, writeFile } from 'node:fs/promises';

export interface WolItem {
  name: string;
  mac: string;
}

const DB_PATH = 'wol.json';

export const readDB = async (): Promise<WolItem[]> => {
  const raw = await readFile(DB_PATH, 'utf8').catch(() => '');
  return raw ? (JSON.parse(raw) as WolItem[]) : [];
};

export const writeDB = (items: WolItem[]): Promise<void> =>
  writeFile(DB_PATH, JSON.stringify(items, null, 2));

export const MAC_RE = /^([0-9A-Fa-f]{2}[:-]){5}[0-9A-Fa-f]{2}$/;
export const normMac = (mac: string): string => mac.trim().toLowerCase();