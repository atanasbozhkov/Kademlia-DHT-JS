/**
 * Created by user on 29/06/2017.
 */
import { expect } from 'chai';
import KademliaNode from '../src/KademliaNode'
import { ID_LENGTH } from '../src/KademliaNode';

describe('GIVEN a KademliaNode class', () => {
  it('SHOULD be defined', () => {
    expect(KademliaNode).to.be.a('function');
  });

  describe('GIVEN a random KademliaNode', () => {
    let randomNode;
    beforeEach(() => {
      randomNode = new KademliaNode();
    });
    describe('WHEN new is called on KademliaNode', () => {
      it('SHOULD construct node when no arguments are provided', () => {
        expect(randomNode).to.be.instanceOf(KademliaNode);
      });
    });

    it('SHOULD have a valid nodeId', () => {
      expect(randomNode.nodeId.length).to.exist;
      expect(randomNode.nodeId).to.be.a('array');
    });

    it('SHOULD have a nodeId with a lenght of ID_LENGTH', () => {
      expect(randomNode.nodeId.length).equal(ID_LENGTH);
    });

  });

  describe('GIVEN a hex string', () => {
    const testHexString = '12345678912345678900123456789123456789AA';
    it('SHOULD create a KademliaNode by decoding', () => {
        let node = new KademliaNode(testHexString);
        expect(node).to.be.instanceOf(KademliaNode);
        expect(node.nodeId.length).equal(ID_LENGTH);
    });
  });

  describe('GIVEN a KademliaNode', () => {
    it('SHOULD equal itself', () => {
        const node = new KademliaNode();
        expect(node.equals(node)).to.be.true;
    });

    it('SHOULD not equal a different node', () => {
      let nodeA = new KademliaNode('AAA');
      let nodeB = new KademliaNode('BBB');
      expect(nodeA.equals(nodeB)).to.be.false;
    });

    describe('AND when less() is called', () => {
      let nodeA;
      let nodeB;

      beforeEach(() => {
        nodeA = new KademliaNode('AAA');
        nodeB = new KademliaNode('BBB');
      });

      it('SHOULD return true when other node has smaller id', () => {
        expect(nodeA.less(nodeB)).to.be.true;
      });

      it('SHOULD return false when other node has larger id', () => {
        expect(nodeB.less(nodeA)).to.be.false;
      });

    });

    describe('AND when xor() is called with another node', () => {
      let nodeA;
      let nodeB;
      beforeEach(() => {
        nodeA = new KademliaNode('0000000000000000000000000000000000000000');
        nodeB = new KademliaNode('FFFFFFFFFFFFFFFFFFFF');
      });

      it('SHOULD return a valid xor nodeId result', () => {
        let xorResult = nodeA.xor(nodeA);
        expect(xorResult).to.exist;
        expect(xorResult.length).equal(20);
        // TODO: Further xor tests
      });

    });

    describe('AND when prefixLen() is called', () => {
      it('SHOULD return the number of leading zeroes', () => {
          let node = new KademliaNode('123');
          expect(node.prefixLen()).equal(3);
      });

    });


  });


});
