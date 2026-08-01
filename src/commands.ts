import { SlashCommandBuilder } from 'discord.js';

export const addCommand = new SlashCommandBuilder()
  .setName('wol-add')
  .setDescription('WOL 항목 추가 (모달 팝업)');

export const removeCommand = new SlashCommandBuilder()
  .setName('wol-remove')
  .setDescription('WOL 항목 제거 (목록에서 선택)');

export const listCommand = new SlashCommandBuilder()
  .setName('wol-list')
  .setDescription('WOL 항목 목록');

export const makeButtonCommand = new SlashCommandBuilder()
  .setName('wol-make-button')
  .setDescription('WOL 버튼 메시지 생성');

export const allCommands = [addCommand, removeCommand, listCommand, makeButtonCommand];