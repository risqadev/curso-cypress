it('ainda sem testes', ( ) => { })

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('responding...');
            resolve(13);
        }, 1000);
    });
};

const system = async () => {
    console.log('start');
    const some = await getSomething();
    console.log(`Something is ${some}`);
    console.log('finish');
}

system();