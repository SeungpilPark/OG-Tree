OG.shape.DIDS = function (label) {
    OG.shape.DIDS.superclass.call(this);

    this.SHAPE_ID = 'OG.shape.DIDS';
    this.LABEL_EDITABLE = false;
    this.label = label;
    this.CONNECTABLE = false;
    this.DELETABLE = false;
    this.CHECKED = false;
    this.hasCheckBox = false;
};
OG.shape.DIDS.prototype = new OG.shape.GeomShape();
OG.shape.DIDS.superclass = OG.shape.GeomShape;
OG.shape.DIDS.prototype.constructor = OG.shape.DIDS;
OG.DIDS = OG.shape.DIDS;
OG.shape.DIDS.prototype.createShape = function () {
    if (this.geom) {
        return this.geom;
    }

    this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
    this.geom.style = new OG.geometry.Style({
        'fill': '#fff',
        'fill-opacity': 0,
        'stroke': 'none',
        "label-position": "bottom",
        "text-anchor": "middle",
        "vertical-align": "top"
    });

    return this.geom;
};

/**
 * 셀렉트 라벨 더하기
 */
OG.shape.DIDS.prototype.addSelectLabel = function () {
    if (this.data && this.data.selected) {
        this.sub.push({
            shape: new OG.SLabel(),
            width: '12px',
            height: '14px',
            right: '1px',
            bottom: '5px'
        })
    }
};

OG.shape.DIDS.prototype.addCheckBox = function () {
    //락일 경우 체크박스 표현 안함.
    if (this.data.data.extData['c_locked_by_id'] && this.data.data.extData['c_locked_by_id'].length > 0) {
        return;
    }
    this.hasCheckBox = true;
    if (this instanceof OG.shape.Ed) {
        this.sub.push({
            shape: new OG.RectangleShape(),
            width: '12px',
            height: '12px',
            right: '-3px',
            bottom: '3px',
            style: {
                'fill': '#fff',
                'fill-opacity': '1',
                'stroke': 'black',
                'stroke-width': '1',
                'r': '2'
            }
        });
        if (this.CHECKED) {
            this.sub.push({
                shape: new OG.ImageShape('common/shape/editor/check-image.png'),
                width: '12px',
                height: '12px',
                right: '-3px',
                bottom: '3px'
            });
        }
    } else {
        this.sub.push({
            shape: new OG.RectangleShape(),
            width: '12px',
            height: '12px',
            right: '1px',
            bottom: '6px',
            style: {
                'fill': '#fff',
                'fill-opacity': '1',
                'stroke': 'black',
                'stroke-width': '1',
                'r': '2'
            }
        });
        if (this.CHECKED) {
            this.sub.push({
                shape: new OG.ImageShape('common/shape/editor/check-image.png'),
                width: '12px',
                height: '12px',
                right: '1px',
                bottom: '6px'
            });
        }
    }
};

/**
 * c_team,c_workflow 표현
 */
OG.shape.DIDS.prototype.addTopLabel = function () {
    var maxLength = 12;
    var c_team = this.data.data.extData['c_team'];
    var c_workflow = this.data.data.extData['c_workflow'];
    if (c_team && c_team.length > 0) {
        if (c_team.length > maxLength) {
            c_team = c_team.substring(0, maxLength) + '..';
        }
        this.sub.push({
            shape: new OG.TextShape(c_team),
            width: '300%',
            height: '10px',
            align: 'center',
            top: '-5px',
            style: {
                'font-size': '7px',
                'font-color': '#8d8d8d'
            }
        });
    }
    if (c_workflow && c_workflow.length > 0) {
        if (c_workflow.length > maxLength) {
            c_workflow = c_workflow.substring(0, maxLength) + '..';
        }
        this.sub.push({
            shape: new OG.TextShape(c_workflow),
            width: '300%',
            height: '10px',
            align: 'center',
            top: '-12px',
            style: {
                'font-size': '7px',
                'font-color': '#8d8d8d'
            }
        });
    }
};

OG.shape.DIDS.prototype.addSecret = function () {
    if (this.data.data.extData['c_securitylevel'] == 'Secret') {
        this.sub.push({
            shape: new OG.ImageShape('common/shape/editor/secret.svg'),
            width: '60px',
            height: '60px',
            align: 'center',
            'vertical-align': 'middle',
            style: {}
        });
    }
};

OG.shape.DIDS.prototype.addLock = function () {
    if (this.data.data.extData['c_locked_by_id'] && this.data.data.extData['c_locked_by_id'].length > 0) {
        this.sub.push({
            shape: new OG.ImageShape('common/shape/editor/Lock.svg'),
            width: '15px',
            height: '15px',
            //align: 'center',
            left: '0px',
            'vertical-align': 'top',
            style: {}
        });
    }
};


OG.shape.DIDS.prototype.createSubShape = function () {
    this.sub = [];
    return this.sub;
};

OG.shape.DIDS.prototype.onDrawShape = function () {
    var me = this;
    //체크 박스 이벤트
    $(me.currentElement).click(function (event) {
        if (me.hasCheckBox) {
            if (me.CHECKED) {
                me.CHECKED = false;
            } else {
                me.CHECKED = true;
            }
            me.currentCanvas.getRenderer().redrawShape(me.currentElement);
        }
    });
};