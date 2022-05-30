it('ainda sem testes', ( ) => { })

const getSomething = () => {
    setTimeout(() => {
        console.log('responding...');
        return 11;
    }, 1000);
};

const system = () => {
    console.log('start');
    const something = getSomething();
    console.log(`Something is ${something}`);
    console.log('finish');
}

system();