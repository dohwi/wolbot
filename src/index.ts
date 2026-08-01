import { Client, GatewayIntentBits, Events, REST, Routes } from 'discord.js';
import { config } from './config.js';
import { allCommands } from './commands.js';
import { handleAdd, handleRemove, handleList, handleMakeButton } from './interactions/chatInput.js';
import { handleModalSubmit } from './interactions/modal.js';
import { handleSelectMenu } from './interactions/selectMenu.js';
import { handleButton } from './interactions/button.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, async (c) => {
  // 명령어 길드 등록 (즉시 반영)
  await new REST()
    .setToken(config.token)
    .put(Routes.applicationGuildCommands(c.user.id, config.guildId), {
      body: allCommands.map((cmd) => cmd.toJSON()),
    });
  console.log(`ready: ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (i) => {
  try {
    if (i.isChatInputCommand()) {
      switch (i.commandName) {
        case 'wol-add': return await handleAdd(i);
        case 'wol-remove': return await handleRemove(i);
        case 'wol-list': return await handleList(i);
        case 'wol-make-button': return await handleMakeButton(i);
      }
    }
    if (i.isModalSubmit()) return await handleModalSubmit(i);
    if (i.isStringSelectMenu()) return await handleSelectMenu(i);
    if (i.isButton()) return await handleButton(i);
  } catch (err) {
    // 10062 Unknown interaction: 봇 재시작 후 만료된 토큰. 무시.
    if (err instanceof Error && 'code' in err && (err as { code: number }).code === 10062) return;
    console.error(err);
    if (i.isRepliable() && !i.deferred && !i.replied)
      await i.reply({ content: `오류 발생: ${(err as Error).message}` }).catch(() => {});
  }
});

client.login(config.token);