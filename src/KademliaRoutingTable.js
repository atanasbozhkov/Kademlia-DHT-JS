/**
 * Created by user on 30/06/2017.
 */
import { bytesToHex } from './mini-crypto';
import { ID_LENGTH } from './KademliaNode';

export const BUCKET_SIZE = 20;

export default class KademliaRoutingTable {
  buckets;
  node;

  constructor(node) {
    this.buckets = [];
    this.node = node;

    //Create the buckets
    for (let i = 0; i < ID_LENGTH * 8; i++) {
      this.buckets[i] = [];
    }
  }

  updateWithNode = (node) => {
    let found = false;
    let prefixLen = this.prefixLen(node.nodeId);

    let bucket = this.buckets[prefixLen];

    //First check whether the node is already contained within the bucket.
    this.buckets[prefixLen].map(x => {
      if (x.equals(node)) {
        let pos = table.buckets[prefixLen].indexOf(x);
        this.buckets[prefixLen].move(pos, 0);
        found = true;
      }
    });

    if (!found) {
      //If it's not in the bucket - check whether the bucket is full.
      if (this.buckets[prefixLen].length < BUCKET_SIZE) {
        this.buckets[prefixLen].push(node);
        // TODO: Handle insertion when the list is full by evicting old elements if
        // they don't respond to a ping.
      }
    }
    //this.buckets[prefixLen] = bucket;
  };


  copyToVector = (bucket, targetNode, vector) => {

    for (let i = 0; i < bucket.length; i++) {
      vector[i] = {
        node: bucket[i],
        distance: (bucket[i].xor(targetNode))
      };
    }
    return vector;
  };

  //Returns the number bucket number for a given nodeId
  prefixLen = (nodeId) => {
    for (let i = 0; i < ID_LENGTH; i++) {
      for (let j = 0; j < 8; j++) {
        if ((nodeId[i] >> 7 - j & 0x1) != 0) {
          return i * 8 + j;
        }
      }
    }
    return ID_LENGTH * 8 - 1;
  };

  // Returns a vector of the closest KademliaNodes and their distances from source node
  findClosestTo = (node, count) => {
    let vector = [];

    let bucket_num = this.prefixLen(node.xor(this.node));
    let bucket = this.buckets[bucket_num];

    this.copyToVector(bucket, node, vector);
    if (bucket.length === 0) {
      return [];
    }

    for (let i = 1;
         (bucket_num - i >= 0 || bucket_num + i < ID_LENGTH * 8) && vector.length < count; i++) {
      if (bucket_num - i >= 0) {
        bucket = this.buckets[bucket_num - i];
        this.copyToVector(bucket, node, vector);
      }

      if (bucket_num < ID_LENGTH * 8 - 1) {
        bucket = this.buckets[bucket_num + i];
        this.copyToVector(bucket, node, vector);
      }
    }

    vector.sort((a, b) => {
      return bytesToHex(a.distance) - bytesToHex(b.distance)
    });

    return vector;
  }
}
