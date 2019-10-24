function test(i, j) {
    console.log(`i: ${i} and j: ${j}`);
}

test.apply(this, [3, 2]);

const proxy = new Proxy();