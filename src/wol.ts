import wol from 'wol';

// 1초, 3초, 5초 간격으로 총 3번 매직패킷 전송
const DELAYS = [1000, 3000, 5000];

export const sendMagicPacket = (
  mac: string,
  onProgress?: (current: number, total: number) => void,
): Promise<void> =>
  new Promise((resolve, reject) => {
    let completed = 0;
    let hasError = false;

    DELAYS.forEach((delay) => {
      setTimeout(() => {
        if (hasError) return;
        wol.wake(mac, (err: Error | null) => {
          if (err && !hasError) {
            hasError = true;
            reject(err);
            return;
          }
          completed += 1;
          onProgress?.(completed, DELAYS.length);
          if (completed === DELAYS.length) {
            resolve();
          }
        });
      }, delay);
    });
  });