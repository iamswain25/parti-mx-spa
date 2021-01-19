const { firestore } = require("./firebase");
const batchArray = [];
batchArray.pointer = 0;
batchArray.counter = 0;
batchArray.total = 0;
const handler = {
  apply: function (target, thisArg, argumentsList) {
    batchArray.counter++;
    batchArray.total++;
    batchArray[batchArray.pointer].set(...argumentsList);
    if (batchArray.counter >= 500) {
      generateNewBatch();
      batchArray.pointer++;
    }
  },
};
function generateNewBatch() {
  batchArray.counter = 0;
  const batch = firestore.batch();
  batchArray.push(batch);
}
const proxyBatchSet = new Proxy(() => {}, handler);
// const sleep = ms =>
//   new Promise(res => {
//     setTimeout(res, ms);
//   });

async function commit() {
  // for (const batch of batchArray) {
  //   await batch.commit().then(console.log).catch(console.error);
  //   // await sleep(1000);
  // }
  await Promise.all(batchArray.map(b => b.commit())).catch(console.error);
  console.log(batchArray.length, batchArray.total);
}
generateNewBatch();
module.exports = { batchArray, proxyBatchSet, commit };
