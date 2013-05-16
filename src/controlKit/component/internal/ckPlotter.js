ControlKit.Plotter = function(parent,object,value,label,params)
{
    ControlKit.CanvasComponent.apply(this,arguments);

    /*---------------------------------------------------------------------------------*/

    params            = params            || {};
    params.gridRes    = params.gridRes    || [10,10];
    params.lineWidth  = params.lineWidth  || 1;
    params.lineColor  = params.lineColor  || [255,255,255];

    /*---------------------------------------------------------------------------------*/

    this._gridRes   = params.gridRes;
    this._lineWidth = params.lineWidth;
    this._lineColor = params.lineColor;
};

ControlKit.Plotter.prototype = Object.create(ControlKit.CanvasComponent.prototype);

ControlKit.Plotter.prototype._drawGrid = function()
{
    var c = this._canvas;

    var gridResX     = this._gridRes[0],
        gridResY     = this._gridRes[1],
        canvasWidth  = c.width,
        canvasHeight = c.height;


    var spacingGridX = canvasWidth  / gridResX,
        spacingGridY = canvasHeight / gridResY;

    var temp;
    var i = -1;

    c.stroke(26,29,31);

    while(++i < gridResX)
    {
        temp = Math.round(spacingGridX + spacingGridX * i);
        c.line(0,temp,canvasWidth,temp);
    }
    i = -1;
    while(++i < gridResY)
    {
        temp = Math.round(spacingGridY + spacingGridY * i);
        c.line(temp,0,temp,canvasHeight);
    }
};