import { MessageFlags, type ModalSubmitInteraction } from 'discord.js';
import { readDB, writeDB, MAC_RE, normMac } from '../db.js';

export const handleModalSubmit = async (i: ModalSubmitInteraction): Promise<void> => {
  if (i.customId !== 'wol-add-modal') return;
  const name = i.fields.getTextInputValue('name').trim();
  const mac = i.fields.getTextInputValue('mac').trim();
  if (!MAC_RE.test(mac)) {
    await i.reply({ content: 'MAC 주소 형식이 잘못됐어. 예: AA:BB:CC:DD:EE:FF', flags: MessageFlags.Ephemeral });
    return;
  }
  const db = await readDB();
  if (db.some((x) => x.name === name)) {
    await i.reply({ content: `이미 ${name} 항목이 있어.`, flags: MessageFlags.Ephemeral });
    return;
  }
  db.push({ name, mac: normMac(mac) });
  await writeDB(db);
  await i.reply({ content: `✅ 추가됨: **${name}** (${mac})`, flags: MessageFlags.Ephemeral });
};