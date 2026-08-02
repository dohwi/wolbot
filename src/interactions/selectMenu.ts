import { type StringSelectMenuInteraction } from 'discord.js';
import { readDB, writeDB } from '../db.js';

export const handleSelectMenu = async (i: StringSelectMenuInteraction): Promise<void> => {
  if (i.customId !== 'wol-remove-select') return;
  const name = i.values[0];
  const db = await readDB();
  const next = db.filter((x) => x.name !== name);
  if (next.length === db.length) {
    await i.update({ content: `${name} 항목이 없습니다.`, components: [] });
    return;
  }
  await writeDB(next);
  await i.update({ content: `🗑 제거됨: **${name}**`, components: [] });
};