import me from 'math-expressions';
import cssesc from 'cssesc';

function cesc(s) {
  s = cssesc(s, { isIdentifier: true });
  if (s.slice(0, 2) === '\\#') {
    s = s.slice(1);
  }
  return s;
}

describe('Basic copy assignName Tests', function () {

  beforeEach(() => {
    cy.visit('/test')
  })

  it('name points and coords off a graph', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <point>(1,2)</point>
    <point>(3,4)</point>
  </graph>

  <collect name="cl1" componentTypes="point" tname="_graph1" assignNames="a,b" />

  <p>a: <copy tname="a" prop="coords" assignNames="ashadow" /></p>
  <p>b: <copy tname="b" prop="coords" assignNames="bshadow" /></p>

  <collect name="cl2" componentTypes="point" prop="x" tname="_graph1" assignNames="u,v" />

  <p>u: <copy tname="u" assignNames="ushadow" /></p>
  <p>v: <copy tname="v" assignNames="vshadow" /></p>

  <graph>
    <copy name="cp1" tname="cl1" assignNames="a1,b1" />
  </graph>

  <p>a1: <copy tname="a1" prop="coords" assignNames="a1shadow" /></p>
  <p>b1: <copy tname="b1" prop="coords" assignNames="b1shadow" /></p>

  <copy name="cp2" prop="x" tname="cl1" assignNames="u1,v1" />

  <p>u1: <copy tname="u1" assignNames="u1shadow" /></p>
  <p>v1: <copy tname="v1" assignNames="v1shadow" /></p>

  <copy name="cp3" prop="x" tname="cp1" assignNames="u2,v2" />

  <p>u2: <copy tname="u2" assignNames="u2shadow" /></p>
  <p>v2: <copy tname="v2" assignNames="v2shadow" /></p>

  <extract prop="x" assignNames="u3,v3"><copy tname="cl1"/></extract>

  <p>u3: <copy tname="u3" assignNames="u3shadow" /></p>
  <p>v3: <copy tname="v3" assignNames="v3shadow" /></p>

  <extract prop="x" assignNames="u4"><copy tname="a1"/></extract>
  <extract prop="x" assignNames="v4"><copy tname="b1"/></extract>

  <p>u4: <copy tname="u4" assignNames="u4shadow" /></p>
  <p>v4: <copy tname="v4" assignNames="v4shadow" /></p>

  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load

    cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/a1'].stateValues.xs.map(x => x.tree)).eqls([1, 2]);
      expect(components['/b1'].stateValues.xs.map(x => x.tree)).eqls([3, 4]);
    })

    cy.log('Move point a');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/a'].movePoint({ x: 5, y: -5 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })


    })

    cy.log('Move point b');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/b'].movePoint({ x: 9, y: 8 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })

    })


    cy.log('Move point a1');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/a1'].movePoint({ x: 7, y: 0 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })

    })


    cy.log('Move point b1');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/b1'].movePoint({ x: 4, y: 1 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })

    })

  })

  it('name points and coords off a graph, extra names', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <point>(1,2)</point>
    <point>(3,4)</point>
  </graph>

  <collect name="cl1" componentTypes="point" tname="_graph1" assignNames="a,b,c" />

  <p>a: <copy tname="a" prop="coords" assignNames="ashadow" /></p>
  <p>b: <copy tname="b" prop="coords" assignNames="bshadow" /></p>
  <p name="pc">c: <copy tname="c" prop="coords" assignNames="cshadow" /></p>

  <collect name="cl2" componentTypes="point" prop="x" tname="_graph1" assignNames="u,v,w" />

  <p>u: <copy tname="u" assignNames="ushadow" /></p>
  <p>v: <copy tname="v" assignNames="vshadow" /></p>
  <p name="pw">w: <copy tname="w" assignNames="wshadow" /></p>

  <graph>
    <copy name="cp1" tname="cl1" assignNames="a1,b1,c1" />
  </graph>

  <p>a1: <copy tname="a1" prop="coords" assignNames="a1shadow" /></p>
  <p>b1: <copy tname="b1" prop="coords" assignNames="b1shadow" /></p>
  <p name="pc1">c1: <copy tname="c1" prop="coords" assignNames="c1shadow" /></p>

  <copy name="cp2" prop="x" tname="cl1" assignNames="u1,v1,w1,x1" />

  <p>u1: <copy tname="u1" assignNames="u1shadow" /></p>
  <p>v1: <copy tname="v1" assignNames="v1shadow" /></p>
  <p name="pv1">v1: <copy tname="w1" assignNames="w1shadow" /></p>
  <p name="px1">x1: <copy tname="x1" assignNames="x1shadow" /></p>

  <copy name="cp3" prop="x" tname="cp1" assignNames="u2,v2" />

  <p>u2: <copy tname="u2" assignNames="u2shadow" /></p>
  <p>v2: <copy tname="v2" assignNames="v2shadow" /></p>

  <extract prop="x" assignNames="u3,v3,w3,x3"><copy tname="cl1"/></extract>

  <p>u3: <copy tname="u3" assignNames="u3shadow" /></p>
  <p>v3: <copy tname="v3" assignNames="v3shadow" /></p>
  <p name="pv3">v3: <copy tname="w3" assignNames="w3shadow" /></p>
  <p name="px3">x3: <copy tname="x3" assignNames="x3shadow" /></p>

  <extract prop="x" assignNames="u4,w4"><copy tname="a1"/></extract>
  <extract prop="x" assignNames="v4,x4"><copy tname="b1"/></extract>

  <p>u4: <copy tname="u4" assignNames="u4shadow" /></p>
  <p>v4: <copy tname="v4" assignNames="v4shadow" /></p>
  <p name="pv4">v4: <copy tname="w4" assignNames="w4shadow" /></p>
  <p name="px4">x4: <copy tname="x4" assignNames="x4shadow" /></p>

  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load

    cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,4)')
    })
    cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/pc').should('have.text', 'c: ')
    cy.get('#\\/pw').should('have.text', 'w: ')
    cy.get('#\\/pc1').should('have.text', 'c1: ')
    cy.get('#\\/pv1').should('have.text', 'v1: ')
    cy.get('#\\/px1').should('have.text', 'x1: ')
    cy.get('#\\/pv3').should('have.text', 'v3: ')
    cy.get('#\\/px3').should('have.text', 'x3: ')
    cy.get('#\\/pv4').should('have.text', 'v4: ')
    cy.get('#\\/px4').should('have.text', 'x4: ')

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/a1'].stateValues.xs.map(x => x.tree)).eqls([1, 2]);
      expect(components['/b1'].stateValues.xs.map(x => x.tree)).eqls([3, 4]);
    })

    cy.log('Move point a');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/a'].movePoint({ x: 5, y: -5 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,4)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/pc').should('have.text', 'c: ')
      cy.get('#\\/pw').should('have.text', 'w: ')
      cy.get('#\\/pc1').should('have.text', 'c1: ')
      cy.get('#\\/pv1').should('have.text', 'v1: ')
      cy.get('#\\/px1').should('have.text', 'x1: ')
      cy.get('#\\/pv3').should('have.text', 'v3: ')
      cy.get('#\\/px3').should('have.text', 'x3: ')
      cy.get('#\\/pv4').should('have.text', 'v4: ')
      cy.get('#\\/px4').should('have.text', 'x4: ')
  
    })

    cy.log('Move point b');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/b'].movePoint({ x: 9, y: 8 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/pc').should('have.text', 'c: ')
      cy.get('#\\/pw').should('have.text', 'w: ')
      cy.get('#\\/pc1').should('have.text', 'c1: ')
      cy.get('#\\/pv1').should('have.text', 'v1: ')
      cy.get('#\\/px1').should('have.text', 'x1: ')
      cy.get('#\\/pv3').should('have.text', 'v3: ')
      cy.get('#\\/px3').should('have.text', 'x3: ')
      cy.get('#\\/pv4').should('have.text', 'v4: ')
      cy.get('#\\/px4').should('have.text', 'x4: ')
  
    })


    cy.log('Move point a1');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/a1'].movePoint({ x: 7, y: 0 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,8)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9')
      })
      cy.get('#\\/pc').should('have.text', 'c: ')
      cy.get('#\\/pw').should('have.text', 'w: ')
      cy.get('#\\/pc1').should('have.text', 'c1: ')
      cy.get('#\\/pv1').should('have.text', 'v1: ')
      cy.get('#\\/px1').should('have.text', 'x1: ')
      cy.get('#\\/pv3').should('have.text', 'v3: ')
      cy.get('#\\/px3').should('have.text', 'x3: ')
      cy.get('#\\/pv4').should('have.text', 'v4: ')
      cy.get('#\\/px4').should('have.text', 'x4: ')
  
    })


    cy.log('Move point b1');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/b1'].movePoint({ x: 4, y: 1 });

      cy.get('#\\/a').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/a1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,0)')
      })
      cy.get('#\\/b1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,1)')
      })
      cy.get('#\\/u').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/ushadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/vshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v2shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v3shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/u4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/v4shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/pc').should('have.text', 'c: ')
      cy.get('#\\/pw').should('have.text', 'w: ')
      cy.get('#\\/pc1').should('have.text', 'c1: ')
      cy.get('#\\/pv1').should('have.text', 'v1: ')
      cy.get('#\\/px1').should('have.text', 'x1: ')
      cy.get('#\\/pv3').should('have.text', 'v3: ')
      cy.get('#\\/px3').should('have.text', 'x3: ')
      cy.get('#\\/pv4').should('have.text', 'v4: ')
      cy.get('#\\/px4').should('have.text', 'x4: ')
  
    })

  })

  it('sequentially name points and coords off lines', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
  <text>a</text>
  <graph>
    <line>(0,0),(1,1)</line>
    <line>(4,3),(2,1)</line>
  </graph>

  <graph>
    <collect name="cl1" componentTypes="line" prop="points" tname="_graph1" assignNames="a,b,c,d" />
  </graph>
  
  <p>a: <copy tname="a" prop="coords" assignNames="ashadow" /></p>
  <p>b: <copy tname="b" prop="coords" assignNames="bshadow" /></p>
  <p>c: <copy tname="c" prop="coords" assignNames="cshadow" /></p>
  <p>d: <copy tname="d" prop="coords" assignNames="dshadow" /></p>

  <copy prop="x" tname="cl1" assignNames="p,q,r,s" />

  <p>p: <copy tname="p" assignNames="pshadow" /></p>
  <p>q: <copy tname="q" assignNames="qshadow" /></p>
  <p>r: <copy tname="r" assignNames="rshadow" /></p>
  <p>s: <copy tname="s" assignNames="sshadow" /></p>

  <extract prop="x" assignNames="p1,q1,r1,s1" ><copy tname="cl1" /></extract>

  <p>p1: <copy tname="p1" assignNames="p1shadow" /></p>
  <p>q1: <copy tname="q1" assignNames="q1shadow" /></p>
  <p>r1: <copy tname="r1" assignNames="r1shadow" /></p>
  <p>s1: <copy tname="s1" assignNames="s1shadow" /></p>

  <copy prop="xs" tname="cl1" assignNames="x11,x12,x21,x22,x31,x32,x41,x42" />

  <p>x11: <copy tname="x11" assignNames="x11shadow" /></p>
  <p>x12: <copy tname="x12" assignNames="x12shadow" /></p>
  <p>x21: <copy tname="x21" assignNames="x21shadow" /></p>
  <p>x22: <copy tname="x22" assignNames="x22shadow" /></p>
  <p>x31: <copy tname="x31" assignNames="x31shadow" /></p>
  <p>x32: <copy tname="x32" assignNames="x32shadow" /></p>
  <p>x41: <copy tname="x41" assignNames="x41shadow" /></p>
  <p>x42: <copy tname="x42" assignNames="x42shadow" /></p>

  <extract prop="xs" assignNames="y11,y12,y21,y22,y31,y32,y41,y42" ><copy tname="cl1" /></extract>

  <p>y11: <copy tname="y11" assignNames="y11shadow" /></p>
  <p>y12: <copy tname="y12" assignNames="y12shadow" /></p>
  <p>y21: <copy tname="y21" assignNames="y21shadow" /></p>
  <p>y22: <copy tname="y22" assignNames="y22shadow" /></p>
  <p>y31: <copy tname="y31" assignNames="y31shadow" /></p>
  <p>y32: <copy tname="y32" assignNames="y32shadow" /></p>
  <p>y41: <copy tname="y41" assignNames="y41shadow" /></p>
  <p>y42: <copy tname="y42" assignNames="y42shadow" /></p>

  `}, "*");
    });

    cy.get('#\\/_text1').should('have.text', 'a'); // to wait for page to load

    cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(0,0)')
    })
    cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,1)')
    })
    cy.get('#\\/cshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,3)')
    })
    cy.get('#\\/dshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,1)')
    })
    cy.get('#\\/p').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/q').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/r').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/s').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/pshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/qshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/rshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/sshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/p1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/q1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/r1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/s1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/p1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/q1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/r1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/s1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/x11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/x12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/x21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/x22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/x31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/x32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/x41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/x42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/x11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/x12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/x21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/x22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/x31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/x32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/x41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/x42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/y12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/y21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/y32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/y41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/y42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/y12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('0')
    })
    cy.get('#\\/y21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })
    cy.get('#\\/y31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('4')
    })
    cy.get('#\\/y32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('3')
    })
    cy.get('#\\/y41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('2')
    })
    cy.get('#\\/y42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('1')
    })

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/a'].stateValues.xs.map(x => x.tree)).eqls([0, 0]);
      expect(components['/b'].stateValues.xs.map(x => x.tree)).eqls([1, 1]);
      expect(components['/c'].stateValues.xs.map(x => x.tree)).eqls([4, 3]);
      expect(components['/d'].stateValues.xs.map(x => x.tree)).eqls([2, 1]);
    })

    cy.log('Move point a');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/a'].movePoint({ x: 5, y: -5 });

      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,1)')
      })
      cy.get('#\\/cshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,3)')
      })
      cy.get('#\\/dshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,1)')
      })
      cy.get('#\\/p').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/r').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/pshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/qshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/rshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/sshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/r1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/r1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/x32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/x41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/x32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/x41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/y41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/y41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })

    })

    cy.log('Move point b');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/b'].movePoint({ x: 7, y: 8 });

      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,8)')
      })
      cy.get('#\\/cshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,3)')
      })
      cy.get('#\\/dshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,1)')
      })
      cy.get('#\\/p').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/pshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/qshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/rshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/sshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/s1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/x32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/x41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/x32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/x41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/y41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3')
      })
      cy.get('#\\/y41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })

    })

    cy.log('Move point c');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/c'].movePoint({ x: -3, y: -6 });

      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,8)')
      })
      cy.get('#\\/cshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−3,−6)')
      })
      cy.get('#\\/dshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,1)')
      })
      cy.get('#\\/p').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/pshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/qshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/rshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/sshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/p1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/x32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/x41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/x11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/x32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/x41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/x42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/y32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/y41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })
      cy.get('#\\/y11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/y32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/y41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('2')
      })
      cy.get('#\\/y42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1')
      })

    })

    cy.log('Move point d');
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      components['/d'].movePoint({ x: -9, y: 4 });

      cy.get('#\\/ashadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−5)')
      })
      cy.get('#\\/bshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,8)')
      })
      cy.get('#\\/cshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−3,−6)')
      })
      cy.get('#\\/dshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−9,4)')
      })
      cy.get('#\\/p').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/pshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/qshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/rshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/sshadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/p1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s1').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/p1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/q1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/r1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/s1shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/x11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/x32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/x41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/x42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/x11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/x12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/x21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/x22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/x31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/x32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/x41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/x42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y11').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/y32').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/y41').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/y42').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })
      cy.get('#\\/y11shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5')
      })
      cy.get('#\\/y12shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−5')
      })
      cy.get('#\\/y21shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7')
      })
      cy.get('#\\/y22shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('8')
      })
      cy.get('#\\/y31shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−3')
      })
      cy.get('#\\/y32shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−6')
      })
      cy.get('#\\/y41shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9')
      })
      cy.get('#\\/y42shadow').find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4')
      })

    })
  })


  // dynamic collections once have map working again
  // (haven't finished code to handle this situation)

  // collect points and lines, once decide how should recurse

});