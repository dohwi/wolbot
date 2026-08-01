import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { allCommands } from './commands.js';

// ponytail: 수동 명령어 등록 스크립트. 봇 시작 시 index.ts에서도 자동 등록됨.
const rest = new REST().setToken(config.token);

const app = (await rest.get(Routes.currentApplication())) as { id: string };
await rest.put(Routes.applicationGuildCommands(app.id, config.guildId), {
  body: allCommands.map((c) => c.toJSON()),
});
console.log(`명령어 등록 완료 (${allCommands.length}개)`);