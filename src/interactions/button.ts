import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  MessageFlags,
  type ButtonInteraction,
} from 'discord.js';
import { readDB } from '../db.js';
import { sendMagicPacket } from '../wol.js';
import { authorized } from '../auth.js';

export const handleButton = async (i: ButtonInteraction): Promise<void> => {
  // WOL 버튼 → 2차 검증 팝업
  if (i.customId.startsWith('wol:')) {
    if (!(await authorized(i))) return;
    const name = i.customId.slice(4);
    const db = await readDB();
    const item = db.find((x) => x.name === name);
    if (!item) {
      await i.reply({ content: `${name} 항목을 찾을 수 없어.`, flags: MessageFlags.Ephemeral });
      return;
    }
    await i.reply({
      content: `**${name}** (${item.mac}) 의 PC를 켤까요?`,
      components: [
        new ActionRowBuilder<ButtonBuilder>().addComponents(
          new ButtonBuilder().setCustomId(`wol-confirm:${name}`).setLabel('확인').setStyle(ButtonStyle.Danger),
          new ButtonBuilder().setCustomId('wol-cancel').setLabel('취소').setStyle(ButtonStyle.Secondary),
        ),
      ],
      flags: MessageFlags.Ephemeral,
    });
    return;
  }

  // 2차 검증 확인 → 매직패킷 전송
  if (i.customId.startsWith('wol-confirm:')) {
    if (!(await authorized(i))) return;
    const name = i.customId.slice(12);
    const db = await readDB();
    const item = db.find((x) => x.name === name);
    if (!item) {
      await i.update({ content: `${name} 항목을 찾을 수 없어.`, components: [] });
      return;
    }
    await i.update({ content: `⏳ ${name} 매직패킷 전송 중...`, components: [] });
    try {
      await sendMagicPacket(item.mac);
      await i.editReply(`✅ ${name} (${item.mac}) 매직패킷 전송 완료`);
    } catch (err) {
      await i.editReply(`❌ ${name} WOL 실패: ${(err as Error).message}`);
    }
    return;
  }

  // 2차 검증 취소
  if (i.customId === 'wol-cancel') {
    await i.update({ content: '취소됐어.', components: [] });
  }
};