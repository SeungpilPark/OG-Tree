/**
 * Open graph Chart Library (OG-Tree)
 *
 * @class
 * @requires OG.*
 *
 * @param {String} container Dom Element Id
 * @param {ChartViewController} viewController
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ChartRenderer = function (container, viewController, editMode) {
    this.editMode = editMode;
    this.viewController = viewController;
    this._CONFIG = {
        /**
         * 캔버스 높이
         */
        CONTAINER_HEIGHT: 800,
        CONTAINER_MIN_HEIGHT: 800,
        CONTAINER_MAX_HEIGHT: 1800,

        ACTIVITY_WIDTH: 80,
        ACTIVITY_HEIGHT: 38,
        ARRANGEMENT: 'horizontal',
        ARRANGEMENT_MARGIN: 24,


        /**
         * 커스텀 컬럼 식별자
         */
        CUSTOM_COL_PREFIX: 'customColPrefix',

        /**
         * 라벨 최대 글자 크기
         */
        LABEL_MAX_LENGTH: 25
    };

    this._CONTAINER = $('#' + container);
    this._CONTAINER.css({
        width: '100%',
        height: this._CONFIG.CONTAINER_HEIGHT + 'px',
        border: '1px solid #555'
    });
    // Canvas
    this.canvas = new OG.Canvas(container, [this._CONTAINER.width(), this._CONFIG.CONTAINER_HEIGHT], 'white');

    if (this.editMode) {
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
    } else {
        this.canvas.initConfig({
            selectable: true,
            dragSelectable: true,
            movable: false,
            resizable: false,
            connectable: false,
            selfConnectable: false,
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
        this.canvas._CONFIG.DELETABLE = false;
    }
    this.canvas._CONFIG.DEFAULT_STYLE.EDGE = {
        stroke: "black",
        fill: "none",
        "fill-opacity": 0,
        "stroke-width": 1,
        "stroke-opacity": 1,
        "edge-type": "plain",
        "arrow-start": "none",
        "arrow-end": "block",
        "stroke-dasharray": "",
        "label-position": "center",
        "stroke-linejoin": "round",
        cursor: "pointer"
    };
    this.canvas._CONFIG.GUIDE_CONTROL_LINE_NUM = 1;
    this.canvas._CONFIG.DRAG_PAGE_MOVABLE = true;
    this.canvas._CONFIG.FOCUS_CANVAS_ONSELECT = false;
    this.canvas._CONFIG.SPOT_ON_SELECT = true;
    this.canvas._CONFIG.STICK_GUIDE = false;
    this.canvas._CONFIG.AUTOMATIC_GUIDANCE = false;

    this._RENDERER = this.canvas._RENDERER;
    this._HANDLER = this.canvas._HANDLER;
    this.existJson = null;
    this.loadElements = null;
    this.existActivitySize = {};


    /**
     * 최종 데이터 테이블
     * @type {null}
     */
    this.dataTable = null;
    /**
     * 최종 로우데이터
     * @type {Array}
     */
    this.finalRowData = [];
    /**
     * 재구성될 커넥션 리스트
     * @type {Array}
     */
    this.connections = [];
    /**
     * 재구성 된 커넥션 edgeId 리스트
     * @type {Array}
     */
    this.existConnections = [];
    /**
     * 뷰 모드일시 그려진 셀 리스트
     * rowIndex + '-' + column 으로 표현한다.
     * @type {Array}
     */
    this.existCells = [];

};
ChartRenderer.prototype = {

    /**
     * 캔버스를 초기 빌드한다.  최초 1번만 실행된다.
     */
    init: function () {
        var me = this;
        me.bindEvent();

        //스크롤일 경우 렌더링을 재수행한다.
        me._CONTAINER.scroll(function () {
            me.renderByContainer();
        });

        var beforeW = me._CONTAINER.width();

        if (!me.editMode) {
            //컨테이너 크기를 체크하여 크기 변경시 renderByContainer 를 실행한다.
            var checkContainerSize = function () {
                if (beforeW != me._CONTAINER.width()) {
                    beforeW = me._CONTAINER.width();
                    me.renderByContainer();
                }
            };
            setInterval(checkContainerSize, 1000);
        }
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

        me.renderByContainer();
    },

    zoomFit: function () {
        var me = this;
        if (!me.tableElement) {
            me.setScale(1);
        } else {
            me.canvas.setScale(1);
            var canvasSize = me.canvas.getCanvasSize();
            var canvasHeight = canvasSize[1];
            if (canvasHeight < me._CONFIG.CONTAINER_MIN_HEIGHT) {
                canvasHeight = me._CONFIG.CONTAINER_MIN_HEIGHT;
            }
            if (canvasHeight > me._CONFIG.CONTAINER_MAX_HEIGHT) {
                canvasHeight = me._CONFIG.CONTAINER_MAX_HEIGHT;
            }
            var rate = me._CONFIG.CONTAINER_HEIGHT / (canvasHeight + 50);
            me.setScale(rate);
        }
    },

    //========================================================================//
    //=============================Data apis==================================//
    //========================================================================//

    /**
     * 칼럼 이름으로 칼럼 옵션을 얻어온다.
     * @param columns {Array} 칼럼리스트
     * @param field {String} 칼럼명
     * @return {*}
     */
    getColumnByField: function (columns, field) {
        for (var i = 0, leni = columns.length; i < leni; i++) {
            if (columns[i].data == field) {
                return columns[i];
            }
        }
    },

    /**
     * 스테이터스를 컬러로 바꾼다.
     * @param state {String} 스테이터스
     * @return {*}
     */
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

    /**
     * 데이터 테이블의 렌더러를 정의하여 리턴한다. value 를 shape 로 변환하는 로직이 담겨있다.
     * @return {tableRenderer}
     */
    getDataTableRenderer: function () {

        //TODO 테이블에 렌더링 되는 도형을 변경하고싶을때 여기를 수정하면 됨.
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
                var shape = new OG.A_Task(me.labelSubstring(contentData['cur_wfa_name']));
                var color = me.getColorFromState(contentData['cur_state']);
                color = color ? color : '#fff';
                contentData['color'] = color;
                shape.data = JSON.parse(JSON.stringify(contentData));


                result.contents.push({
                    shape: shape,
                    width: contentData.width ? contentData.width + 'px' : me._CONFIG.ACTIVITY_WIDTH + 'px',
                    height: contentData.height ? contentData.height + 'px' : me._CONFIG.ACTIVITY_HEIGHT + 'px',

                    //TODO 액티비티의 스타일을 주려면 여기의 스타일을 변경하면 될 것 같음.
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
     * @param funcCode {String} cur_eng_func_code
     * @param rows {Array} rows 데이터
     * @param rowIndexMapByCode {Map} rowIndexMapByCode
     * @return {*}
     */
    getDataRowByCode: function (funcCode, rows, rowIndexMapByCode) {
        var rowByCode;
        if (typeof rowIndexMapByCode[funcCode] == 'number') {
            var rowIndex = rowIndexMapByCode[funcCode];
            rowByCode = rows[rowIndex];
        }
        return rowByCode;
    },

    /**
     * rows 데이터 를 조회하여, 주어진 액티비티에 해당하는 정보를 반환한다.
     * @param activity {Map} activity 정보
     * @param rows {Array} rows 데이터
     * @return {*}
     */
    getExistActivityFromRowsData: function (activity, rows) {
        if (!activity || !rows || !rows.length) {
            return null;
        }
        var selected;
        var relSelected;
        var activityId = activity['cur_wfa'];
        var relActivityId = activity['ref_wfa'];
        $.each(rows, function (i, row) {
            for (var column in row) {
                var values = row[column];
                if (typeof values == 'object') {
                    $.each(values, function (v, value) {
                        if (activityId == value['cur_wfa']) {
                            selected = {
                                data: value,
                                column: column,
                                dataIndex: i,
                                contentIndex: v
                            }
                        }
                        if (relActivityId == value['cur_wfa']) {
                            relSelected = {
                                data: value,
                                column: column,
                                dataIndex: i,
                                contentIndex: v
                            }
                        }
                    })
                }
            }
        });
        return selected ? selected : relSelected;
    },

    /**
     * 액티비티 아이디로 엘리먼트를 찾는다.
     * @param activityId {String} 액티비티 아이디
     * @return {*}
     */
    getElementByActivityId: function (activityId) {
        var me = this;
        var allShapes = me.canvas.getAllShapes();
        var selected;
        var relSelected;
        $.each(allShapes, function (i, element) {
            if (element.shape.data) {
                if (element.shape.data['cur_wfa'] == activityId) {
                    selected = element;
                }
                if (element.shape.data['ref_wfa'] == activityId) {
                    relSelected = element;
                }
            }
        });
        if (selected) {
            return selected;
        } else {
            return relSelected;
        }
    },

    /**
     * 화면의 Edge 를 연결 해제하고, 재연결 정보를 저장한다.
     * @return {Array} connections
     */
    keepEdges: function () {
        var getActivityFromTerminal = function (terminal) {
            var selected = null;
            var shapeId = terminal.substring(0, terminal.indexOf(OG.Constants.TERMINAL));
            $.each(me.loadElements, function (i, activity) {
                if (activity.id == shapeId && activity.shape instanceof OG.A_Task) {
                    selected = activity;
                }
            });
            return selected;
        };

        var me = this;
        var edge, fromActivity, toActivity, connections = [], connection;
        $.each(me.loadElements, function (i, edge) {
            if (edge.shape instanceof OG.EdgeShape) {
                var fromTerminal = edge['_from'];
                var toTerminal = edge['_to'];
                var direction;
                connection = edge;

                if (fromTerminal) {
                    fromActivity = getActivityFromTerminal(fromTerminal);
                    if (fromActivity && fromActivity.shape.data) {
                        connection.from = fromTerminal;
                        connection.fromActivity = fromActivity.shape.data['cur_wfa'];
                    }
                }

                if (toTerminal) {
                    toActivity = getActivityFromTerminal(toTerminal);
                    if (toActivity && toActivity.shape.data) {
                        connection.to = toTerminal;
                        connection.toActivity = toActivity.shape.data['cur_wfa'];
                    }
                }
                connections.push(connection);
            }
        });
        return connections;
    },

    //========================================================================//
    //===========================Render apis==================================//
    //========================================================================//
    /**
     * 캔버스의 컨테이너 영역(화면상에 나타난 영역) 만큼만 액티비티를 그린다.
     */
    renderByContainer: function () {
        var me = this;

        if (me.editMode) {
            return;
        }

        //1. 컨테이너 가로 사이즈를 구한다.
        var viewWidth = me._CONTAINER.width() + me._CONTAINER.scrollLeft();

        //2. 컨테이너 가로 안에 속한 셀 리스트를 구한다.
        if (me.dataTable) {
            $.each(me.dataTable.data.viewData.rows, function (rowIndex, row) {
                if (row && row.cells) {
                    for (var column in row.cells) {
                        //이미 그려진 셀이면 넘어간다.
                        if (me.existCells.indexOf(rowIndex + '-' + column) != -1) {
                            continue;
                        }
                        var cellView = row.cells[column];

                        //셀 뷰의 left 값이 컨테이너 가로보다 클 경우 넘어간다.
                        if ((cellView.left * me.canvas.getScale()) > viewWidth) {
                            continue;
                        }

                        //셀 뷰의 데이터 값을 구하고, 셀을 재구성한다.
                        if (me.finalRowData[rowIndex] && me.finalRowData[rowIndex][column]) {
                            cellView.value = me.finalRowData[rowIndex][column];
                            me.dataTable.drawCell(cellView);
                        }

                        //그려진 셀 리스트에 추가한다.
                        me.existCells.push(rowIndex + '-' + column);
                    }
                }
            });
        }
        me.renderEdges();
    },

    /**
     * 기존 JSON 맵에 포함된 연결정보를 재구성한다.
     * 한번 재구성된 연결정보는 다시 구성하지 않는다.
     */
    renderEdges: function () {
        var me = this;
        //연결 정보를 이어나간다.
        if (me.existJson && me.connections && me.connections.length) {

            var defaultStyle = JSON.parse(JSON.stringify(me.canvas._CONFIG.DEFAULT_STYLE.EDGE));
            defaultStyle['opacity'] = '1';
            defaultStyle['marker'] = null;

            $.each(me.connections, function (i, connection) {
                var edgeId = connection.id;
                if (me.existConnections.indexOf(edgeId) != -1) {
                    return;
                }

                var fromTerminal = connection.from;
                var fromActivity = connection.fromActivity;
                var toTerminal = connection.to;
                var toActivity = connection.toActivity;

                var fromShape, toShape;
                if (fromActivity) {
                    fromShape = me.getElementByActivityId(fromActivity);
                }
                if (toActivity) {
                    toShape = me.getElementByActivityId(toActivity);
                }

                //둘 중 하나라도 없다면 무시한다.
                if (!fromShape || !toShape) {
                    return;
                }

                var beforeFromId = fromTerminal.substring(0, fromTerminal.indexOf(OG.Constants.TERMINAL));
                var fromReplace = fromTerminal.replace(beforeFromId, fromShape.id);

                var beforeToId = toTerminal.substring(0, toTerminal.indexOf(OG.Constants.TERMINAL));
                var toReplace = toTerminal.replace(beforeToId, toShape.id);

                //TODO 선 그릴떄, defaultStyle 의 값을 변경하면 선 스타일이 바뀜.
                //defaultStyle
                // me.canvas._CONFIG.DEFAULT_STYLE.EDGE = {
                //     stroke: "black",
                //     fill: "none",
                //     "fill-opacity": 0,
                //     "stroke-width": 1.5,
                //     "stroke-opacity": 1,
                //     "edge-type": "plain",
                //     "arrow-start": "none",
                //     "arrow-end": "block",
                //     "stroke-dasharray": "-",
                //     "label-position": "center",
                //     "stroke-linejoin": "round",
                //     cursor: "pointer"
                // };
                var edge = me.canvas.drawShape(null, connection.shape, null, defaultStyle, edgeId);
                me.canvas.getRenderer().connect(fromReplace, toReplace, edge, null, null, true);
                me.existConnections.push(edgeId);
            });
            //me.connections = [];
        }
    },

    /**
     * 데이터를 기반으로 화면에 렌더링한다.
     * @param chartData {Map} Aras 에서 가져온 데이터
     * @param existJson {Map} 기존에 저장된 맵데이터
     */
    render: function (chartData, existJson) {
        var me = this;
        var dataTable;
        var existTableData;
        var tableElement;
        var existViewData;

        me.canvas.clear();
        me.existJson = null;
        me.loadElements = null;
        me.existActivitySize = {};
        me.dataTable = null;
        me.finalRowData = [];
        me.connections = [];
        me.existConnections = [];
        me.existCells = [];

        //기존 json 정보가 있을 경우 로드 한 후, 데이터 테이블을 얻어온다.
        if (existJson) {
            me.existJson = existJson;

            //기존의 액티비티 정보들을 뽑아옴.
            me.loadElements = me.loadJSON(existJson);

            $.each(me.loadElements, function (i, element) {
                if (element.shape.SHAPE_ID == 'OG.shape.component.DataTable') {
                    tableElement = element;
                }
            });

            if (tableElement) {
                dataTable = tableElement.shape;
                existTableData = JSON.parse(JSON.stringify(dataTable.data.tableData));
                existViewData = JSON.parse(JSON.stringify(dataTable.data.viewData));

                //기존 A_Task 의 정보를 담는다.
                me.existActivitySize = {};
                $.each(me.loadElements, function (i, activity) {
                    if (activity.shape.SHAPE_ID == 'OG.shape.bpmn.A_Task') {
                        if (activity.shape.data && activity.shape.data['cur_wfa']) {
                            var id = activity.shape.data['cur_wfa'];
                            me.existActivitySize[id] = {
                                width: activity.width,
                                height: activity.height
                            }
                        }
                    }
                });

                //Edge 들의 from,to 액티비티 연결정보를 저장하고있는다.
                //기존의 연결선 정보들을 뽑아옴.
                me.connections = me.keepEdges();

            } else {
                dataTable = new OG.DataTable();
            }
        } else {
            dataTable = new OG.DataTable();
        }
        dataTable.MOVABLE = false;


        //TODO 움직일 수 있는 방향 : moveAxis(마우스 드랍했을때 도형이 셀에 적용되는 방향), axis(움직일 수 있는 방향) ,
        //프로퍼티: X = 가로  Y = 세로  '' = 전방향
        //옵션데이터
        var options = {
            moveAxis: 'X',
            resizeAxis: 'X',
            columnEditable: false,
            axis: 'X',
            pageLength: 100,
            currentPage: 1,
            columnHeight: 50,
            columnWidth: 160,
            columnMinWidth: 100,

            //TODO 테이블 스타일 변경은 여기서...

            //디폴트 칼럼 스타일 => 전체 적용.
            columnStyle: {
                'font-color': '#fff',
                'fill': '#abaaad',
                'fill-opacity': 1,
                'stroke': 'none',
                'border-bottom': {
                    'stroke': '#616063',
                    'stroke-width': '4'
                },
                'font-size': '12px'
            },
            rowDividingLine: {
                'stroke': '#abaaad',
                'stroke-width': '1'
            },
            cellHeight: 66,
            cellStyle: {
                'fill': '#fff',
                'fill-opacity': 0,
                'font-size': 8,
                'border-right': {
                    'stroke': '#ebeaed',
                    'stroke-width': '1'
                }
            },

            //데이터의 헤더 수만 큼 여기다가 칼럼들을 푸시를 할 것이다.
            columns: [

                //TODO 개별적인 칼럼이나 셀 스타일은 여기서...

                //첫 번째 칼럼.
                {
                    data: 'func_code',
                    title: '주요 Activity\n일정(D day)',
                    defaultContent: '',
                    columnWidth: 100,

                    //개별적인 칼럼 스타일 적용. 여기는 fill 등을 적용 가능.
                    columnStyle: {
                        'fill': 'red',
                        'border-left': {
                            'stroke': '#abaaad',
                            'stroke-width': '1'
                        },
                        'border-right': {
                            'stroke': '#616063',
                            'stroke-width': '3'
                        }
                    },

                    //개별적인 셀 스타일. 여기는 border 스타일만 가능.
                    cellStyle: {
                        'border-right': {
                            'stroke': '#616063',
                            'stroke-width': '3'
                        },
                        'border-left': {
                            'stroke': '#abaaad',
                            'stroke-width': '1'
                        },
                        'font-size': '11px'
                    }

                    //만일 여기에 렌더러가 있다면, 이 칼럼에 종속된 셀들은 그려질 때 렌더러가 명령하는대로 그려진다.
                    // ,renderer: unction(){
                    //
                    // }
                }
            ]
        };

        var headers = chartData.headers;
        var rows = chartData.rows;
        var activities = chartData['activities'];

        //옵션 칼럼정보를 구성한다.
        for (var i = 0; i < headers.length; i++) {
            var convertDate;
            try {
                convertDate = new Date(headers[i]['_end_date'] + ' GMT');
                convertDate = me.getLocaleShortDateString(convertDate);
            } catch (e) {
                convertDate = headers[i]['_end_date'];
            }

            var title = headers[i]['label'] + '\n' + convertDate;
            var column = {
                data: headers[i]['label'],
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

        //기존 테이블의 칼럼뷰데이터의 커스텀 칼럼의 인덱스들을, 칼럼 옵션에 인서트한다.
        if (existViewData && existViewData.columns) {
            var sortedIndex = [];
            for (var key in existViewData.columns) {
                var columnView = existViewData.columns[key];
                if (columnView.column.indexOf(me._CONFIG.CUSTOM_COL_PREFIX) != -1) {
                    var column = {
                        data: columnView.column,
                        title: '',
                        defaultContent: '',
                        renderer: me.getDataTableRenderer(),
                        columnEditable: false
                    };
                    var columnIndex = columnView.cellIndex;
                    sortedIndex[columnIndex] = column;
                }
            }
            for (var s = 0; s < sortedIndex.length; s++) {
                if (sortedIndex[s] != null) {
                    options.columns.splice(s, 0, sortedIndex[s]);
                }
            }
        }

        var rowData = [];
        var rowIndexMapByCode = {};
        for (var i = 0; i < rows.length; i++) {
            var row = {};
            //제일 앞 칼럼은 코드 데이터
            row['func_code'] = rows[i]['c_label'];
            rowData.push(row);
            rowIndexMapByCode[rows[i]['_eng_func_code']] = i;
        }


        //기존 데이터 테이블에 있는 액티비티를 재구성한다.
        $.each(activities, function (a, activity) {
            //cur_wfa 가 없는것은 표현하지 않는다.
            if (!activity['cur_wfa']) {
                return;
            }
            var rowByCode = me.getDataRowByCode(activity['cur_eng_func_code'], rowData, rowIndexMapByCode);
            if (!rowByCode) {
                return;
            }

            var column, isExist = false, contentIndex = -1;

            //기존 데이터가 있다면, 기존 액티비티가 들어있는 칼럼을 찾는다.
            if (existTableData) {
                var existActivityInfo = me.getExistActivityFromRowsData(activity, existTableData);
                if (existActivityInfo) {
                    column = existActivityInfo.column;

                    //칼럼이 옵션 칼럼 리스트 안에 포함되어있다면
                    if (me.getColumnByField(options.columns, column)) {
                        isExist = true;
                        contentIndex = existActivityInfo.contentIndex;
                    } else {
                        column = null;
                    }
                }
            }

            //기존 데이터의 칼럼을 찾지 못했다면, 신규 액티비티이며, cur_proposal_activity 과 header 리스트의 id를 매핑한다.
            if (!column) {
                $.each(headers, function (h, header) {
                    if (activity['cur_proposal_activity'] && (header.id == activity['cur_proposal_activity'])) {
                        column = header.label;
                    }
                })
            }

            //cur_proposal_activity 로 칼럼을 찾지 못하였다면, 칼럼은 옵션칼럼 의 1번 인덱스로 잡는다.
            if (!column && options.columns[1]) {
                column = options.columns[1].data;
            }
            if (!column) {
                return;
            }

            //해당 팀의 칼럼에 액티비티를 추가한다.
            if (!rowByCode[column]) {
                rowByCode[column] = []
            }

            //existActivitySize 에서 해당 액티비티의 삭제 전 사이즈를 구한다.
            var beforeSize = me.existActivitySize[activity['cur_wfa']];
            if (beforeSize) {
                //activity['width'] = beforeSize['width'];
                //activity['height'] = beforeSize['height'];
            }

            //contentIndex 가 있다면 해당 위치에 인서트하고, 그 외에는 push
            if (contentIndex < 0) {
                rowByCode[column].push(activity);
            } else {
                rowByCode[column].splice(contentIndex, 0, activity);
            }
        });


        //각 셀 데이터의 컨텐트 개수에 따라 옵션의 칼럼 너비를 조정해주도록 한다.
        //me.data.viewData.columns
        if (me._CONFIG.ARRANGEMENT == 'horizontal') {
            $.each(rowData, function (r, row) {
                for (var column in row) {

                    var columnOption = me.getColumnByField(options.columns, column);
                    var columnWidth = columnOption.columnWidth ? columnOption.columnWidth : options.columnWidth;
                    if (existTableData && dataTable.data.viewData.columns[column]) {
                        columnWidth = dataTable.data.viewData.columns[column].width;
                    }

                    //셀 데이터가 어레이 타입일 경우 총 셀 너비 계산.
                    if (typeof row[column] == 'object') {
                        var length = row[column].length;
                        var totalWidth = (me._CONFIG.ACTIVITY_WIDTH + me._CONFIG.ARRANGEMENT_MARGIN) * length;
                        if (totalWidth > columnWidth) {
                            columnOption.columnWidth = totalWidth + 30;

                            if (existTableData && dataTable.data.viewData.columns[column]) {
                                dataTable.data.viewData.columns[column].width = totalWidth + 30;
                            }
                        }
                    }
                }
            })
        }
        dataTable.setOptions(options);

        //최종 rowData 를 저장한다.
        me.finalRowData = rowData;


        //에디터 모드인 경우
        if (me.editMode) {
            dataTable.setData(rowData);
        }
        //뷰 모드인경우는 func_code 만을 데이터에 추가한다.
        else {
            var copyData = [];
            if (rowData && rowData.length) {
                copyData = JSON.parse(JSON.stringify(rowData));
                $.each(copyData, function (c, data) {
                    copyData[c] = {
                        func_code: data['func_code']
                    };
                    me.existCells.push(c + '-func_code');
                })
            }
            dataTable.setData(copyData);
        }

        //데이터 테이블을 그린다.
        var tableElement = this.canvas.drawShape([50, 50], dataTable, [100, 100], {});
        dataTable.draw();

        //데이터 테이블을 등록한다.
        dataTable.DELETABLE = false;
        me.dataTable = dataTable;
        me.tableElement = tableElement;

        //뷰모드일 경우 컨테이너 내부의 콘텐트를 그린다.
        if (!me.editMode) {
            me.renderByContainer();
        }
        //에디터 모드일 경우 선열결을 실행한다.
        else {
            me.renderEdges();
        }

        //캔버스 스케일 원복
        me.canvas.setScale(1);
        var boundary = me.canvas.getBoundary(me.tableElement);
        me.canvas.setCanvasSize([boundary.getWidth() + 5, boundary.getHeight() + 5]);
        me.zoomFit();

        console.log(me.dataTable.data);
    },

    lineAlignment: function () {
        var me = this;
        var allEdges = me.canvas.getAllEdges();
        $.each(allEdges, function (i, edge) {
            me.canvas.reconnect(edge);
        });
    }

    //========================================================================//
    //=================================Utils==================================//
    //========================================================================//
    ,
    /**
     * 주어진 라벨이 최대 표기 숫자를 넘길 경우 텍스트를 줄인다.
     * @param label {String} 라벨
     * @returns {String} fixed label
     */
    labelSubstring: function (label) {
        var length = this._CONFIG.LABEL_MAX_LENGTH;
        if (label.length > length) {
            return label.substring(0, length) + '..';
        } else {
            return label;
        }
    }
    ,
    /**
     * 주어진 스트링이 빈값인지를 확인한다.
     * @param value {String} 판별할 값
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
     * @returns {Element} Dom Element
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
    /**
     * Date 를 로컬 스트링으로 변환한다.
     * @param d {Date}
     * @return {string} Date String
     */
    getLocaleShortDateString: function (d) {
        var formats = {
            "ar-SA": "dd/MM/yy",
            "bg-BG": "dd.M.yyyy",
            "ca-ES": "dd/MM/yyyy",
            "zh-TW": "yyyy/M/d",
            "cs-CZ": "d.M.yyyy",
            "da-DK": "dd-MM-yyyy",
            "de-DE": "dd.MM.yyyy",
            "el-GR": "d/M/yyyy",
            "en-US": "M/d/yyyy",
            "fi-FI": "d.M.yyyy",
            "fr-FR": "dd/MM/yyyy",
            "he-IL": "dd/MM/yyyy",
            "hu-HU": "yyyy. MM. dd.",
            "is-IS": "d.M.yyyy",
            "it-IT": "dd/MM/yyyy",
            "ja-JP": "yyyy/MM/dd",
            "ko-KR": "yyyy-MM-dd",
            "nl-NL": "d-M-yyyy",
            "nb-NO": "dd.MM.yyyy",
            "pl-PL": "yyyy-MM-dd",
            "pt-BR": "d/M/yyyy",
            "ro-RO": "dd.MM.yyyy",
            "ru-RU": "dd.MM.yyyy",
            "hr-HR": "d.M.yyyy",
            "sk-SK": "d. M. yyyy",
            "sq-AL": "yyyy-MM-dd",
            "sv-SE": "yyyy-MM-dd",
            "th-TH": "d/M/yyyy",
            "tr-TR": "dd.MM.yyyy",
            "ur-PK": "dd/MM/yyyy",
            "id-ID": "dd/MM/yyyy",
            "uk-UA": "dd.MM.yyyy",
            "be-BY": "dd.MM.yyyy",
            "sl-SI": "d.M.yyyy",
            "et-EE": "d.MM.yyyy",
            "lv-LV": "yyyy.MM.dd.",
            "lt-LT": "yyyy.MM.dd",
            "fa-IR": "MM/dd/yyyy",
            "vi-VN": "dd/MM/yyyy",
            "hy-AM": "dd.MM.yyyy",
            "az-Latn-AZ": "dd.MM.yyyy",
            "eu-ES": "yyyy/MM/dd",
            "mk-MK": "dd.MM.yyyy",
            "af-ZA": "yyyy/MM/dd",
            "ka-GE": "dd.MM.yyyy",
            "fo-FO": "dd-MM-yyyy",
            "hi-IN": "dd-MM-yyyy",
            "ms-MY": "dd/MM/yyyy",
            "kk-KZ": "dd.MM.yyyy",
            "ky-KG": "dd.MM.yy",
            "sw-KE": "M/d/yyyy",
            "uz-Latn-UZ": "dd/MM yyyy",
            "tt-RU": "dd.MM.yyyy",
            "pa-IN": "dd-MM-yy",
            "gu-IN": "dd-MM-yy",
            "ta-IN": "dd-MM-yyyy",
            "te-IN": "dd-MM-yy",
            "kn-IN": "dd-MM-yy",
            "mr-IN": "dd-MM-yyyy",
            "sa-IN": "dd-MM-yyyy",
            "mn-MN": "yy.MM.dd",
            "gl-ES": "dd/MM/yy",
            "kok-IN": "dd-MM-yyyy",
            "syr-SY": "dd/MM/yyyy",
            "dv-MV": "dd/MM/yy",
            "ar-IQ": "dd/MM/yyyy",
            "zh-CN": "yyyy/M/d",
            "de-CH": "dd.MM.yyyy",
            "en-GB": "dd/MM/yyyy",
            "es-MX": "dd/MM/yyyy",
            "fr-BE": "d/MM/yyyy",
            "it-CH": "dd.MM.yyyy",
            "nl-BE": "d/MM/yyyy",
            "nn-NO": "dd.MM.yyyy",
            "pt-PT": "dd-MM-yyyy",
            "sr-Latn-CS": "d.M.yyyy",
            "sv-FI": "d.M.yyyy",
            "az-Cyrl-AZ": "dd.MM.yyyy",
            "ms-BN": "dd/MM/yyyy",
            "uz-Cyrl-UZ": "dd.MM.yyyy",
            "ar-EG": "dd/MM/yyyy",
            "zh-HK": "d/M/yyyy",
            "de-AT": "dd.MM.yyyy",
            "en-AU": "d/MM/yyyy",
            "es-ES": "dd/MM/yyyy",
            "fr-CA": "yyyy-MM-dd",
            "sr-Cyrl-CS": "d.M.yyyy",
            "ar-LY": "dd/MM/yyyy",
            "zh-SG": "d/M/yyyy",
            "de-LU": "dd.MM.yyyy",
            "en-CA": "dd/MM/yyyy",
            "es-GT": "dd/MM/yyyy",
            "fr-CH": "dd.MM.yyyy",
            "ar-DZ": "dd-MM-yyyy",
            "zh-MO": "d/M/yyyy",
            "de-LI": "dd.MM.yyyy",
            "en-NZ": "d/MM/yyyy",
            "es-CR": "dd/MM/yyyy",
            "fr-LU": "dd/MM/yyyy",
            "ar-MA": "dd-MM-yyyy",
            "en-IE": "dd/MM/yyyy",
            "es-PA": "MM/dd/yyyy",
            "fr-MC": "dd/MM/yyyy",
            "ar-TN": "dd-MM-yyyy",
            "en-ZA": "yyyy/MM/dd",
            "es-DO": "dd/MM/yyyy",
            "ar-OM": "dd/MM/yyyy",
            "en-JM": "dd/MM/yyyy",
            "es-VE": "dd/MM/yyyy",
            "ar-YE": "dd/MM/yyyy",
            "en-029": "MM/dd/yyyy",
            "es-CO": "dd/MM/yyyy",
            "ar-SY": "dd/MM/yyyy",
            "en-BZ": "dd/MM/yyyy",
            "es-PE": "dd/MM/yyyy",
            "ar-JO": "dd/MM/yyyy",
            "en-TT": "dd/MM/yyyy",
            "es-AR": "dd/MM/yyyy",
            "ar-LB": "dd/MM/yyyy",
            "en-ZW": "M/d/yyyy",
            "es-EC": "dd/MM/yyyy",
            "ar-KW": "dd/MM/yyyy",
            "en-PH": "M/d/yyyy",
            "es-CL": "dd-MM-yyyy",
            "ar-AE": "dd/MM/yyyy",
            "es-UY": "dd/MM/yyyy",
            "ar-BH": "dd/MM/yyyy",
            "es-PY": "dd/MM/yyyy",
            "ar-QA": "dd/MM/yyyy",
            "es-BO": "dd/MM/yyyy",
            "es-SV": "dd/MM/yyyy",
            "es-HN": "dd/MM/yyyy",
            "es-NI": "dd/MM/yyyy",
            "es-PR": "dd/MM/yyyy",
            "am-ET": "d/M/yyyy",
            "tzm-Latn-DZ": "dd-MM-yyyy",
            "iu-Latn-CA": "d/MM/yyyy",
            "sma-NO": "dd.MM.yyyy",
            "mn-Mong-CN": "yyyy/M/d",
            "gd-GB": "dd/MM/yyyy",
            "en-MY": "d/M/yyyy",
            "prs-AF": "dd/MM/yy",
            "bn-BD": "dd-MM-yy",
            "wo-SN": "dd/MM/yyyy",
            "rw-RW": "M/d/yyyy",
            "qut-GT": "dd/MM/yyyy",
            "sah-RU": "MM.dd.yyyy",
            "gsw-FR": "dd/MM/yyyy",
            "co-FR": "dd/MM/yyyy",
            "oc-FR": "dd/MM/yyyy",
            "mi-NZ": "dd/MM/yyyy",
            "ga-IE": "dd/MM/yyyy",
            "se-SE": "yyyy-MM-dd",
            "br-FR": "dd/MM/yyyy",
            "smn-FI": "d.M.yyyy",
            "moh-CA": "M/d/yyyy",
            "arn-CL": "dd-MM-yyyy",
            "ii-CN": "yyyy/M/d",
            "dsb-DE": "d. M. yyyy",
            "ig-NG": "d/M/yyyy",
            "kl-GL": "dd-MM-yyyy",
            "lb-LU": "dd/MM/yyyy",
            "ba-RU": "dd.MM.yy",
            "nso-ZA": "yyyy/MM/dd",
            "quz-BO": "dd/MM/yyyy",
            "yo-NG": "d/M/yyyy",
            "ha-Latn-NG": "d/M/yyyy",
            "fil-PH": "M/d/yyyy",
            "ps-AF": "dd/MM/yy",
            "fy-NL": "d-M-yyyy",
            "ne-NP": "M/d/yyyy",
            "se-NO": "dd.MM.yyyy",
            "iu-Cans-CA": "d/M/yyyy",
            "sr-Latn-RS": "d.M.yyyy",
            "si-LK": "yyyy-MM-dd",
            "sr-Cyrl-RS": "d.M.yyyy",
            "lo-LA": "dd/MM/yyyy",
            "km-KH": "yyyy-MM-dd",
            "cy-GB": "dd/MM/yyyy",
            "bo-CN": "yyyy/M/d",
            "sms-FI": "d.M.yyyy",
            "as-IN": "dd-MM-yyyy",
            "ml-IN": "dd-MM-yy",
            "en-IN": "dd-MM-yyyy",
            "or-IN": "dd-MM-yy",
            "bn-IN": "dd-MM-yy",
            "tk-TM": "dd.MM.yy",
            "bs-Latn-BA": "d.M.yyyy",
            "mt-MT": "dd/MM/yyyy",
            "sr-Cyrl-ME": "d.M.yyyy",
            "se-FI": "d.M.yyyy",
            "zu-ZA": "yyyy/MM/dd",
            "xh-ZA": "yyyy/MM/dd",
            "tn-ZA": "yyyy/MM/dd",
            "hsb-DE": "d. M. yyyy",
            "bs-Cyrl-BA": "d.M.yyyy",
            "tg-Cyrl-TJ": "dd.MM.yy",
            "sr-Latn-BA": "d.M.yyyy",
            "smj-NO": "dd.MM.yyyy",
            "rm-CH": "dd/MM/yyyy",
            "smj-SE": "yyyy-MM-dd",
            "quz-EC": "dd/MM/yyyy",
            "quz-PE": "dd/MM/yyyy",
            "hr-BA": "d.M.yyyy.",
            "sr-Latn-ME": "d.M.yyyy",
            "sma-SE": "yyyy-MM-dd",
            "en-SG": "d/M/yyyy",
            "ug-CN": "yyyy-M-d",
            "sr-Cyrl-BA": "d.M.yyyy",
            "es-US": "M/d/yyyy"
        };

        var l = navigator.languages ? navigator.languages[0] : (navigator.userLanguage || navigator.language), y = d.getFullYear(), m = d.getMonth() + 1, d = d.getDate();
        var f = (l in formats) ? formats[l] : "MM/dd/yyyy";

        function z(s) {
            s = '' + s;
            return s.length > 1 ? s : '0' + s;
        }

        f = f.replace(/yyyy/, y);
        f = f.replace(/yy/, String(y).substr(2));
        f = f.replace(/MM/, z(m));
        f = f.replace(/M/, m);
        f = f.replace(/dd/, z(d));
        f = f.replace(/d/, d);
        return f;
    }
    ,

//========================================================================//
//=================================Event==================================//
//========================================================================//
    /**
     * 캔버스가 처음 렌더링 될 시 필요한 이벤트들을 바인딩한다.
     */
    bindEvent: function () {
        var chartRenderer = this;
        var canvas = this.canvas;

        var highLightSelectedEdges = function () {
            var allEdges = canvas.getAllEdges();

            var edges = [], edgeIds = [];
            $.each(canvas._HANDLER.selectedElements, function (i, selectedElement) {
                var prevEdges = canvas.getPrevEdges(selectedElement);
                var nextEdges = canvas.getNextEdges(selectedElement);
                edges = edges.concat(prevEdges);
                edges = edges.concat(nextEdges);
            });

            var defaultStyle = JSON.parse(JSON.stringify(chartRenderer.canvas._CONFIG.DEFAULT_STYLE.EDGE));

            //선택된 도형이 없을 경우 모두 정상 처리한다.
            if (!edges.length) {
                defaultStyle['opacity'] = '1';
                defaultStyle['marker'] = null;
                $.each(allEdges, function (d, edge) {
                    if($(edge).data('highLight')){
                        canvas.setShapeStyle(edge, defaultStyle);
                        $(edge).data('highLight', false);
                    }
                });
                return;
            }

            //도형과 연결된 선분인 경우 하이라이트 처리.
            $.each(edges, function (i, edge) {
                edgeIds.push(edge.id);
                canvas.setShapeStyle(edge, {
                    "stroke": "RGB(66,139,202)",
                    "stroke-width": "3",
                    "stroke-dasharray": "",
                    "opacity": "0.7",
                    'marker': {
                        'end': {
                            'id': 'OG.marker.ArrowMarker',
                            'size': [2, 2]
                        }
                    }
                });
                $(edge).data('highLight', true);
            });

            //도형과 연결된 선분이 아닌경우 흐리게 처리한다.
            defaultStyle['opacity'] = '0.3';
            defaultStyle['opacity'] = '1';
            defaultStyle['marker'] = null;
            $.each(allEdges, function (c, otherEdge) {
                if (edgeIds.indexOf(otherEdge.id) == -1) {
                    if($(otherEdge).data('highLight')){
                        canvas.setShapeStyle(otherEdge, defaultStyle);
                        $(otherEdge).data('highLight', false);
                    }
                }
            })
        };

        /**
         * @class
         * @extends OG.shape.GeomShape
         * @requires OG.common.*
         * @requires OG.geometry.*
         *
         * @param {String} label 라벨 [Optional]
         * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
         * @private
         */
        OG.shape.bpmn.A_Task = function (label) {
            OG.shape.bpmn.A_Task.superclass.call(this);

            this.GROUP_DROPABLE = false;
            this.SHAPE_ID = 'OG.shape.bpmn.A_Task';
            this.label = label;
            this.CONNECTABLE = true;
            this.GROUP_COLLAPSIBLE = false;
            this.DELETABLE = false;
            this.LABEL_EDITABLE = false;
            this.RESIZABLE = false;
            this.GUIDE_BBOX = {
                stroke: "#ff5b00",
                'stroke-width': 4,
                fill: "white",
                "fill-opacity": 0,
                "shape-rendering": "crispEdges",
                cursor: "move"
            }
        };
        OG.shape.bpmn.A_Task.prototype = new OG.shape.GroupShape();
        OG.shape.bpmn.A_Task.superclass = OG.shape.GroupShape;
        OG.shape.bpmn.A_Task.prototype.constructor = OG.shape.bpmn.A_Task;
        OG.A_Task = OG.shape.bpmn.A_Task;

        /**
         * 드로잉할 Shape 을 생성하여 반환한다.
         *
         * @return {OG.geometry.Geometry} Shape 정보
         * @override
         */
        OG.shape.bpmn.A_Task.prototype.createShape = function () {
            if (this.geom) {
                return this.geom;
            }

            this.geom = new OG.geometry.Rectangle([0, 0], 100, 100);
            this.geom.style = new OG.geometry.Style({
                //fill: 'r[(10, 10)]#FFFFFF-#FFFFCC',
                'fill-r': 1,
                'fill-cx': .1,
                'fill-cy': .1,
                "stroke-width": 1.2,
                fill: 'r(.1, .1)#FFFFFF-#FFFFCC',
                'fill-opacity': 1,
                r: '10'
            });

            return this.geom;
        };


        //TODO 알람 말고, 더 특별한 모양을 더 달고 싶다면 여기서 추가로 작성하면 됩니다.
        OG.shape.bpmn.A_Task.prototype.createSubShape = function () {
            this.sub = [];
            if (this.data && (this.data['cur_check_alarm'] == "1" || this.data['cur_check_alarm'] == 1)) {
                this.sub = [
                    {
                        shape: new OG.CircleShape('A'),
                        width: '20px',
                        height: '20px',
                        left: '-10px',
                        top: '-10px',
                        style: {
                            'fill': this.data['color'],
                            'fill-opacity': 1,
                            'stroke': '#000',
                            'stroke-width': '1'
                        }
                    }
                ];
            }
            return this.sub;
        };

        //TODO 액티비티 컨넥스트 메뉴 추가는 여기서...
        OG.shape.bpmn.A_Task.prototype.createContextMenu = function () {
            var me = this;
            this.contextMenu = {
                'property': {
                    name: 'Open Workflow', callback: function () {
                        if (me.data && me.data['cur_rel_wf']) {
                            if (chartRenderer.viewController.aras) {
                                chartRenderer.viewController.aras.showPropertyWindow('workflow', me.data['cur_rel_wf']);
                            }
                        }
                    }
                }
            };
            if (me.data && me.data['cur_wfa_config_id']) {
                this.contextMenu['activity'] = {
                    name: 'Open Workflow Activity', callback: function () {
                        if (chartRenderer.viewController.aras) {
                            chartRenderer.viewController.aras.showPropertyWindow('activity', me.data['cur_wfa_config_id']);
                        }
                    }
                }
            }
            return this.contextMenu;
        };

        OG.shape.bpmn.A_Task.prototype.onSelectShape = function () {
            var me = this;
            //자신의 라인이 아닌 모든 도형은 deselect 한다.
            var allShapes = me.currentCanvas.getAllShapes();
            $.each(allShapes, function (i, element) {
                if (element.shape.data && element.shape.data['cur_eng_func_code']) {
                    if (element.shape.data['cur_eng_func_code'] != me.currentElement.shape.data['cur_eng_func_code'] &&
                        $(element).attr('_selected') == 'true') {
                        me.currentCanvas._HANDLER.deselectShape(element);
                    }
                }
            });
            highLightSelectedEdges();
        };
        OG.shape.bpmn.A_Task.prototype.onDeSelectShape = function () {
            highLightSelectedEdges();
        };


        //TODO 액티비티 도형이 그려진 후에 처리하는 내용입니다.
        OG.shape.bpmn.A_Task.prototype.onDrawShape = function () {
            var me = this;

            //액티비티 더블 클릭시
            $(me.currentElement).bind({
                'dblclick': function () {
                    if (me.data && me.data['cur_rel_wf']) {
                        if (chartRenderer.viewController.aras) {
                            chartRenderer.viewController.aras.showPropertyWindow('workflow', me.data['cur_rel_wf']);
                        }
                    }
                }
            });

            //액티비티 마우스 오버시
            $(me.currentElement).bind('mouseover', function (event) {
                $('.og-tooltip').remove();
                if (me.data && me.data['cur_wfa_name']) {
                    var text = me.data['cur_wfa_name'] + ' (' + me.data['cur_state'] + ')';
                    var tooltip =
                        $('<div class="og-tooltip ui-tooltip ui-widget ui-corner-all" id="' + me.currentElement.id + '-tooltip">' +
                            '<div class="ui-tooltip-content">' + text + '</div>' +
                            '</div>');
                    tooltip.css({
                        position: 'absolute',
                        'top': event.pageY,
                        'left': event.pageX + 15,
                        'background-color': '#333',
                        'color': 'whitesmoke',
                        'font-size': '12px'
                    });
                    $('body').append(tooltip);
                }
            });
            $(me.currentElement).bind('mouseout', function () {
                $('.og-tooltip').remove();
            });
        };

        //TODO 셀은 칼럼 클릭시 나타나는 투명한 모양의 사각형 기능툴입니다.
        OG.shape.component.Cell.prototype.createContextMenu = function () {
            var me = this;
            if (!chartRenderer.editMode) {
                return {}
            }

            function guid() {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }

                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }

            //칼럼인 경우 행 추가 가능하다.
            if (me.data && me.data.dataTable && me.data.dataTable.type == 'column') {
                var cellView = me.data.dataTable;
                var tableId = cellView.tableId;
                var table = me.currentCanvas.getElementById(tableId);
                if (table) {
                    this.contextMenu = {
                        'left': {
                            name: '오른쪽 열 추가', callback: function () {
                                var existColumn = table.shape.getColumnByField(cellView.column);
                                table.shape.addColumn({
                                    data: chartRenderer._CONFIG.CUSTOM_COL_PREFIX + guid(),
                                    title: '',
                                    defaultContent: '',
                                    renderer: existColumn.renderer,
                                    columnEditable: false
                                }, cellView.cellIndex + 1);
                                toastr.success('Column created.');
                            }
                        },
                        'right': {
                            name: '왼쪽 열 추가', callback: function () {
                                var existColumn = table.shape.getColumnByField(cellView.column);
                                table.shape.addColumn({
                                    data: chartRenderer._CONFIG.CUSTOM_COL_PREFIX + guid(),
                                    title: '',
                                    defaultContent: '',
                                    renderer: existColumn.renderer,
                                    columnEditable: false
                                }, cellView.cellIndex);
                                toastr.success('Column created.');
                            }
                        },
                        'remove': {
                            name: '열 삭제', callback: function () {
                                //커스텀 칼럼 일 경우만 삭제가능.
                                if (cellView.column && cellView.column.indexOf(chartRenderer._CONFIG.CUSTOM_COL_PREFIX) != -1) {
                                    table.shape.removeColumn(cellView.cellIndex);
                                    toastr.success('Column removed.');
                                } else {
                                    toastr.error('This column can not be deleted.');
                                }
                            }
                        },
                        'cut': {
                            name: '잘라내기', callback: function () {
                                table.shape.cutColumn = cellView.column;
                            }
                        }
                    };
                    if (table.shape.cutColumn) {
                        this.contextMenu['paste'] = {
                            name: '붙여넣기', callback: function () {
                                var cutColumn = table.shape.cutColumn;
                                table.shape.cutColumn = null;
                                table.shape.cutAndPaste(cutColumn, cellView.column);
                            }
                        }
                    }
                    return this.contextMenu;
                }
            } else {
                return {};
            }
        };
    }
    ,
    /**
     * 오픈그래프 맵 데이터를 분석하여 json 형태의 elements 리스트로 반환한다.
     * @param json {Map} 오픈그래프 맵데이터
     * @return {Array} elements
     */
    loadJSON: function (json) {
        var elements = [];
        var canvas = this.canvas;
        canvas.fastLoadingON();
        var canvasWidth, canvasHeight, rootGroup, canvasScale,
            minX = Number.MAX_VALUE, minY = Number.MAX_VALUE, maxX = Number.MIN_VALUE, maxY = Number.MIN_VALUE,
            i, cell, shape, id, parent, shapeType, shapeId, x, y, width, height, style, geom, from, to,
            fromEdge, toEdge, label, fromLabel, toLabel, angle, value, data, dataExt, elementMap, loopType, taskType, swimlane, textList;

        canvas._RENDERER.clear();
        var renderer = canvas._RENDERER;
        if (json && json.opengraph && json.opengraph.cell && OG.Util.isArray(json.opengraph.cell)) {
            canvasWidth = json.opengraph['@width'];
            canvasHeight = json.opengraph['@height'];
            canvasScale = json.opengraph['@scale'];

            data = json.opengraph['@data'];
            dataExt = json.opengraph['@dataExt'];
            if (data) {
                rootGroup = canvas.getRootGroup();
                rootGroup.data = OG.JSON.decode(unescape(data));
            }
            if (dataExt) {
                rootGroup = canvas.getRootGroup();
                rootGroup.dataExt = OG.JSON.decode(unescape(dataExt));
            }

            cell = json.opengraph.cell;
            var totalCount = cell.length;
            var cellCount = 0;

            for (var i = 0, leni = cell.length; i < leni; i++) {
                elementMap = {};
                id = cell[i]['@id'];
                parent = cell[i]['@parent'];
                swimlane = cell[i]['@swimlane'];
                shapeType = cell[i]['@shapeType'];
                shapeId = cell[i]['@shapeId'];
                x = parseInt(cell[i]['@x'], 10);
                y = parseInt(cell[i]['@y'], 10);
                width = parseInt(cell[i]['@width'], 10);
                height = parseInt(cell[i]['@height'], 10);
                style = unescape(cell[i]['@style']);
                geom = unescape(cell[i]['@geom']);

                from = cell[i]['@from'];
                to = cell[i]['@to'];
                fromEdge = cell[i]['@fromEdge'];
                toEdge = cell[i]['@toEdge'];
                label = cell[i]['@label'];
                fromLabel = cell[i]['@fromLabel'];
                toLabel = cell[i]['@toLabel'];
                angle = cell[i]['@angle'];
                value = cell[i]['@value'];
                data = cell[i]['@data'];
                textList = cell[i]['@textList'];
                dataExt = cell[i]['@dataExt'];
                loopType = cell[i]['@loopType'];
                taskType = cell[i]['@taskType'];

                label = label ? unescape(label) : label;

                minX = (minX > (x - width / 2)) ? (x - width / 2) : minX;
                minY = (minY > (y - height / 2)) ? (y - height / 2) : minY;
                maxX = (maxX < (x + width / 2)) ? (x + width / 2) : maxX;
                maxY = (maxY < (y + height / 2)) ? (y + height / 2) : maxY;

                switch (shapeType) {
                    case OG.Constants.SHAPE_TYPE.GEOM:
                    case OG.Constants.SHAPE_TYPE.GROUP:
                        shape = eval('new ' + shapeId + '()');
                        if (label) {
                            shape.label = label;
                        }
                        if (data) {
                            shape.data = OG.JSON.decode(unescape(data));
                        }
                        if (textList) {
                            shape.textList = OG.JSON.decode(unescape(textList));
                        }
                        elementMap = {
                            x: x,
                            y: y,
                            shape: shape,
                            width: width,
                            height: height,
                            style: OG.JSON.decode(style),
                            id: id,
                            parent: parent
                        };
                        break;
                    case OG.Constants.SHAPE_TYPE.EDGE:
                        var list = JSON.parse('[' + value + ']');
                        var fromto = JSON.stringify(list[0]) + ',' + JSON.stringify(list[list.length - 1]);
                        shape = eval('new ' + shapeId + '(' + fromto + ')');
                        if (label) {
                            shape.label = label;
                        }
                        if (data) {
                            shape.data = OG.JSON.decode(unescape(data));
                        }
                        if (textList) {
                            shape.textList = OG.JSON.decode(unescape(textList));
                        }
                        if (fromLabel) {
                            shape.fromLabel = unescape(fromLabel);
                        }
                        if (toLabel) {
                            shape.toLabel = unescape(toLabel);
                        }
                        if (geom) {
                            geom = OG.JSON.decode(geom);
                            if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.POLYLINE]) {
                                geom = new OG.geometry.PolyLine(geom.vertices);
                                shape.geom = geom;
                            } else if (geom.type === OG.Constants.GEOM_NAME[OG.Constants.GEOM_TYPE.CURVE]) {
                                geom = new OG.geometry.Curve(geom.controlPoints);
                                shape.geom = geom;
                            }
                        }
                        elementMap = {
                            shape: shape,
                            style: OG.JSON.decode(style),
                            id: id,
                            parent: parent
                        };
                        break;
                    case OG.Constants.SHAPE_TYPE.HTML:
                        shape = eval('new ' + shapeId + '()');
                        if (value) {
                            shape.html = unescape(value);
                        }
                        if (label) {
                            shape.label = label;
                        }
                        if (data) {
                            shape.data = OG.JSON.decode(unescape(data));
                        }
                        if (textList) {
                            shape.textList = OG.JSON.decode(unescape(textList));
                        }
                        elementMap = {
                            x: x,
                            y: y,
                            shape: shape,
                            width: width,
                            height: height,
                            angle: angle,
                            style: OG.JSON.decode(style),
                            id: id,
                            parent: parent
                        };
                        break;
                    case OG.Constants.SHAPE_TYPE.IMAGE:
                        shape = eval('new ' + shapeId + '(\'' + value + '\')');
                        if (label) {
                            shape.label = label;
                        }
                        if (data) {
                            shape.data = OG.JSON.decode(unescape(data));
                        }
                        if (textList) {
                            shape.textList = OG.JSON.decode(unescape(textList));
                        }
                        elementMap = {
                            x: x,
                            y: y,
                            shape: shape,
                            width: width,
                            height: height,
                            angle: angle,
                            style: OG.JSON.decode(style),
                            id: id,
                            parent: parent
                        };
                        break;
                    case OG.Constants.SHAPE_TYPE.TEXT:
                        shape = eval('new ' + shapeId + '()');
                        if (value) {
                            shape.text = unescape(value);
                        }
                        if (data) {
                            shape.data = OG.JSON.decode(unescape(data));
                        }
                        if (textList) {
                            shape.textList = OG.JSON.decode(unescape(textList));
                        }
                        elementMap = {
                            x: x,
                            y: y,
                            shape: shape,
                            width: width,
                            height: height,
                            angle: angle,
                            style: OG.JSON.decode(style),
                            id: id,
                            parent: parent
                        };
                        break;
                }

                if (from) {
                    elementMap['_from'] = from;
                }
                if (to) {
                    elementMap['_to'] = to;
                }
                if (fromEdge) {
                    elementMap['_fromedge'] = fromEdge;
                }
                if (toEdge) {
                    elementMap['_toedge'] = toEdge;
                }

                if (data) {
                    elementMap.data = OG.JSON.decode(unescape(data));
                }
                if (dataExt) {
                    elementMap.dataExt = OG.JSON.decode(unescape(dataExt));
                }
                cellCount++;

                elements.push(elementMap);
            }
            canvas.fastLoadingOFF();
        }
        return elements;
    }

}
;
ChartRenderer.prototype.constructor = ChartRenderer;