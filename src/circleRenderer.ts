///<reference path="reference.ts" />

module Plottable {
  export class CircleRenderer extends XYRenderer {
    private rAccessor: IAccessor;
    private static defaultRAccessor = (d: any) => 3;

    /**
     * Creates a CircleRenderer.
     *
     * @constructor
     * @param {IDataset} dataset The dataset to render.
     * @param {QuantitiveScale} xScale The x scale to use.
     * @param {QuantitiveScale} yScale The y scale to use.
     * @param {IAccessor} [xAccessor] A function for extracting x values from the data.
     * @param {IAccessor} [yAccessor] A function for extracting y values from the data.
     * @param {IAccessor} [rAccessor] A function for extracting radius values from the data.
     */
    constructor(dataset: IDataset, xScale: QuantitiveScale, yScale: QuantitiveScale,
                xAccessor?: IAccessor, yAccessor?: IAccessor, rAccessor?: IAccessor) {
      super(dataset, xScale, yScale, xAccessor, yAccessor);
      this.rAccessor = (rAccessor != null) ? rAccessor : CircleRenderer.defaultRAccessor;
      this.classed("circle-renderer", true);
    }

    public _paint() {
      super._paint();
      var cx = (d: any, i: number) => this.xScale.scale(this._getAppliedAccessor(this._xAccessor)(d, i));
      var cy = (d: any, i: number) => this.yScale.scale(this._getAppliedAccessor(this._yAccessor)(d, i));
      var r  = this._getAppliedAccessor(this.rAccessor);
      var color = this._getAppliedAccessor(this.colorAccessor);
      this.dataSelection = this.renderArea.selectAll("circle").data(this._data);
      this.dataSelection.enter().append("circle");
      this.dataSelection.attr("cx", cx)
                        .attr("cy", cy)
                        .attr("r", r)
                        .attr("fill", color);
      this.dataSelection.exit().remove();
    }
  }
}
