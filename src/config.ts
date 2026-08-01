import 'dotenv/config';

const required = (key: string): string => {
  const v = process.env[key];
  if (!v) throw new Error(`환경변수 ${key} 가 없어.`);
  return v;
};

export const config = {
  token: required('DISCORD_TOKEN'),
  guildId: required('GUILD_ID'),
  // ponytail: 허용 유저는 .env에서 관리. 쉼표로 구분.
  allowedUsers: (process.env.ALLOWED_USERS ?? '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
} as const;