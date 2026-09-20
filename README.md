<div align="center">
  <h1>wolbot</h1>
  <p>Discord Component v2 기반 원격 PC 전원 제어(Wake-on-LAN) 봇</p>

  <p>
    <a href="https://nodejs.org"><img src="https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=node.js&logoColor=white" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white" /></a>
    <a href="https://discord.js.org"><img src="https://img.shields.io/badge/discord.js-v14-5865F2?style=flat-square&logo=discord&logoColor=white" /></a>
    <a href="https://www.docker.com"><img src="https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white" /></a>
  </p>
</div>

---

## Overview

Discord의 최신 컴포넌트 v2(Button, Modal Dialog)를 활용하여 로컬 네트워크의 기기를 원격으로 부팅하는 Wake-on-LAN 봇입니다.  
오작동을 방지하기 위한 2단계 확인 팝업 모달과 기기 등록/관리 인터페이스를 지원합니다.

---

## Interaction Flow

```
[ 전원 켜기 버튼 클릭 ]
        ↓
[ 확인 모달 팝업 ("PC를 켤까요?") ]
        ↓ (승인 시)
[ 로컬 브로드캐스트로 Magic Packet 전송 ]
```

---

## Slash Commands

| 명령어 | 인터페이스 | 설명 |
|---|---|---|
| `/wol-make-button` | Button | 전원 켜기 트리거 버튼이 포함된 메시지 발송 |
| `/wol-list` | Component v2 | 등록된 WOL 기기 목록 조회 |
| `/wol-add` | Modal Dialog | 신규 기기 등록 (기기 식별명 및 MAC 주소 입력) |
| `/wol-remove` | Select Menu | 등록된 기기 선택 삭제 |

---

## Configuration

`.env` 파일에 Discord 봇 토큰 및 접근 권한을 설정합니다.

```env
DISCORD_TOKEN=your_bot_token_here
GUILD_ID=your_guild_id_here
ALLOWED_USERS=user_id_1,user_id_2
```

| 키 | 설명 |
|---|---|
| `DISCORD_TOKEN` | Discord Developer Portal에서 발급받은 봇 토큰 |
| `GUILD_ID` | 슬래시 커맨드를 즉시 동기화할 Discord 서버 ID |
| `ALLOWED_USERS` | 기기 전원 제어 권한을 부여할 사용자 ID 목록 (콤마 구분) |

---

## Deployment

### Local

```bash
pnpm install
pnpm deploy   # 슬래시 커맨드 등록
pnpm start
```

### Docker

```bash
docker compose up -d --build
```