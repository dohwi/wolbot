#!/bin/bash
# ponytail: 백그라운드 실행 + 로그 파일. systemd/pm2 필요하면 그때 교체.
cd "$(dirname "$0")"
pkill -f "node dist/index.js" 2>/dev/null
sleep 1
node dist/index.js >> bot.log 2>&1 &
echo "started: pid $!"