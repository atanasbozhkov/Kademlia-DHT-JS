/**
 * Created by user on 30/06/2017.
 */
import {expect} from 'chai';
import KademliaRouterTable from '../src/KademliaRoutingTable';
import KademliaNode from "../src/KademliaNode";

describe('GIVEN a KademliaRoutingTable class', () => {
  it('SHOULD be defined', () => {
    expect(KademliaRouterTable).to.exist;
  });

  it('SHOULD construct a new is called on the RoutingTable', () => {
    let node = new KademliaNode();
    let table = new KademliaRouterTable(node);
    expect(table).not.equal(undefined);
    expect(table).to.be.instanceOf(KademliaRouterTable);
  });

  describe('GIVEN a KademliaRouting table instance', () => {
    let table;
    let node;
    beforeEach(() => {
      let node = new KademliaNode('AAA');
      table = new KademliaRouterTable(node);
    });
    describe('WHEN updateWithNode() is called on the table with a new node', () => {
      it('SHOULD updateWithNode the table buckets with the node', () => {
        let emptyBucketsPrior = table.buckets.filter(bucket => {
          return bucket.length !== 0
        });
        table.updateWithNode(new KademliaNode('BBB'));
        let emptyBucketsPost = table.buckets.filter(bucket => {
          return bucket.length !== 0
        });
        expect(emptyBucketsPrior).to.be.below(emptyBucketsPost);
      });

    });

    describe('WHEN the findClosestTo() is called on the table', () => {
      it('SHOULD return empty if no closest node', () => {
        let nodeB = new KademliaNode('AAA');
        let closest = table.findClosestTo(nodeB, 1);
        expect(closest.length).equal(0);
      });

      it('SHOULD return the closest node in the bucket', () => {
        // TODO: This requires figuring a way of setting two nodes in the same bucket.
      });


    });


  });


});
