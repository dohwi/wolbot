import {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  StringSelectMenuBuilder,
  ContainerBuilder,
  TextDisplayBuilder,
  SeparatorBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  type ChatInputCommandInteraction,
} from 'discord.js';
import { readDB } from '../db.js';
import { authorized } from '../auth.js';

export const handleAdd = async (i: ChatInputCommandInteraction): Promise<void> => {
  if (!(await authorized(i))) return;
  const modal = new ModalBuilder()
    .setCustomId('wol-add-modal')
    .setTitle('WOL 항목 추가')
    .addComponents(
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('name')
          .setLabel('장치 이름')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(80),
      ),
      new ActionRowBuilder<TextInputBuilder>().addComponents(
        new TextInputBuilder()
          .setCustomId('mac')
          .setLabel('MAC 주소 (예: AA:BB:CC:DD:EE:FF)')
          .setStyle(TextInputStyle.Short)
          .setRequired(true)
          .setMaxLength(17),
      ),
    );
  await i.showModal(modal);
};

export const handleRemove = async (i: ChatInputCommandInteraction): Promise<void> => {
  if (!(await authorized(i))) return;
  const db = await readDB();
  if (!db.length) {
    await i.reply({ content: 'WOL 항목이 없어.', flags: MessageFlags.Ephemeral });
    return;
  }
  const select = new StringSelectMenuBuilder()
    .setCustomId('wol-remove-select')
    .setPlaceholder('제거할 항목 선택')
    .addOptions(db.map((x) => ({ label: x.name, value: x.name, description: x.mac })));
  await i.reply({
    content: '제거할 항목을 선택해.',
    components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select)],
    flags: MessageFlags.Ephemeral,
  });
};

export const handleList = async (i: ChatInputCommandInteraction): Promise<void> => {
  if (!(await authorized(i))) return;
  const db = await readDB();
  if (!db.length) {
    await i.reply({ content: 'WOL 항목이 없어.', flags: MessageFlags.Ephemeral });
    return;
  }
  const container = new ContainerBuilder()
    .addTextDisplayComponents(new TextDisplayBuilder().setContent('## 📋 WOL 항목 목록'))
    .addSeparatorComponents(new SeparatorBuilder());
  // ponytail: Section은 accessory 필수라 텍스트만 표시는 TextDisplay 사용.
  for (const item of db) {
    container.addTextDisplayComponents(
      new TextDisplayBuilder().setContent(`### ${item.name}\n\`${item.mac}\``),
    );
    container.addSeparatorComponents(new SeparatorBuilder());
  }
  await i.reply({ components: [container], flags: MessageFlags.IsComponentsV2 });
};

export const handleMakeButton = async (i: ChatInputCommandInteraction): Promise<void> => {
  if (!(await authorized(i))) return;
  const db = await readDB();
  if (!db.length) {
    await i.reply({ content: 'WOL 항목이 없어. 먼저 /wol-add 로 추가해.', flags: MessageFlags.Ephemeral });
    return;
  }
  const container = new ContainerBuilder()
    .addTextDisplayComponents(
      new TextDisplayBuilder().setContent('## 🖥 WOL 버튼\n원하는 장치의 버튼을 누르면 매직패킷을 전송합니다.'),
    )
    .addSeparatorComponents(new SeparatorBuilder());
  // ponytail: 버튼 5개 초과시 추가 ActionRow. 10개 초과는 메시지 분할.
  const rows: ActionRowBuilder<ButtonBuilder>[] = [];
  let row = new ActionRowBuilder<ButtonBuilder>();
  for (const item of db) {
    if (row.components.length === 5) {
      rows.push(row);
      row = new ActionRowBuilder<ButtonBuilder>();
    }
    row.addComponents(
      new ButtonBuilder()
        .setCustomId(`wol:${item.name}`)
        .setLabel(item.name)
        .setStyle(ButtonStyle.Primary),
    );
  }
  rows.push(row);
  container.addActionRowComponents(rows);
  await i.reply({ components: [container], flags: MessageFlags.IsComponentsV2 });
};