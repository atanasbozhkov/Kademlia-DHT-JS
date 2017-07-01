/**
 * Created by user on 30/06/2017.
 */
//Function taken from crypto.js
export function hexToBytes(hex) {
  if (hex === undefined) {
    return false;
  }

  let bytes;
  let c;
  for (bytes = [], c = 0; c < hex.length; c += 2)
    bytes.push(parseInt(hex.substr(c, 2), 16));
  return bytes;
}

//Function taken from crypto.js
export function bytesToHex(bytes) {
  let hex, i;
  for (hex = [], i = 0; i < bytes.length; i++) {
    hex.push((bytes[i] >>> 4).toString(16));
    hex.push((bytes[i] & 0xF).toString(16));
  }
  return hex.join("");
}
