import test from 'node:test';
import assert from 'node:assert/strict';
import {validateCart,shippingAmount} from '../src/lib/cart-validation.mjs';
const catalog={pants:{price:12800,sizes:['S','M']}};
test('prices are authoritative and duplicate variants merge',()=>{assert.deepEqual(validateCart([{id:'pants',size:'S',quantity:1,unitAmount:1},{id:'pants',size:'S',quantity:2}],catalog),[{id:'pants',size:'S',quantity:3,unitAmount:12800}]);});
test('reject invalid products, sizes, quantities and excessive duplicates',()=>{for(const item of [{id:'unknown',size:'S',quantity:1},{id:'pants',size:'XXL',quantity:1},{id:'pants',size:'S',quantity:-1},{id:'pants',size:'S',quantity:1.5}])assert.throws(()=>validateCart([item],catalog));assert.throws(()=>validateCart([],catalog));assert.throws(()=>validateCart([{id:'pants',size:'S',quantity:6},{id:'pants',size:'S',quantity:5}],catalog));});
test('shipping threshold is inclusive',()=>{assert.equal(shippingAmount(14999),800);assert.equal(shippingAmount(15000),0);});
