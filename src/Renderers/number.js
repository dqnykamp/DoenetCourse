import React from 'react';
import DoenetRenderer from './DoenetRenderer';

export default class Number extends DoenetRenderer {

  componentDidMount() {
    if (this.doenetSvData.renderAsMath) {
      window.MathJax.Hub.Config({ showProcessingMessages: false, "fast-preview": { disabled: true } });
      window.MathJax.Hub.processSectionDelay = 0;
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "#" + this.componentName]);
    }
  }

  componentDidUpdate() {
    if (this.doenetSvData.renderAsMath) {
      window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, "#" + this.componentName]);
    }
  }


  render() {

    if (this.doenetSvData.hide) {
      return null;
    }

    let number = this.doenetSvData.value;
    if (this.doenetSvData.renderAsMath) {
      number = "\\(" + number + "\\)"
    }
    return <><a name={this.componentName} /><span id={this.componentName}>{number}</span></>
  }
}   