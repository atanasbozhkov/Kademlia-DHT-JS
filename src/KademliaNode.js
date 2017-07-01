/**
 * Created by user on 29/06/2017.
 */
import {hexToBytes} from './mini-crypto';

export const ID_LENGTH = 20;

export default class KademliaNode {
  nodeId;

  constructor(fromString) {
    if (fromString === undefined) {
      let nodeId = [];
      for (let i = 0; i < ID_LENGTH; i++) {
        nodeId[i] = Math.floor((Math.random() * 256)); //1 to 256
      }
      this.nodeId = nodeId;
    } else {
      //TODO: Add check for invalid bytes > 256
      const decoded = hexToBytes(fromString);
      let decodedBytes = [];
      for (let i = 0; i < ID_LENGTH; i++) {
        decodedBytes[i] = decoded[i];
      }
      this.nodeId = decodedBytes;
    }
  }

  equals = (otherNode) => {
      for (let i = 0; i < ID_LENGTH; i++) {
        if (this.nodeId[i] !== otherNode.nodeId[i]) {
          return false;
        }
      }
      return true;
  };

  less = (otherNode) => {
    for (let i = 0; i < ID_LENGTH; i++) {
      if (this.nodeId[i] !== otherNode.nodeId[i]) {
        return this.nodeId[i] < otherNode.nodeId[i];
      }
    }
    return false;
  };

  xor = (otherNode) => {
    let xorResult = [];
    for (let i = 0; i < ID_LENGTH; i++) {
      xorResult[i] = this.nodeId[i] ^ otherNode.nodeId[i];
    }
    return xorResult;
  };

  //Returns the number of leading zeros
  prefixLen = () => {
    for (let i = 0; i < ID_LENGTH; i++) {
      for (let j = 0; j < 8; j++) {
        if ((this.nodeId[i] >> 7 - j & 0x1) != 0) {
          return i * 8 + j;
        }
      }
    }
    return ID_LENGTH * 8 - 1;
  };

}
