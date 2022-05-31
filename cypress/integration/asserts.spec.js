/// <reference types="cypress" />

it('Equality', () => {
    const a = 1;

    expect(a).equal(1);
    expect(a, 'Deveria ser 1').equal(1);
    expect(a).to.be.equal(1); // somente deixa mais legível
    expect('aString').not.equal('otherString');
    expect('aString').not.to.be.equal('otherString');
})

it('Truthy', () => {
    const a = true;
    const b = null;
    let c;

    expect(a).to.be.true;
    expect(a).not.to.be.null;
    expect(b).to.be.null;
    expect(c).to.be.undefined;

})

it('Object equality', () => {
    const aObj = {
        a: 'a string',
        b: 5
    }

    const bObj = aObj; // atribui por referência

    // bObj.a = 'other value';

    const cObj = {
        a: 'a string',
        b: 5
    }

    const dObj = {}

    expect(aObj).equal(bObj);
    expect(aObj).equals(bObj);  // mesma coisa
    expect(aObj).eq(bObj);      // mesma coisa

    //expect(aObj).equal(cObj);   // são objetos diferentes, mesmo tendo o mesmo conteúdo
    expect(aObj).not.equal(cObj);

    expect(aObj).deep.equal(cObj);  // checa se o conteúdo é o mesmo
    expect(aObj).eql(cObj);         // faz o mesmo

    expect(aObj).include({ b: 5 });
    expect(aObj).include({ a: 'a string' });
    expect(aObj).to.have.property('a');
    expect(aObj).to.have.property('b', 5);
    expect(cObj).not.to.be.empty;
    expect(dObj).to.be.empty;
})

it('Arrays', () => {
    const arr = [1, 2, 3]

    expect(arr).to.have.members([1, 2, 3])
    expect(arr).to.include.members([1, 3])
    expect(arr).not.to.be.empty
    expect([]).to.be.empty
})

it('Types', () => {
    const num = 1
    const str = 'a string'

    expect(num).to.be.a('number')
    expect(str).to.be.a('string')
    expect({}).to.be.an('object')
    expect([]).to.be.an('array')
})

it('Strings', () => {
    const str = 'A 4 t3st string'

    expect(str).to.be.equal('A 4 t3st string')
    expect(str).to.have.length(15)
    expect(str).to.contains('t3')
    expect(str).to.match(/st s/)
    expect(str).to.match(/^A/)
    expect(str).to.match(/ng$/)
    expect(str).to.match(/.{13}/)
    expect(str).to.match(/\w+/) // conter uma ou mais palavras
    expect(str).to.match(/\D+/) // nao conter números (não é bem isso)
})

it('Numbers', () => {
    const number = 4
    const floatNumber = 5.723

    expect(number).to.be.equal(4)
    expect(number).to.be.above(3)
    expect(number).to.be.below(6)
    expect(floatNumber).to.be.equal(5.723)
    expect(floatNumber).to.be.closeTo(5.7, 0.1)
    expect(floatNumber).to.be.above(5)
    expect(floatNumber).to.be.below(6)
})