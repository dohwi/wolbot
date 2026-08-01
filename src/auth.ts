import { MessageFlags, type RepliableInteraction } from 'discord.js';
import { config } from './config.js';

export const authorized = async (i: RepliableInteraction): Promise<boolean> => {
  if (config.allowedUsers.includes(i.user.id)) return true;
  await i.reply({ content: '권한이 없어.', flags: MessageFlags.Ephemeral });
  return false;
};