it('ainda sem testes', ( ) => { })

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('responding...');
            resolve(13);
        }, 1000);
    });
};

const system = () => {
    console.log('start');
    const aPromise = getSomething();
    aPromise.then(some => console.log(`Something is ${some}`));
    console.log('finish');
}

system();