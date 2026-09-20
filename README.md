# wolbot

> Discord 컴포넌트 v2(Buttons, Modals) 기반의 원격 PC 전원 관리(Wake-on-LAN) 봇입니다.  
> 2차 확인 모달 팝업을 통해 오작동 없이 안전하게 전원을 켭니다.

---

## 🖥 Flow & UI

```text
[WOL 버튼 클릭] ➡️ ["PC를 켤까요?" 2차 확인 팝업] ➡️ [승인 시 Magic Packet 전송]
```

---

## 🎮 Slash Commands

| 명령어 | UI 형태 | 설명 |
|---|---|---|
| `/wol-make-button` | Button | 전원 켜기 버튼이 포함된 메시지 생성 |
| `/wol-list` | Component v2 | 등록된 WOL 기기 목록 조회 |
| `/wol-add` | Modal Pop-up | 새 WOL 기기 등록 (기기명 + MAC 주소 입력) |
| `/wol-remove` | Select Menu | 등록된 기기 선택 삭제 |

---

## ⚙️ Environment Variables

```env
DISCORD_TOKEN=your_bot_token
GUILD_ID=your_guild_id
ALLOWED_USERS=user_id_1,user_id_2
```

---

## ⚡ Run

### Local
```bash
pnpm install
pnpm start
```

### Docker
```bash
docker compose up -d --build
```
