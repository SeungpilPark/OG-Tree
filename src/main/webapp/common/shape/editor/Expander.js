OG.shape.Expander = function (label) {
    OG.shape.Expander.superclass.call(this, label);

    this.SHAPE_ID = 'OG.shape.Expander';
    this.LABEL_EDITABLE = false;
    this.label = label;
    this.MOVABLE = false;
    this.CONNECTABLE = false;
    this.DELETABLE = false;
};
OG.shape.Expander.prototype = new OG.shape.CircleShape();
OG.shape.Expander.superclass = OG.shape.CircleShape;
OG.shape.Expander.prototype.constructor = OG.shape.Expander;
OG.Expander = OG.shape.Expander;


OG.shape.Expander.prototype.createSubShape = function () {
    this.sub = [];
    if (this.data.data.expand) {
        this.sub.push({
            shape: new OG.EdgeShape(),
            vertices: [['15%', '50%'], ['85%', '50%']],
            style: {
                'arrow-start': 'none',
                'arrow-end': 'none',
                'stroke-width': '1'
            }
        });
    }else{
        this.sub.push({
            shape: new OG.EdgeShape(),
            vertices: [['15%', '50%'], ['85%', '50%']],
            style: {
                'arrow-start': 'none',
                'arrow-end': 'none',
                'stroke-width': '1'
            }
        });
        this.sub.push({
            shape: new OG.EdgeShape(),
            vertices: [['50%', '15%'], ['50%', '85%']],
            style: {
                'arrow-start': 'none',
                'arrow-end': 'none',
                'stroke-width': '1'
            }
        });
    }

    return this.sub;
};