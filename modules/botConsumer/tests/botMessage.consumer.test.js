/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const chai = require('chai');
const should = chai.should();
const { expect } = chai;

const {
    messageConsumer,
} = require('../botMessageHandler/botMessage.consumer');

const {
    RESPONSE_CODES
} = require('../../../utils/constant');

const app = require('../../../app');

const TEST_AUTHOR_ID = '12345678';

describe('#messageConsumer', () => {

    it('it should return hey', () => {
        return messageConsumer({ messageText: 'hi', author: { id : TEST_AUTHOR_ID }  }).then(result => {
            expect(result.message).to.equal('hey');
        });
    }).timeout(5000);

    it('it should return google search results', () => {
        return messageConsumer({ messageText: '!google node', author: { id : TEST_AUTHOR_ID }  }).then(result => {
            expect(result.status).to.equal(RESPONSE_CODES.SUCCESS );
        });
    }).timeout(5000);

    it('it should return recent search results', () => {
        return messageConsumer({ messageText: '!recent node', author: { id : TEST_AUTHOR_ID }  }).then(result => {
            expect(result.status).to.equal(RESPONSE_CODES.SUCCESS );
        });
    }).timeout(5000);

    it('it should return 404 for unknown query', () => {
        return messageConsumer({ messageText: '!abc', author: { id : TEST_AUTHOR_ID }  }).then(result => {
            expect(result.status).to.equal(RESPONSE_CODES.NOT_FOUND);
        });
    }).timeout(5000);
});