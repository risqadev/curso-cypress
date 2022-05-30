it('ainda sem testes', ( ) => { })

const getSomething = () => 10;

const system = () => {
    console.log('start');
    const something = getSomething();
    console.log(`Something is ${something}`);
    console.log('finish');
}

system();