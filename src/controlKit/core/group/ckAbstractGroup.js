ControlKit.AbstractGroup = function(parent,params)
{
    ControlKit.EventDispatcher.apply(this,arguments);

    this._parent = parent;

    /*---------------------------------------------------------------------------------*/

    var rootNode = this._rootNode = new ControlKit.Node(ControlKit.NodeType.LIST_ITEM),
        wrapNode = this._wrapNode = new ControlKit.Node(ControlKit.NodeType.DIV),
        listNode = this._listNode = new ControlKit.Node(ControlKit.NodeType.LIST);

    /*---------------------------------------------------------------------------------*/

    this._parent.getList().addChild(rootNode);

    /*---------------------------------------------------------------------------------*/

    this._scrollV   = 0;
    this._maxHeight = null;
    this._hidden    = false;

    /*---------------------------------------------------------------------------------*/


};

ControlKit.AbstractGroup.prototype = Object.create(ControlKit.EventDispatcher.prototype);

//Override in subclass
ControlKit.AbstractGroup.prototype.set = function(label,params){};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype._onHeadMouseDown  = function(){};
ControlKit.AbstractGroup.prototype._updateVisibility = function(){};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.hide         = function() {this._hidden = true;  this._updateVisibility();};
ControlKit.AbstractGroup.prototype.show         = function() {this._hidden = false; this._updateVisibility();};
ControlKit.AbstractGroup.prototype.isHidden     = function() {return this._hidden;};
ControlKit.AbstractGroup.prototype.getMaxHeight = function() {return this._maxHeight;};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.onSelectDragStart = function(e){this.scrollTo(this._scrollV);};
ControlKit.AbstractGroup.prototype.onSelectDrag      = function(e){this.scrollTo(this._scrollV);};
ControlKit.AbstractGroup.prototype.onSelectDragEnd   = function(e){this.scrollTo(this._scrollV);};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.onComponentAdded = function()
{
    if(!this._maxHeight)return;
    this._scrollbar._update();
};

ControlKit.AbstractGroup.prototype.scrollTo = function(y)
{
    return;
    var maxHeight = this._maxHeight;
    if(!maxHeight)return;

    var list     = this._listNode,
        listWrap = list.getParent(),
        maxV     = list.getHeight() - maxHeight;

    this._scrollV = Math.max(0,Math.min(y,maxV));
    listWrap.setPositionY(this._scrollV);

};

/*---------------------------------------------------------------------------------*/

ControlKit.AbstractGroup.prototype.getList      = function(){return this._listNode;};