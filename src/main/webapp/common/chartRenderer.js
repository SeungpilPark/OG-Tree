/**
 * Open graph Tree Library (OG-Tree)
 *
 * @class
 * @requires OG.*
 *
 * @param {String} container Dom Element Id
 * @param {ChartViewController} viewController
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ChartRenderer = function (container, viewController) {
    this.viewController = viewController;
    this._CONFIG = {
        /**
         * 캔버스 높이
         */
        CONTAINER_HEIGHT: 800,

        ACTIVITY_WIDTH: 80,
        ACTIVITY_HEIGHT: 38,
        ARRANGEMENT: 'horizontal',
        ARRANGEMENT_MARGIN: 10
    };

    this._CONTAINER = $('#' + container);
    this._CONTAINER.css({
        width: '100%',
        height: this._CONFIG.CONTAINER_HEIGHT + 'px',
        border: '1px solid #555'
    });
    // Canvas
    this.canvas = new OG.Canvas(container, [this._CONTAINER.width(), this._CONFIG.CONTAINER_HEIGHT], 'white');

    this.canvas.initConfig({
        selectable: true,
        dragSelectable: true,
        movable: true,
        resizable: true,
        connectable: true,
        selfConnectable: true,
        connectCloneable: true,
        connectRequired: true,
        labelEditable: true,
        groupDropable: true,
        collapsible: true,
        enableHotKey: false,
        enableContextMenu: true,
        useSlider: false,
        stickGuide: true,
        checkBridgeEdge: true,
        autoHistory: false
    });
    this.canvas._CONFIG.DEFAULT_STYLE.EDGE["edge-type"] = "plain";
    this.canvas._CONFIG.GUIDE_CONTROL_LINE_NUM = 1;
    this.canvas._CONFIG.DRAG_PAGE_MOVABLE = true;
    this.canvas._CONFIG.FOCUS_CANVAS_ONSELECT = false;
    //ENABLE_HOTKEY

    this._RENDERER = this.canvas._RENDERER;
    this._HANDLER = this.canvas._HANDLER;
    this.existJson = null;
    this.existActivitySize = {};
};
ChartRenderer.prototype = {

    /**
     * 캔버스를 초기 빌드한다.  최초 1번만 실행된다.
     */
    init: function () {
        var me = this;
        me.bindEvent();
    },
    /**
     * Scale 을 반환한다. (리얼 사이즈 : Scale = 1)
     *
     * @return {Number} 스케일값
     */
    getScale: function () {
        return this.canvas.getScale();
    },

    /**
     * Scale 을 설정한다. (기본 사이즈 : Scale = 1)
     *
     * @param {Number} scale 스케일값
     */
    setScale: function (scale) {
        var me = this;
        var preSize = me.canvas.getCanvasSize();
        var preWidth = preSize[0];
        var preHeight = preSize[1];
        var preScrollLeft = me._CONTAINER.scrollLeft();
        var preScrollTop = me._CONTAINER.scrollTop();
        var preCenterX = preScrollLeft + (me._CONTAINER.width() / 2);
        var preCenterY = preScrollTop + (me._CONTAINER.height() / 2);

        this.canvas.setScale(scale);

        var cuSize = me.canvas.getCanvasSize();
        var cuWidth = cuSize[0];
        var cuHeight = cuSize[1];
        var cuScrollLeft = me._CONTAINER.scrollLeft();
        var cuScrollTop = me._CONTAINER.scrollTop();

        var cuCenterX = preCenterX * (preWidth / cuWidth);
        var cuCenterY = preCenterY * (preHeight / cuHeight);

        var moveX = preCenterX - cuCenterX;
        var moveY = preCenterY - cuCenterY;
        me._CONTAINER.scrollLeft(cuScrollLeft + moveX);
        me._CONTAINER.scrollTop(cuScrollTop + moveY);

    },

    //========================================================================//
    //=============================Data apis==================================//
    //========================================================================//
    /**
     * Aras 데이터를 테이블 데이터로 변환한다.
     * @param chartData
     */
    convertData: function (chartData) {

    },

    getColumnByField: function (columns, field) {
        for (var i = 0, leni = columns.length; i < leni; i++) {
            if (columns[i].data == field) {
                return columns[i];
            }
        }
    },

    getColorFromState: function (state) {
        var me = this;
        var selectedColor;
        var chartJson = me.viewController.getChartStateJson();
        if (chartJson) {
            for (var i = 0; i < chartJson.length; i++) {
                var name = chartJson[i]['name'];
                var color = chartJson[i]['color'];
                if (state == name) {
                    selectedColor = color;
                }
            }
        }
        return selectedColor;
    },

    getDataTableRenderer: function () {
        var me = this;
        var tableRenderer = function (value) {
            var result = {
                contents: [],
                contentsPosition: {
                    /**
                     * 컨텐츠 배열
                     */
                    arrangement: me._CONFIG.ARRANGEMENT, //수평 || vertical 수직

                    /**
                     * 컨텐츠 배열 마진 (number,px,%)
                     */
                    arrangementMargin: me._CONFIG.ARRANGEMENT_MARGIN + '',
                    /**
                     * 좌측으로 부터 위치값. (number,px,%)
                     */
                    left: '0',
                    /**
                     * 상단으로 부터 위치값. (number,px,%)
                     */
                    top: '0',
                    /**
                     * 우측으로 부터 위치값. (number,px,%)
                     */
                    right: '0',
                    /**
                     * 하단으로 부터 위치값. (number,px,%)
                     */
                    bottom: '0',
                    /**
                     * 가로 정렬 (left,center,right).
                     */
                    align: 'center',
                    /**
                     * 세로 정렬 (top,middle,bottom)
                     */
                    'vertical-align': 'middle'
                }
            };
            if (!value) {
                return result;
            }
            if (value && typeof value != 'object') {
                return result;
            }

            for (var i = 0; i < value.length; i++) {
                var contentData = value[i];
                var shape = new OG.A_Task(contentData['cur_wfa_name']);
                var color = me.getColorFromState(contentData['cur_state']);
                color = color ? color : '#fff';
                shape.data = JSON.parse(JSON.stringify(contentData));
                shape.LABEL_EDITABLE = false;
                result.contents.push({
                    shape: shape,
                    width: contentData.width ? contentData.width + 'px' : me._CONFIG.ACTIVITY_WIDTH + 'px',
                    height: contentData.height ? contentData.height + 'px' : me._CONFIG.ACTIVITY_HEIGHT + 'px',
                    style: {
                        'fill': color,
                        'fill-opacity': 1,
                        'font-size': 9
                    }
                })
            }
            return result;
        };
        return tableRenderer;
    },

    /**
     * 팀에 해당하는 data row 를 반환한다.
     * @param team
     * @param rows
     * @return {*}
     */
    getDataRowByTeam: function (team, rows) {
        var rowByTeam;
        $.each(rows, function (r, row) {
            if (row.team == team) {
                rowByTeam = row;
            }
        });
        return rowByTeam;
    },

    /**
     * 액티비티에 해당하는 데이터 정보를 반환한다.
     * @param activity
     * @param rows
     * @return {null}
     */
    getExistActivityFromRowsData: function (activity, rows) {
        if (!activity || !rows || !rows.length) {
            return null;
        }
        var selected;
        $.each(rows, function (i, row) {
            var activityId = activity['tot_wfa'];
            for (var column in row) {
                var values = row[column];
                if(typeof values == 'object'){
                    $.each(values, function(v, value){
                        if (activityId == value['tot_wfa']) {
                            selected = {
                                data: value,
                                column: column,
                                dataIndex: i
                            }
                        }
                    })
                }
            }
        });
        return selected;
    },

    /**
     * 액티비티 아이디로 엘리먼트를 찾는다.
     * @param activityId
     * @return {*}
     */
    getElementByActivityId: function (activityId) {
        var me = this;
        var allShapes = me.canvas.getAllShapes();
        var selected;
        $.each(allShapes, function (i, element) {
            if (element.shape.data && element.shape.data['tot_wfa'] == activityId) {
                selected = element;
            }
        });
        return selected;
    },

    /**
     * 화면의 Edge 를 연결 해제하고, 재연결 정보를 저장한다.
     */
    keepEdges: function () {
        var me = this;
        var allEdges = me.canvas.getAllEdges();
        var edge, fromShape, toShape, fromXY, toXY, connections = [], connection;
        $.each(allEdges, function (i, edge) {
            var fromTerminal = $(edge).attr("_from");
            var toTerminal = $(edge).attr("_to");
            var direction;
            connection = {
                edgeId: edge.id
            };

            if (fromTerminal) {
                fromShape = me.canvas.getRenderer()._getShapeFromTerminal(fromTerminal);
                fromXY = me.canvas.getRenderer()._getPositionFromTerminal(fromTerminal);
                if (fromShape && fromShape.shape.data) {
                    me.canvas.getRenderer().disconnectOneWay(edge, 'from');
                    connection.from = fromTerminal;
                    connection.fromActivity = fromShape.shape.data['tot_wfa'];
                }
            }

            if (toTerminal) {
                toShape = me.canvas.getRenderer()._getShapeFromTerminal(toTerminal);
                toXY = me.canvas.getRenderer()._getPositionFromTerminal(toTerminal);
                if (toShape && toShape.shape.data) {
                    me.canvas.getRenderer().disconnectOneWay(edge, 'to');
                    connection.to = toTerminal;
                    connection.toActivity = toShape.shape.data['tot_wfa'];
                }
            }

            connections.push(connection);
        });
        return connections;
    },

    //========================================================================//
    //===========================Render apis==================================//
    //========================================================================//
    /**
     * 데이터를 기반으로 화면에 렌더링한다.
     * @param chartData
     * @param existJson
     */
    render: function (chartData, existJson) {
        console.log('debug');
        var me = this;
        var dataTable;
        var existTableData;

        me.existJson = null;
        me.canvas.clear();

        //기존 json 정보가 있을 경우 로드 한 후, 데이터 테이블을 얻어온다.
        if (existJson) {
            me.existJson = existJson;
            me.canvas.loadJSON(existJson);
            var element = me.canvas.getElementsByShapeId('OG.shape.component.DataTable');
            if (element && element.length) {
                dataTable = element[0].shape;
                existTableData = dataTable.data.tableData;

                //Edge 들의 연결을 모두 해제하고, from,to 의 액티비티 연결정보를 저장하고있는다.
                me.connections = me.keepEdges();

                //기존 A_Task 를 모두 삭제한다.
                me.existActivitySize = {};
                var existActivities = me.canvas.getElementsByShapeId('OG.shape.bpmn.A_Task');
                $.each(existActivities, function (i, activity) {
                    if (activity.shape.data && activity.shape.data['tot_wfa']) {
                        var id = activity.shape.data['tot_wfa'];
                        me.existActivitySize[id] = {
                            width: me.canvas.getBoundary(activity).getWidth(),
                            height: me.canvas.getBoundary(activity).getHeight()
                        }
                    }
                    me.canvas.removeShape(activity);
                });

            }
        } else {
            dataTable = new OG.DataTable();
        }

        dataTable.MOVABLE = false;

        //옵션데이터
        var options = {
            axis: 'X',
            pageLength: 100,
            currentPage: 1,
            columnHeight: 30,
            columnWidth: 140,
            columnStyle: {
                'font-color': '#fff',
                'fill': '#abaaad',
                'fill-opacity': 1,
                'stroke': 'none',
                'border-bottom': {
                    'stroke': '#616063',
                    'stroke-width': '4'
                }
            },
            rowDividingLine: {
                'stroke': '#abaaad',
                'stroke-width': '1'
            },
            cellHeight: 50,
            cellStyle: {
                'fill': '#fff',
                'fill-opacity': 0,
                'font-size': 8,
                'border-right': {
                    'stroke': '#ebeaed',
                    'stroke-width': '1'
                }
            },
            columns: [
                {
                    data: 'team',
                    title: '주요 Activity\n일정(D day)',
                    defaultContent: '',
                    columnWidth: 100,
                    columnStyle: {
                        'border-left': {
                            'stroke': '#abaaad',
                            'stroke-width': '1'
                        },
                        'border-right': {
                            'stroke': '#616063',
                            'stroke-width': '3'
                        }
                    },
                    cellStyle: {
                        'border-right': {
                            'stroke': '#616063',
                            'stroke-width': '3'
                        },
                        'border-left': {
                            'stroke': '#abaaad',
                            'stroke-width': '1'
                        }
                    }
                }
            ]
        };

        var headers = chartData.headers;
        var rows = chartData.rows;
        var activities = chartData['activities'];

        for (var i = 0; i < headers.length; i++) {
            var title = headers[i]['keyed_name'] + '\n' + headers[i]['_end_date'];
            var column = {
                data: headers[i]['keyed_name'],
                title: title,
                defaultContent: '',
                renderer: me.getDataTableRenderer()
            };
            if (headers.length - 1 == i) {
                column['columnStyle'] = {
                    'border-right': {
                        'stroke': '#abaaad',
                        'stroke-width': '1'
                    }
                }
            }
            options.columns.push(column);
        }

        var rowData = [];
        for (var i = 0; i < rows.length; i++) {
            var row = {};
            //제일 앞 칼럼은 팀이름 데이터
            row['team'] = rows[i]['_eng_func_code'];
            rowData.push(row);
        }

        $.each(activities, function (a, activity) {
            var rowByTeam = me.getDataRowByTeam(activity['cur_eng_func_code'], rowData);

            var column;

            //기존 데이터가 있다면, 기존 액티비티가 들어있는 칼럼을 찾는다.
            if (existTableData) {
                var existActivityInfo = me.getExistActivityFromRowsData(activity, existTableData);
                if (existActivityInfo) {
                    column = existActivityInfo.column;
                }
            }

            //기존 데이터의 칼럼을 찾지 못했다면, 신규 액티비티이며, 칼럼은 옵션칼럼 의 1번 인덱스로 잡는다.
            if (!column) {
                column = options.columns[1].data;
            }

            //해당 팀의 칼럼에 액티비티를 추가한다.
            if (!rowByTeam[column]) {
                rowByTeam[column] = []
            }

            //existActivitySize 에서 해당 액티비티의 삭제 전 사이즈를 구한다.
            var beforeSize = me.existActivitySize[activity['tot_wfa']];
            if (beforeSize) {
                activity['width'] = beforeSize['width'];
                activity['height'] = beforeSize['height'];
            }

            rowByTeam[column].push(activity);
        });

        //기존 데이터가 없다면, 각 셀 데이터의 컨텐트 개수에 따라 옵션의 칼럼 너비를 조정해주도록 한다.
        if (!existTableData && me._CONFIG.ARRANGEMENT == 'horizontal') {
            $.each(rowData, function (r, row) {
                for (var column in row) {

                    var columnOption = me.getColumnByField(options.columns, column);
                    var columnWidth = columnOption.columnWidth ? columnOption.columnWidth : options.columnWidth;
                    //셀 데이터가 어레이 타입일 경우 총 셀 너비 계산.
                    if (typeof row[column] == 'object') {
                        var length = row[column].length;
                        var totalWidth = (me._CONFIG.ACTIVITY_WIDTH + me._CONFIG.ARRANGEMENT_MARGIN) * length;
                        if (totalWidth > columnWidth) {
                            columnOption.columnWidth = totalWidth + 30
                        }
                    }
                }
            })
        }


        dataTable.setOptions(options);
        dataTable.setData(rowData);
        if (!existJson) {
            this.canvas.drawShape([50, 50], dataTable, [100, 100], {});
        }
        dataTable.draw();

        //연결 정보를 이어나간다.
        if (existJson && me.connections && me.connections.length) {
            $.each(me.connections, function (i, connection) {
                var edgeId = connection.edgeId;
                var fromTerminal = connection.from;
                var fromActivity = connection.fromActivity;
                var toTerminal = connection.to;
                var toActivity = connection.toActivity;

                var edge = me.canvas.getElementById(edgeId);
                if (!edge) {
                    return;
                }

                var fromShape, toShape;
                if (fromActivity) {
                    fromShape = me.getElementByActivityId(fromActivity);
                }
                if (toActivity) {
                    toShape = me.getElementByActivityId(toActivity);
                }
                //둘 중 하나라도 없다면 삭제한다.
                if (!fromShape || !toShape) {
                    me.canvas.removeShape(edge);
                    return;
                }

                var beforeFromId = fromTerminal.substring(0, fromTerminal.indexOf(OG.Constants.TERMINAL));
                var fromReplace = fromTerminal.replace(beforeFromId, fromShape.id);

                var beforeToId = toTerminal.substring(0, toTerminal.indexOf(OG.Constants.TERMINAL));
                var toReplace = toTerminal.replace(beforeToId, toShape.id);
                me.canvas.getRenderer().connect(fromReplace, toReplace, edge, null, null, true);
            });
            me.connections = [];
        }
    }

    //========================================================================//
    //=========================Start Storage Query============================//
    //========================================================================//


    //========================================================================//
    //=================================Utils==================================//
    //========================================================================//
    ,
    /**
     * 주어진 스트링이 빈값인지를 확인한다.
     * @param value String
     * @returns {boolean} 빈 값 여부
     */
    emptyString: function (value) {
        if (typeof value == 'undefined') {
            return true;
        }
        if (!value) {
            return true;
        }
        if (
            (value.length == 0)
            ||
            (value == "")
            ||
            (value.replace(/\s/g, "") == "")
            ||
            (!/[^\s]/.test(value))
            ||
            (/^\s*$/.test(value))
        ) {
            return true;
        }
        return false;
    }
    ,
    /**
     * 좌표값을 포함하는 가장 앞단의 엘리먼트를 반환한다.
     * @param point [x,y] 좌표
     * @returns {Element} OG-Tree Dom Element
     */
    getElementByPoint: function (point) {
        var me = this;
        var elements = me._RENDERER.getAllNotEdges();
        var element;
        for (var i = 0, leni = elements.length; i < leni; i++) {
            if (elements[i].shape.geom.getBoundary().isContains(point)) {
                element = elements[i];
            }
        }
        return element;
    }
    ,
    /**
     * 무작위 랜덤 아이디 생성
     * @returns {string} 랜덤 아이디
     */
    uuid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
    ,

    //========================================================================//
    //=================================Event==================================//
    //========================================================================//
    /**
     * 캔버스가 처음 렌더링 될 시 필요한 이벤트들을 바인딩한다.
     */
    bindEvent: function () {
        var me = this;
    }

};
ChartRenderer.prototype.constructor = ChartRenderer;