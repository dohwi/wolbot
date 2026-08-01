import wol from 'wol';

export const sendMagicPacket = (mac: string): Promise<void> =>
  new Promise((resolve, reject) => {
    wol.wake(mac, (err: Error | null) => (err ? reject(err) : resolve()));
  });