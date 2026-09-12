const { Worker, isMainThread, parentPort, workerData } = require("worker_threads");

if (isMainThread) {
  console.time("12-Threads-Time");

  const totalLimit = 40_000_000;
  const numThreads = 12; // استغلال 12 مسار بالكامل
  const chunkSize = Math.floor(totalLimit / numThreads);

  let completedWorkers = 0;
  let totalPrimes = 0;

  function createWorker(start, end) {
    const worker = new Worker(__filename, { workerData: { start, end } });

    worker.on("message", (count) => {
      totalPrimes += count;
      completedWorkers++;

      if (completedWorkers === numThreads) {
        console.timeEnd("12-Threads-Time");
        console.log(`تم العثور على: ${totalPrimes} عدد أولي`);
      }
    });
  }

  for (let i = 0; i < numThreads; i++) {
    const start = i === 0 ? 2 : i * chunkSize + 1;
    const end = (i === numThreads - 1) ? totalLimit : (i + 1) * chunkSize;
    createWorker(start, end);
  }

} else {
  const { start, end } = workerData;
  let count = 0;

  for (let i = start; i <= end; i++) {
    let isPrime = true;
    const max = Math.floor(Math.sqrt(i));

    for (let j = 2; j <= max; j++) {
      if (i % j === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      count++;
    }
  }

  parentPort.postMessage(count);
}