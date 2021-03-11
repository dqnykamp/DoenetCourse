import cssesc from 'cssesc';

function cesc(s) {
  s = cssesc(s, { isIdentifier: true });
  if (s.slice(0, 2) === '\\#') {
    s = s.slice(1);
  }
  return s;
}

describe('Map Tag Tests', function () {

  beforeEach(() => {
    cy.visit('/test')
  })

  it('single map of maths', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <aslist>
    <map>
      <template><math>sin(2<copy tname="_source"/>) + <copy tname="_sourceindex"/></math></template>
      <sources>
        <math>x</math>
        <math>y</math>
      </sources>
    </map>
    </aslist>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let mathr1 = replacements[0].replacements[0];
      let mathr1Anchor = '#' + mathr1.componentName;
      let mathr2 = replacements[1].replacements[0];
      let mathr2Anchor = '#' + mathr2.componentName;

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(mathr1Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2x)+1');
      });
      cy.get(`${cesc(mathr2Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2y)+2');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(mathr1.stateValues.value.tree).eqls(['+', ['apply', 'sin', ['*', 2, 'x']], 1]);
        expect(mathr2.stateValues.value.tree).eqls(['+', ['apply', 'sin', ['*', 2, 'y']], 2]);
      })
    })
  });

  it('single map of texts', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map >
      <template><text>You are a <copy tname="_source"/>!</text> </template>
      <sources><text>squirrel</text><text>bat</text></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let textr1 = replacements[0].replacements[0];
      let textr1Anchor = '#' + textr1.componentName;
      let textr2 = replacements[1].replacements[0];
      let textr2Anchor = '#' + textr2.componentName;

      cy.log('Test values displayed in browser')
      cy.get(cesc(textr1Anchor)).should('have.text', "You are a squirrel!");
      cy.get(cesc(textr2Anchor)).should('have.text', "You are a bat!");

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(textr1.stateValues.value).eq("You are a squirrel!");
        expect(textr2.stateValues.value).eq("You are a bat!");
      })
    })
  });

  it('single map of sequence', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
      <template><math simplify><copy tname="_source"/>^2</math> </template>
      <sources><sequence from="1" to="5"/></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let mathrs = replacements.map(x => x.replacements[0]);
      let mathrAnchors = mathrs.map(x => '#' + x.componentName);

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(mathrAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1');
      });
      cy.get(`${cesc(mathrAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4');
      });
      cy.get(`${cesc(mathrAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('9');
      });
      cy.get(`${cesc(mathrAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('16');
      });
      cy.get(`${cesc(mathrAnchors[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('25');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(mathrs[0].stateValues.value.tree).eq(1);
        expect(mathrs[1].stateValues.value.tree).eq(4);
        expect(mathrs[2].stateValues.value.tree).eq(9);
        expect(mathrs[3].stateValues.value.tree).eq(16);
        expect(mathrs[4].stateValues.value.tree).eq(25);
      })
    })
  });

  it('triple parallel map', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <aslist>
    <map behavior="parallel">
      <template><math>(<copy tname="_source"/>, <copy tname="_source" fromSources="2" />, <copy tname="_source" fromSources="3" />)</math><math>(<copy tname="_sourceindex"/>, <copy tname="_sourceindex" fromSources="2" />, <copy tname="_sourceindex" fromSources="3" />)</math></template>
      <sources><sequence from="1" to="5"/></sources>
      <sources><sequence from="21" to="23"/></sources>
      <sources><sequence from="-5" to="-21" step="-3"/></sources>
    </map>
    </aslist>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load


    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let mathrs = replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let mathrAnchors = mathrs.map(x => '#' + x.componentName);

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(mathrAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,21,−5)');
      });
      cy.get(`${cesc(mathrAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,1,1)');
      });
      cy.get(`${cesc(mathrAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,22,−8)');
      });
      cy.get(`${cesc(mathrAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,2,2)');
      });
      cy.get(`${cesc(mathrAnchors[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,23,−11)');
      });
      cy.get(`${cesc(mathrAnchors[5])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,3,3)');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(mathrs[0].stateValues.value.tree).eqls(["tuple", 1, 21, -5]);
        expect(mathrs[1].stateValues.value.tree).eqls(["tuple", 1, 1, 1]);
        expect(mathrs[2].stateValues.value.tree).eqls(["tuple", 2, 22, -8]);
        expect(mathrs[3].stateValues.value.tree).eqls(["tuple", 2, 2, 2]);
        expect(mathrs[4].stateValues.value.tree).eqls(["tuple", 3, 23, -11]);
        expect(mathrs[5].stateValues.value.tree).eqls(["tuple", 3, 3, 3]);
      })
    })
  });

  it('triple combination map', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map behavior="combination">
      <template><math>(<copy tname="_source"/>, <copy tname="_source" fromSources="2" />, <copy tname="_source" fromSources="3" />)</math><math>(<copy tname="_sourceindex"/>, <copy tname="_sourceindex" fromSources="2" />, <copy tname="_sourceindex" fromSources="3" />)</math></template>
      <sources><sequence from="1" to="3"/></sources>
      <sources><sequence from="21" to="23" step="2"/></sources>
      <sources><sequence from="-5" to="-8" step="-3"/></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let mathrs = replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let mathrAnchors = mathrs.map(x => '#' + x.componentName);

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(mathrAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,21,−5)');
      });
      cy.get(`${cesc(mathrAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,1,1)');
      });
      cy.get(`${cesc(mathrAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,21,−8)');
      });
      cy.get(`${cesc(mathrAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,1,2)');
      });
      cy.get(`${cesc(mathrAnchors[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,23,−5)');
      });
      cy.get(`${cesc(mathrAnchors[5])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,2,1)');
      });
      cy.get(`${cesc(mathrAnchors[6])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,23,−8)');
      });
      cy.get(`${cesc(mathrAnchors[7])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,2,2)');
      });
      cy.get(`${cesc(mathrAnchors[8])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,21,−5)');
      });
      cy.get(`${cesc(mathrAnchors[9])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,1,1)');
      });
      cy.get(`${cesc(mathrAnchors[10])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,21,−8)');
      });
      cy.get(`${cesc(mathrAnchors[11])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,1,2)');
      });
      cy.get(`${cesc(mathrAnchors[12])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,23,−5)');
      });
      cy.get(`${cesc(mathrAnchors[13])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,2,1)');
      });
      cy.get(`${cesc(mathrAnchors[14])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,23,−8)');
      });
      cy.get(`${cesc(mathrAnchors[15])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,2,2)');
      });
      cy.get(`${cesc(mathrAnchors[16])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,21,−5)');
      });
      cy.get(`${cesc(mathrAnchors[17])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,1,1)');
      });
      cy.get(`${cesc(mathrAnchors[18])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,21,−8)');
      });
      cy.get(`${cesc(mathrAnchors[19])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,1,2)');
      });
      cy.get(`${cesc(mathrAnchors[20])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,23,−5)');
      });
      cy.get(`${cesc(mathrAnchors[21])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,2,1)');
      });
      cy.get(`${cesc(mathrAnchors[22])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,23,−8)');
      });
      cy.get(`${cesc(mathrAnchors[23])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,2,2)');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(mathrs[0].stateValues.value.tree).eqls(["tuple", 1, 21, -5]);
        expect(mathrs[1].stateValues.value.tree).eqls(["tuple", 1, 1, 1]);
        expect(mathrs[2].stateValues.value.tree).eqls(["tuple", 1, 21, -8]);
        expect(mathrs[3].stateValues.value.tree).eqls(["tuple", 1, 1, 2]);
        expect(mathrs[4].stateValues.value.tree).eqls(["tuple", 1, 23, -5]);
        expect(mathrs[5].stateValues.value.tree).eqls(["tuple", 1, 2, 1]);
        expect(mathrs[6].stateValues.value.tree).eqls(["tuple", 1, 23, -8]);
        expect(mathrs[7].stateValues.value.tree).eqls(["tuple", 1, 2, 2]);
        expect(mathrs[8].stateValues.value.tree).eqls(["tuple", 2, 21, -5]);
        expect(mathrs[9].stateValues.value.tree).eqls(["tuple", 2, 1, 1]);
        expect(mathrs[10].stateValues.value.tree).eqls(["tuple", 2, 21, -8]);
        expect(mathrs[11].stateValues.value.tree).eqls(["tuple", 2, 1, 2]);
        expect(mathrs[12].stateValues.value.tree).eqls(["tuple", 2, 23, -5]);
        expect(mathrs[13].stateValues.value.tree).eqls(["tuple", 2, 2, 1]);
        expect(mathrs[14].stateValues.value.tree).eqls(["tuple", 2, 23, -8]);
        expect(mathrs[15].stateValues.value.tree).eqls(["tuple", 2, 2, 2]);
        expect(mathrs[16].stateValues.value.tree).eqls(["tuple", 3, 21, -5]);
        expect(mathrs[17].stateValues.value.tree).eqls(["tuple", 3, 1, 1]);
        expect(mathrs[18].stateValues.value.tree).eqls(["tuple", 3, 21, -8]);
        expect(mathrs[19].stateValues.value.tree).eqls(["tuple", 3, 1, 2]);
        expect(mathrs[20].stateValues.value.tree).eqls(["tuple", 3, 23, -5]);
        expect(mathrs[21].stateValues.value.tree).eqls(["tuple", 3, 2, 1]);
        expect(mathrs[22].stateValues.value.tree).eqls(["tuple", 3, 23, -8]);
        expect(mathrs[23].stateValues.value.tree).eqls(["tuple", 3, 2, 2]);
      })
    });
  });

  it('two nested maps', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <aslist>
    <map>
      <template><map>
          <template><math simplify><copy tname="_source" />+<copy tname="_source" fromMapAncestor="2" /></math><math simplify><copy tname="_sourceindex"/>+2<copy tname="_sourceindex" fromMapAncestor="2" /></math></template>
          <sources><sequence from="1" to="2"/></sources>
        </map></template>
      <sources><number>-10</number><number>5</number></sources>
    </map>
    </aslist>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements;
      let mathrs = replacements.reduce(
        (a, c) => [
          ...a,
          ...c.replacements[0].replacements.reduce((a1, c1) => [...a1, ...c1.replacements], [])
        ], []
      );
      let mathrAnchors = mathrs.map(x => '#' + x.componentName);

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(mathrAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−9');
      });
      cy.get(`${cesc(mathrAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('3');
      });
      cy.get(`${cesc(mathrAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('−8');
      });
      cy.get(`${cesc(mathrAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('4');
      });
      cy.get(`${cesc(mathrAnchors[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('6');
      });
      cy.get(`${cesc(mathrAnchors[5])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('5');
      });
      cy.get(`${cesc(mathrAnchors[6])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('7');
      });
      cy.get(`${cesc(mathrAnchors[7])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('6');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then(() => {
        expect(mathrs[0].stateValues.value.tree).eq(-9);
        expect(mathrs[1].stateValues.value.tree).eq(3);
        expect(mathrs[2].stateValues.value.tree).eq(-8);
        expect(mathrs[3].stateValues.value.tree).eq(4);
        expect(mathrs[4].stateValues.value.tree).eq(6);
        expect(mathrs[5].stateValues.value.tree).eq(5);
        expect(mathrs[6].stateValues.value.tree).eq(7);
        expect(mathrs[7].stateValues.value.tree).eq(6);
      })
    })
  });

  it('three nested maps with graphs and copied', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
    <template><graph>
        <map>
          <template><map>
              <template><point><coords>(<copy tname="_source"/>+<copy tname="_source" fromMapAncestor="3"/>, <copy tname="_source" fromMapAncestor="2"/>)</coords></point><point><coords>(<copy tname="_sourceindex"/>+2*<copy tname="_sourceindex" fromMapAncestor="3"/>, <copy tname="_sourceindex" fromMapAncestor="2"/>)</coords></point></template>
              <sources><sequence from="1" to="2"/></sources>
            </map></template>
          <sources><sequence from="-5" to="5" step="10"/></sources>
        </map>
      </graph></template>
    <sources><sequence from="-10" to="5" step="15"/></sources>
    </map>
    <copy name="mapcopy" tname="_map1" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load

    cy.log('Test internal values are set to the correct values')
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let graphs = components['/_map1'].replacements.map(x => x.replacements[0]);
      let graphsChildren = graphs.map(x => x.activeChildren);
      let graphs2 = components['/mapcopy'].replacements.map(x => x.replacements[0]);
      let graphs2Children = graphs2.map(x => x.activeChildren);

      expect(graphs[0].stateValues.graphicalDescendants.length).eq(8);
      expect(graphs[1].stateValues.graphicalDescendants.length).eq(8);
      expect(graphs2[0].stateValues.graphicalDescendants.length).eq(8);
      expect(graphs2[1].stateValues.graphicalDescendants.length).eq(8);

      expect(graphsChildren[0][0].stateValues.xs[0].tree).eq(-9);
      expect(graphsChildren[0][0].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[0][1].stateValues.xs[0].tree).eq(3);
      expect(graphsChildren[0][1].stateValues.xs[1].tree).eq(1);
      expect(graphsChildren[0][2].stateValues.xs[0].tree).eq(-8);
      expect(graphsChildren[0][2].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[0][3].stateValues.xs[0].tree).eq(4);
      expect(graphsChildren[0][3].stateValues.xs[1].tree).eq(1);
      expect(graphsChildren[0][4].stateValues.xs[0].tree).eq(-9);
      expect(graphsChildren[0][4].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[0][5].stateValues.xs[0].tree).eq(3);
      expect(graphsChildren[0][5].stateValues.xs[1].tree).eq(2);
      expect(graphsChildren[0][6].stateValues.xs[0].tree).eq(-8);
      expect(graphsChildren[0][6].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[0][7].stateValues.xs[0].tree).eq(4);
      expect(graphsChildren[0][7].stateValues.xs[1].tree).eq(2);

      expect(graphsChildren[1][0].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][0].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[1][1].stateValues.xs[0].tree).eq(5);
      expect(graphsChildren[1][1].stateValues.xs[1].tree).eq(1);
      expect(graphsChildren[1][2].stateValues.xs[0].tree).eq(7);
      expect(graphsChildren[1][2].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[1][3].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][3].stateValues.xs[1].tree).eq(1);
      expect(graphsChildren[1][4].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][4].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[1][5].stateValues.xs[0].tree).eq(5);
      expect(graphsChildren[1][5].stateValues.xs[1].tree).eq(2);
      expect(graphsChildren[1][6].stateValues.xs[0].tree).eq(7);
      expect(graphsChildren[1][6].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[1][7].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][7].stateValues.xs[1].tree).eq(2);

      expect(graphs2Children[0][0].stateValues.xs[0].tree).eq(-9);
      expect(graphs2Children[0][0].stateValues.xs[1].tree).eq(-5);
      expect(graphs2Children[0][1].stateValues.xs[0].tree).eq(3);
      expect(graphs2Children[0][1].stateValues.xs[1].tree).eq(1);
      expect(graphs2Children[0][2].stateValues.xs[0].tree).eq(-8);
      expect(graphs2Children[0][2].stateValues.xs[1].tree).eq(-5);
      expect(graphs2Children[0][3].stateValues.xs[0].tree).eq(4);
      expect(graphs2Children[0][3].stateValues.xs[1].tree).eq(1);
      expect(graphs2Children[0][4].stateValues.xs[0].tree).eq(-9);
      expect(graphs2Children[0][4].stateValues.xs[1].tree).eq(5);
      expect(graphs2Children[0][5].stateValues.xs[0].tree).eq(3);
      expect(graphs2Children[0][5].stateValues.xs[1].tree).eq(2);
      expect(graphs2Children[0][6].stateValues.xs[0].tree).eq(-8);
      expect(graphs2Children[0][6].stateValues.xs[1].tree).eq(5);
      expect(graphs2Children[0][7].stateValues.xs[0].tree).eq(4);
      expect(graphs2Children[0][7].stateValues.xs[1].tree).eq(2);

      expect(graphs2Children[1][0].stateValues.xs[0].tree).eq(6);
      expect(graphs2Children[1][0].stateValues.xs[1].tree).eq(-5);
      expect(graphs2Children[1][1].stateValues.xs[0].tree).eq(5);
      expect(graphs2Children[1][1].stateValues.xs[1].tree).eq(1);
      expect(graphs2Children[1][2].stateValues.xs[0].tree).eq(7);
      expect(graphs2Children[1][2].stateValues.xs[1].tree).eq(-5);
      expect(graphs2Children[1][3].stateValues.xs[0].tree).eq(6);
      expect(graphs2Children[1][3].stateValues.xs[1].tree).eq(1);
      expect(graphs2Children[1][4].stateValues.xs[0].tree).eq(6);
      expect(graphs2Children[1][4].stateValues.xs[1].tree).eq(5);
      expect(graphs2Children[1][5].stateValues.xs[0].tree).eq(5);
      expect(graphs2Children[1][5].stateValues.xs[1].tree).eq(2);
      expect(graphs2Children[1][6].stateValues.xs[0].tree).eq(7);
      expect(graphs2Children[1][6].stateValues.xs[1].tree).eq(5);
      expect(graphs2Children[1][7].stateValues.xs[0].tree).eq(6);
      expect(graphs2Children[1][7].stateValues.xs[1].tree).eq(2);

    })
  });

  it('three nested maps with graphs and assignnames', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map assignnames="u,v">
    <template newNamespace>
      <graph>
        <map assignnames="u,v">
          <template newNamespace>
            <map assignnames="u,v">
              <template newNamespace>
                <point name="A"><coords>(<copy tname="_source"/>+<copy tname="_source" fromMapAncestor="3"/>, <copy tname="_source" fromMapAncestor="2"/>)</coords></point>
              </template>
              <sources><sequence from="1" to="2"/></sources>
            </map>
          </template>
          <sources><sequence from="-5" to="5" step="10"/></sources>
        </map>
      </graph>
    </template>
    <sources><sequence from="-10" to="5" step="15"/></sources>
    </map>
    <copy name="c1" prop="coords" tname="/u/u/u/A" />
    <copy name="c2" prop="coords" tname="/u/u/v/A" />
    <copy name="c3" prop="coords" tname="/u/v/u/A" />
    <copy name="c4" prop="coords" tname="/u/v/v/A" />
    <copy name="c5" prop="coords" tname="/v/u/u/A" />
    <copy name="c6" prop="coords" tname="/v/u/v/A" />
    <copy name="c7" prop="coords" tname="/v/v/u/A" />
    <copy name="c8" prop="coords" tname="/v/v/v/A" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');   // to wait for page to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1 = components['/c1'].replacements[0];
      let coords1Anchor = cesc('#' + coords1.componentName);
      let coords2 = components['/c2'].replacements[0];
      let coords2Anchor = cesc('#' + coords2.componentName);
      let coords3 = components['/c3'].replacements[0];
      let coords3Anchor = cesc('#' + coords3.componentName);
      let coords4 = components['/c4'].replacements[0];
      let coords4Anchor = cesc('#' + coords4.componentName);
      let coords5 = components['/c5'].replacements[0];
      let coords5Anchor = cesc('#' + coords5.componentName);
      let coords6 = components['/c6'].replacements[0];
      let coords6Anchor = cesc('#' + coords6.componentName);
      let coords7 = components['/c7'].replacements[0];
      let coords7Anchor = cesc('#' + coords7.componentName);
      let coords8 = components['/c8'].replacements[0];
      let coords8Anchor = cesc('#' + coords8.componentName);

      cy.log('Test values displayed in browser')
      cy.get(`${coords1Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−9,−5)');
      });
      cy.get(`${coords2Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−8,−5)');
      });
      cy.get(`${coords3Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−9,5)');
      });
      cy.get(`${coords4Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−8,5)');
      });
      cy.get(`${coords5Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(6,−5)');
      });
      cy.get(`${coords6Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,−5)');
      });
      cy.get(`${coords7Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(6,5)');
      });
      cy.get(`${coords8Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(7,5)');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        expect(components['/u/_graph1'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/v/_graph1'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/u/u/u/A'].stateValues.xs[0].tree).eq(-9);
        expect(components['/u/u/u/A'].stateValues.xs[1].tree).eq(-5);
        expect(components['/u/u/v/A'].stateValues.xs[0].tree).eq(-8);
        expect(components['/u/u/v/A'].stateValues.xs[1].tree).eq(-5);
        expect(components['/u/v/u/A'].stateValues.xs[0].tree).eq(-9);
        expect(components['/u/v/u/A'].stateValues.xs[1].tree).eq(5);
        expect(components['/u/v/v/A'].stateValues.xs[0].tree).eq(-8);
        expect(components['/u/v/v/A'].stateValues.xs[1].tree).eq(5);
        expect(components['/v/u/u/A'].stateValues.xs[0].tree).eq(6);
        expect(components['/v/u/u/A'].stateValues.xs[1].tree).eq(-5);
        expect(components['/v/u/v/A'].stateValues.xs[0].tree).eq(7);
        expect(components['/v/u/v/A'].stateValues.xs[1].tree).eq(-5);
        expect(components['/v/v/u/A'].stateValues.xs[0].tree).eq(6);
        expect(components['/v/v/u/A'].stateValues.xs[1].tree).eq(5);
        expect(components['/v/v/v/A'].stateValues.xs[0].tree).eq(7);
        expect(components['/v/v/v/A'].stateValues.xs[1].tree).eq(5);
      })
    })
  });

  it('combination map nested inside map with graphs', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
    <template><graph>
      <map behavior="combination">
        <template><point><coords>(<copy tname="_source"/>+<copy tname="_source" fromMapAncestor="2" />, <copy tname="_source" fromSources="2" />)</coords></point></template>
        <sources><sequence from="1" to="2"/></sources>
        <sources><sequence from="-5" to="5" step="10"/></sources>
      </map>
    </graph></template>
    <sources><sequence from="-10" to="5" step="15"/></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.log('Test internal values are set to the correct values')
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let graphs = components['/_map1'].replacements.map(x => x.replacements[0]);
      let graphsChildren = graphs.map(x => x.activeChildren);

      expect(graphs[0].stateValues.graphicalDescendants.length).eq(4);
      expect(graphs[1].stateValues.graphicalDescendants.length).eq(4);
      expect(graphsChildren[0][0].stateValues.xs[0].tree).eq(-9);
      expect(graphsChildren[0][0].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[0][1].stateValues.xs[0].tree).eq(-9);
      expect(graphsChildren[0][1].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[0][2].stateValues.xs[0].tree).eq(-8);
      expect(graphsChildren[0][2].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[0][3].stateValues.xs[0].tree).eq(-8);
      expect(graphsChildren[0][3].stateValues.xs[1].tree).eq(5);

      expect(graphsChildren[1][0].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][0].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[1][1].stateValues.xs[0].tree).eq(6);
      expect(graphsChildren[1][1].stateValues.xs[1].tree).eq(5);
      expect(graphsChildren[1][2].stateValues.xs[0].tree).eq(7);
      expect(graphsChildren[1][2].stateValues.xs[1].tree).eq(-5);
      expect(graphsChildren[1][3].stateValues.xs[0].tree).eq(7);
      expect(graphsChildren[1][3].stateValues.xs[1].tree).eq(5);

    })
  });

  it('map with copies', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
    <template newNamespace><math simplify>
        <copy tname="_source" name="b"/> + <copy tname="_sourceindex" name="i"/> + <copy tname="../a" /> 
        + <math name="q">z</math> + <copy tname="q" /> + <copy tname="b" /> +<copy tname="i" />
      </math><math>x</math></template>
    <sources><sequence from="1" to="2"/></sources>
    </map>
    <math name="a">x</math>
    <copy name="mapcopy" tname="_map1" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/mapcopy'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });

      cy.get(`${cesc('#/a')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });

      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors2[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });

    })
  });

  it('map with copies, extended dynamically', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <number name="sequenceLength" hide>1</number>
    <map>
    <template newnamespace><math simplify>
        <copy tname="_source" name="b"/> + <copy tname="_sourceindex" name="i"/> + <copy tname="../a" /> 
        + <math name="q">z</math> + <copy tname="q" /> + <copy tname="b" /> +<copy tname="i" />
      </math><math>x</math></template>
    <sources><sequence from="1" sequenceLength="$sequenceLength"/></sources>
    </map>
    <math name="a">x</math>
    <copy name="mapcopy" tname="_map1" />

    <updatevalue label="double">
      <mathtarget><copy tname="sequenceLength" /></mathtarget>
      <newmathvalue>2<copy tname="sequenceLength" /></newmathvalue>
    </updatevalue>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/mapcopy'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc('#/a')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
    })


    cy.log('Double the sequenceLength then test again')
    cy.get(cesc('#/_updatevalue1_button')).click(); //Update Button

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/mapcopy'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)

      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc('#/a')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors2[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
    });


    cy.log('Double the sequenceLength again then test one more time')
    cy.get(cesc('#/_updatevalue1_button')).click(); //Update Button

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/mapcopy'].replacements.reduce((a, c) => [...a, ...c.replacements], []);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)

      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+12');
      });
      cy.get(`${cesc(replacementAnchors[5])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors[6])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+16');
      });
      cy.get(`${cesc(replacementAnchors[7])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc('#/a')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+4');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+8');
      });
      cy.get(`${cesc(replacementAnchors2[3])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[4])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+12');
      });
      cy.get(`${cesc(replacementAnchors2[5])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });
      cy.get(`${cesc(replacementAnchors2[6])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x+2z+16');
      });
      cy.get(`${cesc(replacementAnchors2[7])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('x');
      });

    });
  });

  it('map with copied template', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
    <template><math simplify="full">sin(<copy tname="_sourceindex"/><copy tname="_source"/>)</math></template>
    <sources><math>x</math><math>y</math></sources>
    </map>
  
    <map>
    <copy tname="_template1" />
    <sources><math>q</math><math>p</math></sources>
    </map>

    <copy name="mapcopy" tname="_map2" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.map(x => x.replacements[0]);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/_map2'].replacements.map(x => x.replacements[0]);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)
      let replacements3 = components['/mapcopy'].replacements.map(x => x.replacements[0]);
      let replacementAnchors3 = replacements3.map(x => '#' + x.componentName)

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(x)');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2y)');
      });
      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(q)');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2p)');
      });
      cy.get(`${cesc(replacementAnchors3[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(q)');
      });
      cy.get(`${cesc(replacementAnchors3[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2p)');
      });
    })
  });

  it('map with new namespace but no new namespace on template', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map newNamespace>
    <template><math simplify="full">sin(<copy tname="_sourceindex"/><copy tname="_source"/>)</math></template>
    <sources><math>x</math><math>y</math></sources>
    </map>
  
    <copy name="mapcopy" tname="_map1" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.map(x => x.replacements[0]);
      let replacementAnchors = replacements.map(x => '#' + x.componentName)
      let replacements2 = components['/mapcopy'].replacements.map(x => x.replacements[0]);
      let replacementAnchors2 = replacements2.map(x => '#' + x.componentName)

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(replacementAnchors[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(x)');
      });
      cy.get(`${cesc(replacementAnchors[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2y)');
      });
      cy.get(`${cesc(replacementAnchors2[0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(x)');
      });
      cy.get(`${cesc(replacementAnchors2[1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('sin(2y)');
      });
    })
  });

  it('graph with new namespace and assignnames', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <copy tname="/hi/c/_coords1" />
    <copy tname="/hi/s/_coords1" />
    <copy tname="/hi/q/_coords1" />
    
    <grapH Name="hi" newNamespace >
    <map assignnames="q, c,s">
      <template newnamespace><point><coords>(<copy tname="_source"/>, <copy tname="_source" fromSources="2" />)</coords></point></template>
      <sources><sequence from="1" to="2"/></sources>
      <sources><sequence from="-3" to="-2"/></sources>
    </map>
    </graph>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1 = components['/_copy1'].replacements[0];
      let coords1Anchor = cesc('#' + coords1.componentName);
      let coords2 = components['/_copy2'].replacements[0];
      let coords2Anchor = cesc('#' + coords2.componentName);
      let coords3 = components['/_copy3'].replacements[0];
      let coords3Anchor = cesc('#' + coords3.componentName);

      let replacements = components['/hi/_map1'].replacements.map(x => x.replacements[0]);

      cy.log('Test values displayed in browser')

      cy.get(`${coords1Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,−2)');
      });
      cy.get(`${coords2Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,−3)');
      });
      cy.get(`${coords3Anchor} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,−3)');
      });

      cy.log('Test internal values are set to the correct values')
      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);

        expect(components['/hi'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/hi/q/_point1'].stateValues.xs[0].tree).eq(1);
        expect(components['/hi/q/_point1'].stateValues.xs[1].tree).eq(-3);
        expect(components['/hi/c/_point1'].stateValues.xs[0].tree).eq(1);
        expect(components['/hi/c/_point1'].stateValues.xs[1].tree).eq(-2);
        expect(components['/hi/s/_point1'].stateValues.xs[0].tree).eq(2);
        expect(components['/hi/s/_point1'].stateValues.xs[1].tree).eq(-3);
        expect(replacements[3].stateValues.xs[0].tree).eq(2);
        expect(replacements[3].stateValues.xs[1].tree).eq(-2);
      })
    })
  });

  it('map copying _source of other map', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map assignnames="u,v,w">
      <template newNamespace><math>(<copy tname="_source"/>, <copy tname="../e/_copy1" />)</math></template>
      <sources><sequence from="1" to="3"/></sources>
    </map>
    <map assignnames="c,d,e">
      <template newNamespace><math>sin(<copy tname="_source"/>)</math></template>
      <sources><sequence from="4" to="6"/></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.log('Test values displayed in browser')
    cy.get(`${cesc('#/u/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,6)');
    });
    cy.get(`${cesc('#/v/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,6)');
    });
    cy.get(`${cesc('#/w/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,6)');
    });
    cy.get(`${cesc('#/c/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('sin(4)');
    });
    cy.get(`${cesc('#/d/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('sin(5)');
    });
    cy.get(`${cesc('#/e/_math1')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('sin(6)');
    });
  });

  it('map length depending on other map', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <map>
    <template><map>
       <template><math>(<copy tname="_source"/>, <copy tname="_source" fromMapAncestor="2"/>)</math></template>
       <sources><sequence from="1" to="$n" /></sources>
     </map><copy tname="_source" hide name="n" /></template>
    <sources><sequence from="1" to="3"/></sources>
    </map>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let replacements = components['/_map1'].replacements.map(x => x.replacements[0]);
      let replacementAnchors = replacements.map(x => x.replacements.map(y => '#' + y.replacements[0].componentName))

      cy.log('Test values displayed in browser')
      cy.get(`${cesc(replacementAnchors[0][0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,1)');
      });
      cy.get(`${cesc(replacementAnchors[1][0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,2)');
      });
      cy.get(`${cesc(replacementAnchors[1][1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,2)');
      });
      cy.get(`${cesc(replacementAnchors[2][0])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,3)');
      });
      cy.get(`${cesc(replacementAnchors[2][1])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,3)');
      });
      cy.get(`${cesc(replacementAnchors[2][2])} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,3)');
      });

    });
  });

  it('map begins zero length, copied multiple times', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>

    <p>
    <map>
    <template><math simplify><copy tname="_source"/>^2</math><text>,</text></template>
    <sources>
    <sequence from="$sequenceFrom" to="$sequenceTo" sequenceLength="$sequenceCount" />
    </sources>
    </map>
    </p>

    <mathinput name="sequenceFrom" prefill="1"/>
    <mathinput name="sequenceTo" prefill="2"/>
    <mathinput name="sequenceCount" prefill="0"/>
    
    <p><copy name="copymap2" tname="_map1" /></p>
    <p><copy name="copymap3" tname="copymap2" /></p>

    <copy name="copymapthroughp" tname="_p1" />
    <copy name="copymapthroughp2" tname="copymapthroughp" />
    <copy name="copymapthroughp3" tname="copymapthroughp2" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let p4 = components['/copymapthroughp'].replacements[0];
      let p4Anchor = cesc('#' + p4.componentName);
      let p5 = components['/copymapthroughp2'].replacements[0];
      let p5Anchor = cesc('#' + p5.componentName);
      let p6 = components['/copymapthroughp3'].replacements[0];
      let p6Anchor = cesc('#' + p6.componentName);


      cy.log('At beginning, nothing shown')
      cy.get(cesc('#/_p1')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p2')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p3')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p4Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p5Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p6Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });


      cy.log('make sequence length 1');
      cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}1{enter}', { force: true });

      cy.window().then(() => {

        let map1maths = components['/_map1'].replacements.map(x => x.replacements[0]);
        let map1mathAnchors = map1maths.map(x => '#' + x.componentName)
        let map2maths = components['/copymap2'].replacements.map(x => x.replacements[0]);
        let map2mathAnchors = map2maths.map(x => '#' + x.componentName)
        let map3maths = components['/copymap3'].replacements.map(x => x.replacements[0]);
        let map3mathAnchors = map3maths.map(x => '#' + x.componentName)
        let map4maths = components['/copymapthroughp'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map4mathAnchors = map4maths.map(x => '#' + x.componentName)
        let map5maths = components['/copymapthroughp2'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map5mathAnchors = map5maths.map(x => '#' + x.componentName)
        let map6maths = components['/copymapthroughp3'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map6mathAnchors = map6maths.map(x => '#' + x.componentName)

        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });

      })

      cy.log('make sequence length 0 again');
      cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}0{enter}', { force: true });

      cy.get(cesc('#/_p1')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p2')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p3')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p4Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p5Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p6Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });

      cy.log('make sequence length 2');
      cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}2{enter}', { force: true });

      cy.window().then(() => {

        let map1maths = components['/_map1'].replacements.map(x => x.replacements[0]);
        let map1mathAnchors = map1maths.map(x => '#' + x.componentName)
        let map2maths = components['/copymap2'].replacements.map(x => x.replacements[0]);
        let map2mathAnchors = map2maths.map(x => '#' + x.componentName)
        let map3maths = components['/copymap3'].replacements.map(x => x.replacements[0]);
        let map3mathAnchors = map3maths.map(x => '#' + x.componentName)
        let map4maths = components['/copymapthroughp'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map4mathAnchors = map4maths.map(x => '#' + x.componentName)
        let map5maths = components['/copymapthroughp2'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map5mathAnchors = map5maths.map(x => '#' + x.componentName)
        let map6maths = components['/copymapthroughp3'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map6mathAnchors = map6maths.map(x => '#' + x.componentName)

        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('1');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('4');
        });

      });

      cy.log('change limits');
      cy.get(cesc('#/sequenceFrom') + " textarea").type('{end}{backspace}3{enter}', { force: true });
      cy.get(cesc('#/sequenceTo') + " textarea").type('{end}{backspace}5{enter}', { force: true });


      cy.window().then(() => {

        let map1maths = components['/_map1'].replacements.map(x => x.replacements[0]);
        let map1mathAnchors = map1maths.map(x => '#' + x.componentName)
        let map2maths = components['/copymap2'].replacements.map(x => x.replacements[0]);
        let map2mathAnchors = map2maths.map(x => '#' + x.componentName)
        let map3maths = components['/copymap3'].replacements.map(x => x.replacements[0]);
        let map3mathAnchors = map3maths.map(x => '#' + x.componentName)
        let map4maths = components['/copymapthroughp'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map4mathAnchors = map4maths.map(x => '#' + x.componentName)
        let map5maths = components['/copymapthroughp2'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map5mathAnchors = map5maths.map(x => '#' + x.componentName)
        let map6maths = components['/copymapthroughp3'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map6mathAnchors = map6maths.map(x => '#' + x.componentName)

        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
      });

      cy.log('make sequence length 0 again');
      cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}0{enter}', { force: true });

      cy.get(cesc('#/_p1')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p2')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(cesc('#/_p3')).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p4Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p5Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });
      cy.get(p6Anchor).invoke('text').then((text) => {
        expect(text.trim()).equal('');
      });

      cy.log('make sequence length 3');
      cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}3{enter}', { force: true });

      cy.window().then(() => {

        let map1maths = components['/_map1'].replacements.map(x => x.replacements[0]);
        let map1mathAnchors = map1maths.map(x => '#' + x.componentName)
        let map2maths = components['/copymap2'].replacements.map(x => x.replacements[0]);
        let map2mathAnchors = map2maths.map(x => '#' + x.componentName)
        let map3maths = components['/copymap3'].replacements.map(x => x.replacements[0]);
        let map3mathAnchors = map3maths.map(x => '#' + x.componentName)
        let map4maths = components['/copymapthroughp'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map4mathAnchors = map4maths.map(x => '#' + x.componentName)
        let map5maths = components['/copymapthroughp2'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map5mathAnchors = map5maths.map(x => '#' + x.componentName)
        let map6maths = components['/copymapthroughp3'].replacements[0].activeChildren.filter(x => x.componentType === "math");
        let map6mathAnchors = map6maths.map(x => '#' + x.componentName)

        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(cesc('#/_p1')).children(cesc(map1mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(cesc('#/_p2')).children(cesc(map2mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(cesc('#/_p3')).children(cesc(map3mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(p4Anchor).children(cesc(map4mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(p5Anchor).children(cesc(map5mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[0])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('9');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[1])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('16');
        });
        cy.get(p6Anchor).children(cesc(map6mathAnchors[2])).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
          expect(text.trim()).equal('25');
        });
      })
    })
  });

  it('map with circular dependence in template', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
      <map assignnames="a,b,c">
        <template newNamespace><point>
            <x><copy tname="../q" /><copy tname="_source"/>^2</x>
            <y><copy prop="x" tname="_point2" /></y>
          </point><point>
            <x><copy tname="../r" /><copy tname="_source"/></x>
            <y><copy prop="x" tname="_point1" /></y>
          </point></template>
      <sources>
        <sequence from="2" to="4" />
      </sources>
      </map>
    </graph>
    <math name="q">1</math>
    <math name="r">1</math>
    <copy name="c1" prop="coords" tname="a/_point1" />
    <copy name="c2" prop="coords" tname="a/_point2" />
    <copy name="c3" prop="coords" tname="b/_point1" />
    <copy name="c4" prop="coords" tname="b/_point2" />
    <copy name="c5" prop="coords" tname="c/_point1" />
    <copy name="c6" prop="coords" tname="c/_point2" />
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.log('Test values displayed in browser')
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1 = components['/c1'].replacements[0];
      let coords1Anchor = '#' + coords1.componentName;
      let coords2 = components['/c2'].replacements[0];
      let coords2Anchor = '#' + coords2.componentName;
      let coords3 = components['/c3'].replacements[0];
      let coords3Anchor = '#' + coords3.componentName;
      let coords4 = components['/c4'].replacements[0];
      let coords4Anchor = '#' + coords4.componentName;
      let coords5 = components['/c5'].replacements[0];
      let coords5Anchor = '#' + coords5.componentName;
      let coords6 = components['/c6'].replacements[0];
      let coords6Anchor = '#' + coords6.componentName;

      cy.get(`${cesc(coords1Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,2)');
      });
      cy.get(`${cesc(coords2Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,4)');
      });
      cy.get(`${cesc(coords3Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(9,3)');
      });
      cy.get(`${cesc(coords4Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,9)');
      });
      cy.get(`${cesc(coords5Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(16,4)');
      });
      cy.get(`${cesc(coords6Anchor)} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,16)');
      });
      cy.get(`${cesc('#/q')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1');
      });
      cy.get(`${cesc('#/r')} .mjx-mrow`).eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('1');
      });

    })


    cy.window().then((win) => {
      let r = 1;
      let q = 1;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);
      expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(6);
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).eq(xs1[ind]);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).eq(xs2[ind]);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).eq(xs2[ind]);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).eq(xs1[ind]);
      }
    });

    cy.log("move point a1");
    cy.window().then((win) => {
      let r = 1.3;
      let q = -2.1;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/a/_point1'].movePoint({ x: xs1[0], y: xs2[0] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

    cy.log("move point a2");
    cy.window().then((win) => {
      let r = 0.7;
      let q = 1.8;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/a/_point2'].movePoint({ x: xs2[0], y: xs1[0] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

    cy.log("move point b1");
    cy.window().then((win) => {
      let r = -0.2;
      let q = 0.3;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/b/_point1'].movePoint({ x: xs1[1], y: xs2[1] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

    cy.log("move point b2");
    cy.window().then((win) => {
      let r = 0.6;
      let q = 0.35;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/b/_point2'].movePoint({ x: xs2[1], y: xs1[1] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

    cy.log("move point c1");
    cy.window().then((win) => {
      let r = -0.21;
      let q = -0.46;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/c/_point1'].movePoint({ x: xs1[2], y: xs2[2] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

    cy.log("move point c2");
    cy.window().then((win) => {
      let r = 0.37;
      let q = -0.73;
      let s = [2, 3, 4];
      let xs1 = s.map(v => v * v * q);
      let xs2 = s.map(v => v * r);
      let ns = ["a", "b", "c"];
      let components = Object.assign({}, win.state.components);

      components['/c/_point2'].movePoint({ x: xs2[2], y: xs1[2] })
      for (let ind = 0; ind < 3; ind++) {
        let namespace = ns[ind];
        expect(components[`/${namespace}/_point1`].stateValues.xs[0].tree).closeTo(xs1[ind], 1E-14);
        expect(components[`/${namespace}/_point1`].stateValues.xs[1].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[0].tree).closeTo(xs2[ind], 1E-14);
        expect(components[`/${namespace}/_point2`].stateValues.xs[1].tree).closeTo(xs1[ind], 1E-14);
      }
    });

  });

  it('two maps with mutual copies, begin zero length, copied multiple times', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <graph>
      <map assignnames="a,b,c">
        <template newNamespace><point>
            <x>-<copy tname="_source"/></x>
            <y><copy tname="_source"/><copy prop="x" tname="../q/_point1" /></y>
          </point></template>
      <sources>
        <sequence from="$sequenceFrom" to="$sequenceTo" sequenceLength="$sequenceCount" />
      </sources>
      </map>
      <map assignnames="q,r,s">
        <template newNamespace><point>
            <x><copy tname="_source"/></x>
            <y><copy tname="_source"/><copy prop="x" tname="../a/_point1" /></y>
          </point></template>
      <sources>
        <sequence from="$sequenceFrom" to="$sequenceTo" sequenceLength="$sequenceCount" />
      </sources>
      </map>
    </graph>
    
    <mathinput name="sequenceFrom" prefill="1"/>
    <mathinput name="sequenceTo" prefill="2"/>
    <mathinput name="sequenceCount" prefill="0"/>
    
    <graph>
    <copy name="copymap1" tname="_map1" />
    <copy name="copymap2" tname="_map2" />
    </graph>
    <graph>
    <copy name="copymap1b" tname="copymap1" />
    <copy name="copymap2b" tname="copymap2" />
    </graph>
    
    <copy name="graph4" tname="_graph1" />
    <p><collect componentTypes="point" tname="_graph1"/></p>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.log('At beginning, nothing shown')
    cy.get(cesc('#/_p1')).invoke('text').then((text) => {
      expect(text.trim()).equal('');
    });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(0);
    })

    cy.log('make sequence length 1');
    cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}1{enter}', { force: true });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1Anchor = cesc('#' + components["/_collect1"].replacements[0].adapterUsed.componentName);
      let coords2Anchor = cesc('#' + components["/_collect1"].replacements[1].adapterUsed.componentName);

      cy.get(cesc('#/_p1')).children(coords1Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−1,1)');
      });
      cy.get(cesc('#/_p1')).children(coords2Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,−1)');
      });

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(2);
        expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(2);
        expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(2);
        expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(2);
        expect(components['/a/_point1'].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/q/_point1'].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/copymap1'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/copymap2'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/copymap1b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/copymap2b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/graph4'].replacements[0].activeChildren[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/graph4'].replacements[0].activeChildren[1].stateValues.coords.tree).eqls(["vector", 1, -1]);
      })
    })

    cy.log('make sequence length 0 again');
    cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}0{enter}', { force: true });

    cy.get(cesc('#/_p1')).invoke('text').then((text) => {
      expect(text.trim()).equal('');
    });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(0);
    })


    cy.log('make sequence length 2');
    cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}2{enter}', { force: true });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1Anchor = cesc('#' + components["/_collect1"].replacements[0].adapterUsed.componentName);
      let coords2Anchor = cesc('#' + components["/_collect1"].replacements[1].adapterUsed.componentName);
      let coords3Anchor = cesc('#' + components["/_collect1"].replacements[2].adapterUsed.componentName);
      let coords4Anchor = cesc('#' + components["/_collect1"].replacements[3].adapterUsed.componentName);

      cy.get(cesc('#/_p1')).children(coords1Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−1,1)');
      });
      cy.get(cesc('#/_p1')).children(coords2Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−2,2)');
      });
      cy.get(cesc('#/_p1')).children(coords3Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(1,−1)');
      });
      cy.get(cesc('#/_p1')).children(coords4Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(2,−2)');
      });

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/a/_point1'].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/q/_point1'].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/copymap1'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/copymap2'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/copymap1b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/copymap2b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/graph4'].replacements[0].activeChildren[0].stateValues.coords.tree).eqls(["vector", -1, 1]);
        expect(components['/graph4'].replacements[0].activeChildren[2].stateValues.coords.tree).eqls(["vector", 1, -1]);
        expect(components['/b/_point1'].stateValues.coords.tree).eqls(["vector", -2, 2]);
        expect(components['/r/_point1'].stateValues.coords.tree).eqls(["vector", 2, -2]);
        expect(components['/copymap1'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -2, 2]);
        expect(components['/copymap2'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 2, -2]);
        expect(components['/copymap1b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -2, 2]);
        expect(components['/copymap2b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 2, -2]);
        expect(components['/graph4'].replacements[0].activeChildren[1].stateValues.coords.tree).eqls(["vector", -2, 2]);
        expect(components['/graph4'].replacements[0].activeChildren[3].stateValues.coords.tree).eqls(["vector", 2, -2]);
      })

    })

    cy.log('change limits');
    cy.get(cesc('#/sequenceFrom') + " textarea").type('{end}{backspace}3{enter}', { force: true });
    cy.get(cesc('#/sequenceTo') + " textarea").type('{end}{backspace}5{enter}', { force: true });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1Anchor = cesc('#' + components["/_collect1"].replacements[0].adapterUsed.componentName);
      let coords2Anchor = cesc('#' + components["/_collect1"].replacements[1].adapterUsed.componentName);
      let coords3Anchor = cesc('#' + components["/_collect1"].replacements[2].adapterUsed.componentName);
      let coords4Anchor = cesc('#' + components["/_collect1"].replacements[3].adapterUsed.componentName);

      cy.get(cesc('#/_p1')).children(coords1Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−3,9)');
      });
      cy.get(cesc('#/_p1')).children(coords2Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−5,15)');
      });
      cy.get(cesc('#/_p1')).children(coords3Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,−9)');
      });
      cy.get(cesc('#/_p1')).children(coords4Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−15)');
      });

      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(4);
        expect(components['/a/_point1'].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/q/_point1'].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/copymap1'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/copymap2'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/copymap1b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/copymap2b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/graph4'].replacements[0].activeChildren[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/graph4'].replacements[0].activeChildren[2].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/b/_point1'].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/r/_point1'].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/copymap1'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/copymap2'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/copymap1b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/copymap2b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/graph4'].replacements[0].activeChildren[1].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/graph4'].replacements[0].activeChildren[3].stateValues.coords.tree).eqls(["vector", 5, -15]);
      })
    })

    cy.log('make sequence length 0 again');
    cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}0{enter}', { force: true });

    cy.get(cesc('#/_p1')).invoke('text').then((text) => {
      expect(text.trim()).equal('');
    });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(0);
      expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(0);
    })

    cy.log('make sequence length 3');
    cy.get(cesc('#/sequenceCount') + " textarea").type('{end}{backspace}3{enter}', { force: true });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      let coords1Anchor = cesc('#' + components["/_collect1"].replacements[0].adapterUsed.componentName);
      let coords2Anchor = cesc('#' + components["/_collect1"].replacements[1].adapterUsed.componentName);
      let coords3Anchor = cesc('#' + components["/_collect1"].replacements[2].adapterUsed.componentName);
      let coords4Anchor = cesc('#' + components["/_collect1"].replacements[3].adapterUsed.componentName);
      let coords5Anchor = cesc('#' + components["/_collect1"].replacements[4].adapterUsed.componentName);
      let coords6Anchor = cesc('#' + components["/_collect1"].replacements[5].adapterUsed.componentName);


      cy.get(cesc('#/_p1')).children(coords1Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−3,9)');
      });
      cy.get(cesc('#/_p1')).children(coords2Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−4,12)');
      });
      cy.get(cesc('#/_p1')).children(coords3Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(−5,15)');
      });
      cy.get(cesc('#/_p1')).children(coords4Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(3,−9)');
      });
      cy.get(cesc('#/_p1')).children(coords5Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(4,−12)');
      });
      cy.get(cesc('#/_p1')).children(coords6Anchor).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
        expect(text.trim()).equal('(5,−15)');
      });


      cy.window().then((win) => {
        let components = Object.assign({}, win.state.components);
        expect(components['/_graph1'].stateValues.graphicalDescendants.length).eq(6);
        expect(components['/_graph2'].stateValues.graphicalDescendants.length).eq(6);
        expect(components['/_graph3'].stateValues.graphicalDescendants.length).eq(6);
        expect(components['/graph4'].replacements[0].stateValues.graphicalDescendants.length).eq(6);
        expect(components['/a/_point1'].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/q/_point1'].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/copymap1'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/copymap2'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/copymap1b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/copymap2b'].replacements[0].replacements[0].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/graph4'].replacements[0].activeChildren[0].stateValues.coords.tree).eqls(["vector", -3, 9]);
        expect(components['/graph4'].replacements[0].activeChildren[3].stateValues.coords.tree).eqls(["vector", 3, -9]);
        expect(components['/b/_point1'].stateValues.coords.tree).eqls(["vector", -4, 12]);
        expect(components['/r/_point1'].stateValues.coords.tree).eqls(["vector", 4, -12]);
        expect(components['/copymap1'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -4, 12]);
        expect(components['/copymap2'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 4, -12]);
        expect(components['/copymap1b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", -4, 12]);
        expect(components['/copymap2b'].replacements[1].replacements[0].stateValues.coords.tree).eqls(["vector", 4, -12]);
        expect(components['/graph4'].replacements[0].activeChildren[1].stateValues.coords.tree).eqls(["vector", -4, 12]);
        expect(components['/graph4'].replacements[0].activeChildren[4].stateValues.coords.tree).eqls(["vector", 4, -12]);
        expect(components['/c/_point1'].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/s/_point1'].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/copymap1'].replacements[2].replacements[0].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/copymap2'].replacements[2].replacements[0].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/copymap1b'].replacements[2].replacements[0].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/copymap2b'].replacements[2].replacements[0].stateValues.coords.tree).eqls(["vector", 5, -15]);
        expect(components['/graph4'].replacements[0].activeChildren[2].stateValues.coords.tree).eqls(["vector", -5, 15]);
        expect(components['/graph4'].replacements[0].activeChildren[5].stateValues.coords.tree).eqls(["vector", 5, -15]);
      })
    })


  });

  it('map points to adapt to math', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <p>Number of points: <mathinput name="number"/></p>
    <p>Step size: <mathinput name="step" /></p>
    
    <math>
      <map>
        <template><point>(<copy tname="_source"/>, sin(<copy tname="_source"/>))</point></template>
        <sources>
          <sequence from="2" sequenceLength="$number" step="$step" />
        </sources>
      </map>
    </math>
    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(0);
    })

    cy.get(cesc("#/number") + " textarea").type("10{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(0);
    })

    cy.get(cesc("#/step") + " textarea").type("1{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(10);
      for (let i = 0; i < 10; i++) {
        let j = i + 2;
        expect(components['/_math1'].activeChildren[i].stateValues.value.tree).eqls(["vector", j, ["apply", "sin", j]]);
      }
    })

    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}{backspace}20{enter}", { force: true });

    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(20);
      for (let i = 0; i < 20; i++) {
        let j = i + 2;
        expect(components['/_math1'].activeChildren[i].stateValues.value.tree).eqls(["vector", j, ["apply", "sin", j]]);
      }
    })

    cy.get(cesc("#/step") + " textarea").type("{end}{backspace}0.5{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(20);
      for (let i = 0; i < 20; i++) {
        let j = 2 + i * 0.5;
        expect(components['/_math1'].activeChildren[i].stateValues.value.tree).eqls(["vector", j, ["apply", "sin", j]]);
      }
    })

    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}{backspace}10{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(10);
      for (let i = 0; i < 10; i++) {
        let j = 2 + i * 0.5;
        expect(components['/_math1'].activeChildren[i].stateValues.value.tree).eqls(["vector", j, ["apply", "sin", j]]);
      }
    })

    cy.get(cesc("#/step") + " textarea").type("{end}{backspace}{backspace}{backspace}{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(0);
    })

    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}{backspace}5{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(0);
    })

    cy.get(cesc("#/step") + " textarea").type("-3{enter}", { force: true });
    cy.window().then((win) => {
      let components = Object.assign({}, win.state.components);
      expect(components['/_math1'].activeChildren.length).eq(5);
      for (let i = 0; i < 5; i++) {
        let j = 2 - i * 3;
        expect(components['/_math1'].activeChildren[i].stateValues.value.tree).eqls(["vector", j, ["apply", "sin", j]]);
      }
    })

  });

  it('map inside sources of map', () => {
    cy.window().then((win) => {
      win.postMessage({
        doenetML: `
    <text>a</text>
    <p>Number of points: <mathinput name="number"/></p>
    
    <map name="m1" assignNames="p1,p2,p3">
      <template newNamespace><point name="pt">(<copy tname="_source"/>, 2<copy tname="_source"/>)</point></template>
      <sources>
        <sequence sequenceLength="$number" />
      </sources>
    </map>

    <map name="m2" assignNames="q1,q2,q3">
      <template newNamespace>
        <point name="pt">(<copy tname="_source" prop="x" />^2, <copy tname="_source" prop="y" />^2)</point>
      </template>
      <sources>
        <copy tname="m1" />
      </sources>
    </map>

    <copy tname="p1" assignNames="p1a" />
    <copy tname="p1/pt" assignNames="p1b" />
    <copy tname="p2" assignNames="p2a" />
    <copy tname="p2/pt" assignNames="p2b" />
    <copy tname="p3" assignNames="p3a" />
    <copy tname="p3/pt" assignNames="p3b" />

    <copy tname="q1" assignNames="q1a" />
    <copy tname="q1/pt" assignNames="q1b" />
    <copy tname="q2" assignNames="q2a" />
    <copy tname="q2/pt" assignNames="q2b" />
    <copy tname="q3" assignNames="q3a" />
    <copy tname="q3/pt" assignNames="q3b" />

    `}, "*");
    });

    cy.get(cesc('#/_text1')).should('have.text', 'a');  //wait for window to load

    cy.get(cesc('#/p1/pt')).should('not.exist');
    cy.get(cesc('#/p1a/pt')).should('not.exist');
    cy.get(cesc('#/p1b')).should('not.exist');
    cy.get(cesc('#/p2/pt')).should('not.exist');
    cy.get(cesc('#/p2a/pt')).should('not.exist');
    cy.get(cesc('#/p2b')).should('not.exist');
    cy.get(cesc('#/p3/pt')).should('not.exist');
    cy.get(cesc('#/p3a/pt')).should('not.exist');
    cy.get(cesc('#/p3b')).should('not.exist');

    cy.get(cesc('#/q1/pt')).should('not.exist');
    cy.get(cesc('#/q1a/pt')).should('not.exist');
    cy.get(cesc('#/q1b')).should('not.exist');
    cy.get(cesc('#/q2/pt')).should('not.exist');
    cy.get(cesc('#/q2a/pt')).should('not.exist');
    cy.get(cesc('#/q2b')).should('not.exist');
    cy.get(cesc('#/q3/pt')).should('not.exist');
    cy.get(cesc('#/q3a/pt')).should('not.exist');
    cy.get(cesc('#/q3b')).should('not.exist');



    cy.log('set number to be 2');
    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}2{enter}", { force: true });

    cy.get(cesc('#/p1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })

    cy.get(cesc('#/p2/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })
    cy.get(cesc('#/p2a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })
    cy.get(cesc('#/p2b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })

    cy.get(cesc('#/p3/pt')).should('not.exist');
    cy.get(cesc('#/p3a/pt')).should('not.exist');
    cy.get(cesc('#/p3b')).should('not.exist');

    cy.get(cesc('#/q1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })

    cy.get(cesc('#/q2/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })
    cy.get(cesc('#/q2a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })
    cy.get(cesc('#/q2b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })

    cy.get(cesc('#/q3/pt')).should('not.exist');
    cy.get(cesc('#/q3a/pt')).should('not.exist');
    cy.get(cesc('#/q3b')).should('not.exist');



    cy.log('set number to be 1');
    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}1{enter}", { force: true });

    cy.get(cesc('#/p1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })

    cy.get(cesc('#/p2/pt')).should('not.exist');
    cy.get(cesc('#/p2a/pt')).should('not.exist');
    cy.get(cesc('#/p2b')).should('not.exist');
    cy.get(cesc('#/p3/pt')).should('not.exist');
    cy.get(cesc('#/p3a/pt')).should('not.exist');
    cy.get(cesc('#/p3b')).should('not.exist');

    cy.get(cesc('#/q1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })

    cy.get(cesc('#/q2/pt')).should('not.exist');
    cy.get(cesc('#/q2a/pt')).should('not.exist');
    cy.get(cesc('#/q2b')).should('not.exist');
    cy.get(cesc('#/q3/pt')).should('not.exist');
    cy.get(cesc('#/q3a/pt')).should('not.exist');
    cy.get(cesc('#/q3b')).should('not.exist');



    cy.log('set number to be 3');
    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}3{enter}", { force: true });

    cy.get(cesc('#/p1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })

    cy.get(cesc('#/p2/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })
    cy.get(cesc('#/p2a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })
    cy.get(cesc('#/p2b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(2,4)')
    })

    cy.get(cesc('#/p3/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,6)')
    })
    cy.get(cesc('#/p3a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,6)')
    })
    cy.get(cesc('#/p3b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(3,6)')
    })


    cy.get(cesc('#/q1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })

    cy.get(cesc('#/q2/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })
    cy.get(cesc('#/q2a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })
    cy.get(cesc('#/q2b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(4,16)')
    })

    cy.get(cesc('#/q3/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(9,36)')
    })
    cy.get(cesc('#/q3a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(9,36)')
    })
    cy.get(cesc('#/q3b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(9,36)')
    })


    cy.log('set number back to zero');
    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}0{enter}", { force: true });

    cy.get(cesc('#/p1/pt')).should('not.exist');
    cy.get(cesc('#/p1a/pt')).should('not.exist');
    cy.get(cesc('#/p1b')).should('not.exist');
    cy.get(cesc('#/p2/pt')).should('not.exist');
    cy.get(cesc('#/p2a/pt')).should('not.exist');
    cy.get(cesc('#/p2b')).should('not.exist');
    cy.get(cesc('#/p3/pt')).should('not.exist');
    cy.get(cesc('#/p3a/pt')).should('not.exist');
    cy.get(cesc('#/p3b')).should('not.exist');

    cy.get(cesc('#/q1/pt')).should('not.exist');
    cy.get(cesc('#/q1a/pt')).should('not.exist');
    cy.get(cesc('#/q1b')).should('not.exist');
    cy.get(cesc('#/q2/pt')).should('not.exist');
    cy.get(cesc('#/q2a/pt')).should('not.exist');
    cy.get(cesc('#/q2b')).should('not.exist');
    cy.get(cesc('#/q3/pt')).should('not.exist');
    cy.get(cesc('#/q3a/pt')).should('not.exist');
    cy.get(cesc('#/q3b')).should('not.exist');


    cy.log('set number back to 1');
    cy.get(cesc("#/number") + " textarea").type("{end}{backspace}1{enter}", { force: true });

    cy.get(cesc('#/p1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })
    cy.get(cesc('#/p1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,2)')
    })

    cy.get(cesc('#/p2/pt')).should('not.exist');
    cy.get(cesc('#/p2a/pt')).should('not.exist');
    cy.get(cesc('#/p2b')).should('not.exist');
    cy.get(cesc('#/p3/pt')).should('not.exist');
    cy.get(cesc('#/p3a/pt')).should('not.exist');
    cy.get(cesc('#/p3b')).should('not.exist');

    cy.get(cesc('#/q1/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1a/pt')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })
    cy.get(cesc('#/q1b')).find('.mjx-mrow').eq(0).invoke('text').then((text) => {
      expect(text.trim()).equal('(1,4)')
    })

    cy.get(cesc('#/q2/pt')).should('not.exist');
    cy.get(cesc('#/q2a/pt')).should('not.exist');
    cy.get(cesc('#/q2b')).should('not.exist');
    cy.get(cesc('#/q3/pt')).should('not.exist');
    cy.get(cesc('#/q3a/pt')).should('not.exist');
    cy.get(cesc('#/q3b')).should('not.exist');


  });


});