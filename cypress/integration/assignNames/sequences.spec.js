import me from 'math-expressions';
import cssesc from 'cssesc';

function cesc(s) {
  s = cssesc(s, { isIdentifier: true });
  if (s.slice(0, 2) === '\\#') {
    s = s.slice(1);
  }
  return s;
}

describe('sequence and map assignName Tests', function () {

  beforeEach(() => {
    cy.visit('/test')
  })

  it('assignNames to dynamic copied sequence', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <mathinput name="n" prefill="1" />
  <p name="s1"><aslist>
  <sequence assignNames="a,b" type="letters">
    <count><copy prop="value" tname="n" /></count>
  </sequence>
  </aslist></p>

  <p name="pa">a: <copy name="cpa" tname="a" /></p>
  <p name="pb">b: <copy name="cpb" tname="b" /></p>

  <p name="s2"><aslist>
  <copy name="cpall" tname="_sequence1" assignNames="a1,b1,c1" />
  </aslist></p>
  <p name="pa1">a1: <copy name="cpa1" tname="a1" /></p>
  <p name="pb1">b1: <copy name="cpb1" tname="b1" /></p>
  <p name="pc1">c1: <copy name="cpc1" tname="c1" /></p>

  <p name="s3"><aslist>
  <copy name="cpall2" tname="cpall" assignNames="a2,b2,c2,d2,e2" />
  </aslist></p>
  <p name="pa2">a2: <copy name="cpa2" tname="a2" /></p>
  <p name="pb2">b2: <copy name="cpb2" tname="b2" /></p>
  <p name="pc2">c2: <copy name="cpc2" tname="c2" /></p>
  <p name="pd2">d2: <copy name="cpd2" tname="d2" /></p>
  <p name="pe2">e2: <copy name="cpe2" tname="e2" /></p>

  <p name="s4"><aslist>
  <copy name="cpall3" tname="cpall2" assignNames="a3,b3,c3,d3" />
  </aslist></p>
  <p name="pa3">a3: <copy name="cpa3" tname="a3" /></p>
  <p name="pb3">b3: <copy name="cpb3" tname="b3" /></p>
  <p name="pc3">c3: <copy name="cpc3" tname="c3" /></p>
  <p name="pd3">d3: <copy name="cpd3" tname="d3" /></p>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load

    cy.get('#\\/s1').should('have.text', 'a');
    cy.get('#\\/s2').should('have.text', 'a');
    cy.get('#\\/s3').should('have.text', 'a');
    cy.get('#\\/s4').should('have.text', 'a');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('not.exist');
    cy.get('#\\/b1').should('not.exist');
    cy.get('#\\/b2').should('not.exist');
    cy.get('#\\/b3').should('not.exist');
    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n to 2')
    cy.get('#\\/n_input').clear().type('2{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b');
    cy.get('#\\/s2').should('have.text', 'a, b');
    cy.get('#\\/s3').should('have.text', 'a, b');
    cy.get('#\\/s4').should('have.text', 'a, b');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n back to 1')
    cy.get('#\\/n_input').clear().type('1{enter}')

    cy.get('#\\/s1').should('have.text', 'a');
    cy.get('#\\/s2').should('have.text', 'a');
    cy.get('#\\/s3').should('have.text', 'a');
    cy.get('#\\/s4').should('have.text', 'a');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('not.exist');
    cy.get('#\\/b1').should('not.exist');
    cy.get('#\\/b2').should('not.exist');
    cy.get('#\\/b3').should('not.exist');
    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n back to 2')
    cy.get('#\\/n_input').clear().type('2{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b');
    cy.get('#\\/s2').should('have.text', 'a, b');
    cy.get('#\\/s3').should('have.text', 'a, b');
    cy.get('#\\/s4').should('have.text', 'a, b');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n to 3')
    cy.get('#\\/n_input').clear().type('3{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b, c');
    cy.get('#\\/s2').should('have.text', 'a, b, c');
    cy.get('#\\/s3').should('have.text', 'a, b, c');
    cy.get('#\\/s4').should('have.text', 'a, b, c');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('have.text', 'c');
    cy.get('#\\/c2').should('have.text', 'c');
    cy.get('#\\/c3').should('have.text', 'c');
    cy.get('#\\/pc1').should('have.text', 'c1: c');
    cy.get('#\\/pc2').should('have.text', 'c2: c');
    cy.get('#\\/pc3').should('have.text', 'c3: c');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');



    cy.log('change n back to 1 again')
    cy.get('#\\/n_input').clear().type('1{enter}')

    cy.get('#\\/s1').should('have.text', 'a');
    cy.get('#\\/s2').should('have.text', 'a');
    cy.get('#\\/s3').should('have.text', 'a');
    cy.get('#\\/s4').should('have.text', 'a');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('not.exist');
    cy.get('#\\/b1').should('not.exist');
    cy.get('#\\/b2').should('not.exist');
    cy.get('#\\/b3').should('not.exist');
    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n to 5')
    cy.get('#\\/n_input').clear().type('5{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b, c, d, e');
    cy.get('#\\/s2').should('have.text', 'a, b, c, d, e');
    cy.get('#\\/s3').should('have.text', 'a, b, c, d, e');
    cy.get('#\\/s4').should('have.text', 'a, b, c, d, e');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('have.text', 'c');
    cy.get('#\\/c2').should('have.text', 'c');
    cy.get('#\\/c3').should('have.text', 'c');
    cy.get('#\\/pc1').should('have.text', 'c1: c');
    cy.get('#\\/pc2').should('have.text', 'c2: c');
    cy.get('#\\/pc3').should('have.text', 'c3: c');

    cy.get('#\\/d2').should('have.text', 'd');
    cy.get('#\\/d3').should('have.text', 'd');
    cy.get('#\\/pd2').should('have.text', 'd2: d');
    cy.get('#\\/pd3').should('have.text', 'd3: d');

    cy.get('#\\/e2').should('have.text', 'e');
    cy.get('#\\/pe2').should('have.text', 'e2: e');


    cy.log('change n to 4')
    cy.get('#\\/n_input').clear().type('4{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b, c, d');
    cy.get('#\\/s2').should('have.text', 'a, b, c, d');
    cy.get('#\\/s3').should('have.text', 'a, b, c, d');
    cy.get('#\\/s4').should('have.text', 'a, b, c, d');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('have.text', 'c');
    cy.get('#\\/c2').should('have.text', 'c');
    cy.get('#\\/c3').should('have.text', 'c');
    cy.get('#\\/pc1').should('have.text', 'c1: c');
    cy.get('#\\/pc2').should('have.text', 'c2: c');
    cy.get('#\\/pc3').should('have.text', 'c3: c');

    cy.get('#\\/d2').should('have.text', 'd');
    cy.get('#\\/d3').should('have.text', 'd');
    cy.get('#\\/pd2').should('have.text', 'd2: d');
    cy.get('#\\/pd3').should('have.text', 'd3: d');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n to 10')
    cy.get('#\\/n_input').clear().type('10{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b, c, d, e, f, g, h, i, j');
    cy.get('#\\/s2').should('have.text', 'a, b, c, d, e, f, g, h, i, j');
    cy.get('#\\/s3').should('have.text', 'a, b, c, d, e, f, g, h, i, j');
    cy.get('#\\/s4').should('have.text', 'a, b, c, d, e, f, g, h, i, j');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('have.text', 'c');
    cy.get('#\\/c2').should('have.text', 'c');
    cy.get('#\\/c3').should('have.text', 'c');
    cy.get('#\\/pc1').should('have.text', 'c1: c');
    cy.get('#\\/pc2').should('have.text', 'c2: c');
    cy.get('#\\/pc3').should('have.text', 'c3: c');

    cy.get('#\\/d2').should('have.text', 'd');
    cy.get('#\\/d3').should('have.text', 'd');
    cy.get('#\\/pd2').should('have.text', 'd2: d');
    cy.get('#\\/pd3').should('have.text', 'd3: d');

    cy.get('#\\/e2').should('have.text', 'e');
    cy.get('#\\/pe2').should('have.text', 'e2: e');


    cy.log('change n back to 2 again')
    cy.get('#\\/n_input').clear().type('2{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b');
    cy.get('#\\/s2').should('have.text', 'a, b');
    cy.get('#\\/s3').should('have.text', 'a, b');
    cy.get('#\\/s4').should('have.text', 'a, b');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n to 0')
    cy.get('#\\/n_input').clear().type('0{enter}')

    cy.get('#\\/s1').should('have.text', '');
    cy.get('#\\/s2').should('have.text', '');
    cy.get('#\\/s3').should('have.text', '');
    cy.get('#\\/s4').should('have.text', '');

    cy.get('#\\/a').should('not.exist');
    cy.get('#\\/a1').should('not.exist');
    cy.get('#\\/a2').should('not.exist');
    cy.get('#\\/a3').should('not.exist');
    cy.get('#\\/pa').should('have.text', 'a: ');
    cy.get('#\\/pa1').should('have.text', 'a1: ');
    cy.get('#\\/pa2').should('have.text', 'a2: ');
    cy.get('#\\/pa3').should('have.text', 'a3: ');

    cy.get('#\\/b').should('not.exist');
    cy.get('#\\/b1').should('not.exist');
    cy.get('#\\/b2').should('not.exist');
    cy.get('#\\/b3').should('not.exist');
    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/c1').should('not.exist');
    cy.get('#\\/c2').should('not.exist');
    cy.get('#\\/c3').should('not.exist');
    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/d2').should('not.exist');
    cy.get('#\\/d3').should('not.exist');
    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


    cy.log('change n back to 4')
    cy.get('#\\/n_input').clear().type('4{enter}')

    cy.get('#\\/s1').should('have.text', 'a, b, c, d');
    cy.get('#\\/s2').should('have.text', 'a, b, c, d');
    cy.get('#\\/s3').should('have.text', 'a, b, c, d');
    cy.get('#\\/s4').should('have.text', 'a, b, c, d');

    cy.get('#\\/a').should('have.text', 'a');
    cy.get('#\\/a1').should('have.text', 'a');
    cy.get('#\\/a2').should('have.text', 'a');
    cy.get('#\\/a3').should('have.text', 'a');
    cy.get('#\\/pa').should('have.text', 'a: a');
    cy.get('#\\/pa1').should('have.text', 'a1: a');
    cy.get('#\\/pa2').should('have.text', 'a2: a');
    cy.get('#\\/pa3').should('have.text', 'a3: a');

    cy.get('#\\/b').should('have.text', 'b');
    cy.get('#\\/b1').should('have.text', 'b');
    cy.get('#\\/b2').should('have.text', 'b');
    cy.get('#\\/b3').should('have.text', 'b');
    cy.get('#\\/pb').should('have.text', 'b: b');
    cy.get('#\\/pb1').should('have.text', 'b1: b');
    cy.get('#\\/pb2').should('have.text', 'b2: b');
    cy.get('#\\/pb3').should('have.text', 'b3: b');

    cy.get('#\\/c1').should('have.text', 'c');
    cy.get('#\\/c2').should('have.text', 'c');
    cy.get('#\\/c3').should('have.text', 'c');
    cy.get('#\\/pc1').should('have.text', 'c1: c');
    cy.get('#\\/pc2').should('have.text', 'c2: c');
    cy.get('#\\/pc3').should('have.text', 'c3: c');

    cy.get('#\\/d2').should('have.text', 'd');
    cy.get('#\\/d3').should('have.text', 'd');
    cy.get('#\\/pd2').should('have.text', 'd2: d');
    cy.get('#\\/pd3').should('have.text', 'd3: d');

    cy.get('#\\/e2').should('not.exist');
    cy.get('#\\/pe2').should('have.text', 'e2: ');


  })

  it('assignNames to dynamic copied map of sequence', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <mathinput name="n" prefill="1" />
  <p name="m1"><map assignNames="a,b">
    <template>Letter <indexFromSubs name="n" /> is <copyFromSubs name="v" />. </template>
    <substitutions>
      <sequence type="letters">
        <count><copy prop="value" tname="n" /></count>
      </sequence>
   </substitutions>
  </map></p>

  <p name="pa">a: <copy name="cpa" tname="a" /></p>
  <p name="pb">b: <copy name="cpb" tname="b" /></p>

  <p name="pan">a/n: <copy name="cpan" tname="a/n" /></p>
  <p name="pbn">b/n: <copy name="cpbn" tname="b/n" /></p>

  <p name="pav">a/v: <copy name="cpav" tname="a/v" /></p>
  <p name="pbv">b/v: <copy name="cpbv" tname="b/v" /></p>


  <p name="m2"><copy name="cpall" tname="_map1" assignNames="a1,b1,c1" /></p>
  <p name="pa1">a1: <copy name="cpa1" tname="a1" /></p>
  <p name="pb1">b1: <copy name="cpb1" tname="b1" /></p>
  <p name="pc1">c1: <copy name="cpc1" tname="c1" /></p>

  <p name="pan1">a1/n: <copy name="cpan1" tname="a1/n" /></p>
  <p name="pbn1">b1/n: <copy name="cpbn1" tname="b1/n" /></p>
  <p name="pcn1">c1/n: <copy name="cpcn1" tname="c1/n" /></p>

  <p name="pav1">a1/v: <copy name="cpav1" tname="a1/v" /></p>
  <p name="pbv1">b1/v: <copy name="cpbv1" tname="b1/v" /></p>
  <p name="pcv1">c1/v: <copy name="cpcv1" tname="c1/v" /></p>


  <p name="m3"><copy name="cpall2" tname="cpall" assignNames="a2,b2,c2,d2,e2" /></p>
  <p name="pa2">a2: <copy name="cpa2" tname="a2" /></p>
  <p name="pb2">b2: <copy name="cpb2" tname="b2" /></p>
  <p name="pc2">c2: <copy name="cpc2" tname="c2" /></p>
  <p name="pd2">d2: <copy name="cpd2" tname="d2" /></p>
  <p name="pe2">e2: <copy name="cpe2" tname="e2" /></p>
  
  <p name="pan2">a2/n: <copy name="cpan2" tname="a2/n" /></p>
  <p name="pbn2">b2/n: <copy name="cpbn2" tname="b2/n" /></p>
  <p name="pcn2">c2/n: <copy name="cpcn2" tname="c2/n" /></p>
  <p name="pdn2">d2/n: <copy name="cpdn2" tname="d2/n" /></p>
  <p name="pen2">e2/n: <copy name="cpen2" tname="e2/n" /></p>

  <p name="pav2">a2/v: <copy name="cpav2" tname="a2/v" /></p>
  <p name="pbv2">b2/v: <copy name="cpbv2" tname="b2/v" /></p>
  <p name="pcv2">c2/v: <copy name="cpcv2" tname="c2/v" /></p>
  <p name="pdv2">d2/v: <copy name="cpdv2" tname="d2/v" /></p>
  <p name="pev2">e2/v: <copy name="cpev2" tname="e2/v" /></p>


  <p name="m4"><copy name="cpall3" tname="cpall2" assignNames="a3,b3,c3,d3" /></p>
  <p name="pa3">a3: <copy name="cpa3" tname="a3" /></p>
  <p name="pb3">b3: <copy name="cpb3" tname="b3" /></p>
  <p name="pc3">c3: <copy name="cpc3" tname="c3" /></p>
  <p name="pd3">d3: <copy name="cpd3" tname="d3" /></p>

  <p name="pan3">a3/n: <copy name="cpan3" tname="a3/n" /></p>
  <p name="pbn3">b3/n: <copy name="cpbn3" tname="b3/n" /></p>
  <p name="pcn3">c3/n: <copy name="cpcn3" tname="c3/n" /></p>
  <p name="pdn3">d3/n: <copy name="cpdn3" tname="d3/n" /></p>

  <p name="pav3">a3/v: <copy name="cpav3" tname="a3/v" /></p>
  <p name="pbv3">b3/v: <copy name="cpbv3" tname="b3/v" /></p>
  <p name="pcv3">c3/v: <copy name="cpcv3" tname="c3/v" /></p>
  <p name="pdv3">d3/v: <copy name="cpdv3" tname="d3/v" /></p>
  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/pbn').should('have.text', 'b/n: ');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: ');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: ');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: ');

    cy.get('#\\/pbv').should('have.text', 'b/v: ');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: ');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: ');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: ');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n to 2')
    cy.get('#\\/n_input').clear().type('2{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n back to 1')
    cy.get('#\\/n_input').clear().type('1{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/pbn').should('have.text', 'b/n: ');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: ');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: ');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: ');

    cy.get('#\\/pbv').should('have.text', 'b/v: ');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: ');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: ');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: ');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');


    cy.log('change n back to 2')
    cy.get('#\\/n_input').clear().type('2{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n to 3')
    cy.get('#\\/n_input').clear().type('3{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: Letter 3 is c. ');
    cy.get('#\\/pc2').should('have.text', 'c2: Letter 3 is c. ');
    cy.get('#\\/pc3').should('have.text', 'c3: Letter 3 is c. ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: 3');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: 3');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: 3');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: c');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: c');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: c');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n back to 1 again')
    cy.get('#\\/n_input').clear().type('1{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/pbn').should('have.text', 'b/n: ');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: ');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: ');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: ');

    cy.get('#\\/pbv').should('have.text', 'b/v: ');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: ');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: ');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: ');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n to 5')
    cy.get('#\\/n_input').clear().type('5{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: Letter 3 is c. ');
    cy.get('#\\/pc2').should('have.text', 'c2: Letter 3 is c. ');
    cy.get('#\\/pc3').should('have.text', 'c3: Letter 3 is c. ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: 3');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: 3');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: 3');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: c');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: c');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: c');


    cy.get('#\\/pd2').should('have.text', 'd2: Letter 4 is d. ');
    cy.get('#\\/pd3').should('have.text', 'd3: Letter 4 is d. ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: 4');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: 4');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: d');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: d');


    cy.get('#\\/pe2').should('have.text', 'e2: Letter 5 is e. ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: 5');

    cy.get('#\\/pev2').should('have.text', 'e2/v: e');



    cy.log('change n to 4')
    cy.get('#\\/n_input').clear().type('4{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: Letter 3 is c. ');
    cy.get('#\\/pc2').should('have.text', 'c2: Letter 3 is c. ');
    cy.get('#\\/pc3').should('have.text', 'c3: Letter 3 is c. ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: 3');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: 3');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: 3');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: c');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: c');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: c');


    cy.get('#\\/pd2').should('have.text', 'd2: Letter 4 is d. ');
    cy.get('#\\/pd3').should('have.text', 'd3: Letter 4 is d. ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: 4');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: 4');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: d');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: d');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n to 10')
    cy.get('#\\/n_input').clear().type('10{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. Letter 6 is f. Letter 7 is g. Letter 8 is h. Letter 9 is i. Letter 10 is j. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. Letter 6 is f. Letter 7 is g. Letter 8 is h. Letter 9 is i. Letter 10 is j. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. Letter 6 is f. Letter 7 is g. Letter 8 is h. Letter 9 is i. Letter 10 is j. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. Letter 5 is e. Letter 6 is f. Letter 7 is g. Letter 8 is h. Letter 9 is i. Letter 10 is j. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: Letter 3 is c. ');
    cy.get('#\\/pc2').should('have.text', 'c2: Letter 3 is c. ');
    cy.get('#\\/pc3').should('have.text', 'c3: Letter 3 is c. ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: 3');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: 3');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: 3');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: c');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: c');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: c');


    cy.get('#\\/pd2').should('have.text', 'd2: Letter 4 is d. ');
    cy.get('#\\/pd3').should('have.text', 'd3: Letter 4 is d. ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: 4');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: 4');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: d');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: d');


    cy.get('#\\/pe2').should('have.text', 'e2: Letter 5 is e. ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: 5');

    cy.get('#\\/pev2').should('have.text', 'e2/v: e');



    cy.log('change n back to 2 again')
    cy.get('#\\/n_input').clear().type('2{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n to 0')
    cy.get('#\\/n_input').clear().type('0{enter}')

    cy.get('#\\/m1').should('have.text', '');
    cy.get('#\\/m2').should('have.text', '');
    cy.get('#\\/m3').should('have.text', '');
    cy.get('#\\/m4').should('have.text', '');


    cy.get('#\\/pa').should('have.text', 'a: ');
    cy.get('#\\/pa1').should('have.text', 'a1: ');
    cy.get('#\\/pa2').should('have.text', 'a2: ');
    cy.get('#\\/pa3').should('have.text', 'a3: ');

    cy.get('#\\/pan').should('have.text', 'a/n: ');
    cy.get('#\\/pan1').should('have.text', 'a1/n: ');
    cy.get('#\\/pan2').should('have.text', 'a2/n: ');
    cy.get('#\\/pan3').should('have.text', 'a3/n: ');

    cy.get('#\\/pav').should('have.text', 'a/v: ');
    cy.get('#\\/pav1').should('have.text', 'a1/v: ');
    cy.get('#\\/pav2').should('have.text', 'a2/v: ');
    cy.get('#\\/pav3').should('have.text', 'a3/v: ');


    cy.get('#\\/pb').should('have.text', 'b: ');
    cy.get('#\\/pb1').should('have.text', 'b1: ');
    cy.get('#\\/pb2').should('have.text', 'b2: ');
    cy.get('#\\/pb3').should('have.text', 'b3: ');

    cy.get('#\\/pbn').should('have.text', 'b/n: ');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: ');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: ');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: ');

    cy.get('#\\/pbv').should('have.text', 'b/v: ');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: ');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: ');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: ');


    cy.get('#\\/pc1').should('have.text', 'c1: ');
    cy.get('#\\/pc2').should('have.text', 'c2: ');
    cy.get('#\\/pc3').should('have.text', 'c3: ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: ');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: ');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: ');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: ');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: ');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: ');


    cy.get('#\\/pd2').should('have.text', 'd2: ');
    cy.get('#\\/pd3').should('have.text', 'd3: ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: ');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: ');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: ');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: ');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');



    cy.log('change n back to 4')
    cy.get('#\\/n_input').clear().type('4{enter}')


    cy.get('#\\/m1').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m2').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m3').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');
    cy.get('#\\/m4').should('have.text', 'Letter 1 is a. Letter 2 is b. Letter 3 is c. Letter 4 is d. ');


    cy.get('#\\/pa').should('have.text', 'a: Letter 1 is a. ');
    cy.get('#\\/pa1').should('have.text', 'a1: Letter 1 is a. ');
    cy.get('#\\/pa2').should('have.text', 'a2: Letter 1 is a. ');
    cy.get('#\\/pa3').should('have.text', 'a3: Letter 1 is a. ');

    cy.get('#\\/pan').should('have.text', 'a/n: 1');
    cy.get('#\\/pan1').should('have.text', 'a1/n: 1');
    cy.get('#\\/pan2').should('have.text', 'a2/n: 1');
    cy.get('#\\/pan3').should('have.text', 'a3/n: 1');

    cy.get('#\\/pav').should('have.text', 'a/v: a');
    cy.get('#\\/pav1').should('have.text', 'a1/v: a');
    cy.get('#\\/pav2').should('have.text', 'a2/v: a');
    cy.get('#\\/pav3').should('have.text', 'a3/v: a');


    cy.get('#\\/pb').should('have.text', 'b: Letter 2 is b. ');
    cy.get('#\\/pb1').should('have.text', 'b1: Letter 2 is b. ');
    cy.get('#\\/pb2').should('have.text', 'b2: Letter 2 is b. ');
    cy.get('#\\/pb3').should('have.text', 'b3: Letter 2 is b. ');

    cy.get('#\\/pbn').should('have.text', 'b/n: 2');
    cy.get('#\\/pbn1').should('have.text', 'b1/n: 2');
    cy.get('#\\/pbn2').should('have.text', 'b2/n: 2');
    cy.get('#\\/pbn3').should('have.text', 'b3/n: 2');

    cy.get('#\\/pbv').should('have.text', 'b/v: b');
    cy.get('#\\/pbv1').should('have.text', 'b1/v: b');
    cy.get('#\\/pbv2').should('have.text', 'b2/v: b');
    cy.get('#\\/pbv3').should('have.text', 'b3/v: b');


    cy.get('#\\/pc1').should('have.text', 'c1: Letter 3 is c. ');
    cy.get('#\\/pc2').should('have.text', 'c2: Letter 3 is c. ');
    cy.get('#\\/pc3').should('have.text', 'c3: Letter 3 is c. ');

    cy.get('#\\/pcn1').should('have.text', 'c1/n: 3');
    cy.get('#\\/pcn2').should('have.text', 'c2/n: 3');
    cy.get('#\\/pcn3').should('have.text', 'c3/n: 3');

    cy.get('#\\/pcv1').should('have.text', 'c1/v: c');
    cy.get('#\\/pcv2').should('have.text', 'c2/v: c');
    cy.get('#\\/pcv3').should('have.text', 'c3/v: c');


    cy.get('#\\/pd2').should('have.text', 'd2: Letter 4 is d. ');
    cy.get('#\\/pd3').should('have.text', 'd3: Letter 4 is d. ');

    cy.get('#\\/pdn2').should('have.text', 'd2/n: 4');
    cy.get('#\\/pdn3').should('have.text', 'd3/n: 4');

    cy.get('#\\/pdv2').should('have.text', 'd2/v: d');
    cy.get('#\\/pdv3').should('have.text', 'd3/v: d');


    cy.get('#\\/pe2').should('have.text', 'e2: ');

    cy.get('#\\/pen2').should('have.text', 'e2/n: ');

    cy.get('#\\/pev2').should('have.text', 'e2/v: ');


  })


});