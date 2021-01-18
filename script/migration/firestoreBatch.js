const { firestore } = require("./firebase");
const batchArray = [];
let proxyBatchSet;
batchArray.counter = 0;
batchArray.total = 0;
const handler = {
  apply: function (target, thisArg, argumentsList) {
    batchArray.counter++;
    batchArray.total++;
    target.apply(thisArg, argumentsList);
    if (batchArray.counter >= 500) {
      generateNewBatch();
    }
  },
};
function generateNewBatch() {
  batchArray.counter = 0;
  const batch = firestore.batch();
  batchArray.push(batch);
  const batchSet = batch.set.bind(batch);
  proxyBatchSet = new Proxy(batchSet, handler);
}
generateNewBatch();
module.exports = { batchArray, proxyBatchSet };
