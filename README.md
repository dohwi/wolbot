# wolbot

Discord WOL(Wake-on-LAN) 봇. 컴포넌트 v2로 버튼 UI 제공, 2차 검증으로 안전하게 PC 켜기.

## 명령어

| 명령어 | 설명 |
|---|---|
| `/wol-add` | WOL 항목 추가 (모달 팝업: 이름 + MAC) |
| `/wol-remove` | WOL 항목 제거 (드롭다운에서 선택) |
| `/wol-list` | WOL 항목 목록 (컴포넌트 v2) |
| `/wol-make-button` | WOL 버튼 메시지 생성 (컴포넌트 v2) |

버튼 클릭 → "PC를 켤까요?" 확인/취소 팝업 → 확인 시 매직패킷 전송.

## 설정

`.env`:
```
DISCORD_TOKEN=봇_토큰
GUILD_ID=길드_ID
ALLOWED_USERS=유저ID1,유저ID2
```

## 실행

```bash
docker compose up -d
```

`wol.json`에 WOL 항목 저장. 볼륨 마운트로 컨테이너 재시작에도 유지됨.

## 개발

```bash
npm install
npm run build    # tsc
npm start        # node dist/index.js
```