import React from 'react';
import DoenetRenderer from './DoenetRenderer';

export default class Point extends DoenetRenderer {
  constructor(props) {
    super(props)

    if (props.board) {
      this.createGraphicalObject();
    }
  }

  createGraphicalObject() {

    //things to be passed to JSXGraph as attributes
    var jsxPointAttributes = {
      name: this.doenetSvData.label,
      visible: !this.doenetSvData.hide,
      withLabel: this.doenetSvData.showLabel && this.doenetSvData.label !== "",
      fixed: this.doenetSvData.draggable !== true,
      layer: this.doenetSvData.layer,
      fillColor: this.doenetSvData.selectedStyle.markerColor,
      strokeColor: this.doenetSvData.selectedStyle.markerColor,
      // highlightFillColor: this.doenetSvData.selectedStyle.markerColor,
      // highlightStrokeColor: this.doenetSvData.selectedStyle.markerColor,
      size: this.doenetSvData.selectedStyle.markerSize,
      face: normalizeStyle(this.doenetSvData.selectedStyle.markerStyle),
    };

    if (this.doenetSvData.draggable) {
      jsxPointAttributes.highlightFillColor = "#EEEEEE";
      jsxPointAttributes.highlightStrokeColor = "#C3D9FF";
      jsxPointAttributes.showInfoBox = true;
    } else {
      jsxPointAttributes.highlightFillColor = this.doenetSvData.selectedStyle.markerColor;
      jsxPointAttributes.highlightStrokeColor = this.doenetSvData.selectedStyle.markerColor;
      jsxPointAttributes.showInfoBox = false;
    }

    let coords = [this.doenetSvData.numericalXs[0], this.doenetSvData.numericalXs[1]];

    if (!Number.isFinite(coords[0])) {
      coords[0] = 0;
      jsxPointAttributes['visible'] = false;
    }
    if (!Number.isFinite(coords[1])) {
      coords[1] = 0;
      jsxPointAttributes['visible'] = false;
    }

    this.pointJXG = this.props.board.create('point', coords, jsxPointAttributes);

    this.pointJXG.on('drag', function () {
      //board.suspendUpdate();
      this.onDragHandler();
      //board.unsuspendUpdate();
    }.bind(this));

    this.previousWithLabel = this.doenetSvData.showLabel && this.doenetSvData.label !== "";

    return this.pointJXG;

  }

  deleteGraphicalObject() {
    this.props.board.removeObject(this.pointJXG);
    delete this.pointJXG;
  }

  // update({ x, y, changeInitiatedWithPoint, label, visible, draggable, showlabel }) {
  update() {

    console.log('now calling update in point with no data')

    // even points that are hidden have renderers
    // (or this could be called before createGraphicalObject
    // for dynamically added components)
    // so this could be called even for points that don't have a JXG point created
    if (this.pointJXG === undefined) {
      return;
    }

    let x = this.doenetSvData.numericalXs[0];
    let y = this.doenetSvData.numericalXs[1];

    this.pointJXG.coords.setCoordinates(JXG.COORDS_BY_USER, [x,y]);

    let visible = !this.doenetSvData.hide;

    if (Number.isFinite(x) && Number.isFinite(y)) {
      let actuallyChangedVisibility = this.pointJXG.visProp["visible"] !== visible;
      this.pointJXG.visProp["visible"] = visible;
      this.pointJXG.visPropCalc["visible"] = visible;

      if (actuallyChangedVisibility) {
        // this function is incredibly slow, so don't run it if not necessary
        // TODO: figure out how to make label disappear right away so don't need to run this function
        this.pointJXG.setAttribute({ visible: visible })
      }
    }
    else {
      this.pointJXG.visProp["visible"] = false;
      this.pointJXG.visPropCalc["visible"] = false;
      // this.pointJXG.setAttribute({visible: false})
    }

    if (this.doenetSvData.draggable) {
      this.pointJXG.visProp.highlightfillcolor = "#EEEEEE";
      this.pointJXG.visProp.highlightstrokecolor = "#C3D9FF";
      this.pointJXG.visProp.showinfobox = true;
      this.pointJXG.visProp.fixed = false;
    } else {
      this.pointJXG.visProp.highlightfillcolor = this.doenetSvData.selectedStyle.markerColor;
      this.pointJXG.visProp.highlightstrokecolor = this.doenetSvData.selectedStyle.markerColor;
      this.pointJXG.visProp.showinfobox = false;
      this.pointJXG.visProp.fixed = true;
    }


    // TODO: determine if change initiated with point

    // if (changeInitiatedWithPoint) {
      this.props.board.updateInfobox(this.pointJXG);
    // }

    this.pointJXG.name = this.doenetSvData.label;
    // this.pointJXG.visProp.withlabel = this.showlabel && this.label !== "";

    let withlabel = this.doenetSvData.showLabel && this.doenetSvData.label !== "";
    if (withlabel != this.previousWithLabel) {
      this.pointJXG.setAttribute({ withlabel: withlabel });
      this.previousWithLabel = withlabel;
    }

    this.pointJXG.needsUpdate = true;
    this.pointJXG.update();
    if (this.pointJXG.hasLabel) {
      this.pointJXG.label.needsUpdate = true;
      this.pointJXG.label.update();
    }
    this.props.board.updateRenderer();


  }

  onDragHandler() {
    this.props.requestUpdate({
      updateType: "updateValue",
      updateInstructions: [{
        componentName: this.componentName,
        stateVariable: "xs",
        value: [this.pointJXG.X(), this.pointJXG.Y()],
      }]
    })
  }

  render() {
    return null;
  }
}

function normalizeStyle(style) {
  if (style === "triangle") {
    return "triangleup";
  } else {
    return style;
  }
}