it('ainda sem testes', ( ) => { })

const getSomething = (callback) => {
    setTimeout(() => {
        console.log('responding...');
        callback(12);
    }, 1000);
};

const system = () => {
    console.log('start');
    getSomething(some => console.log(`Something is ${some}`));
    console.log('finish');
}

system();