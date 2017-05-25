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
        CONTAINER_HEIGHT: 600,
        CONTAINER_MIN_HEIGHT: 600,

        ACTIVITY_WIDTH: 80,
        ACTIVITY_HEIGHT: 38,
        ARRANGEMENT: 'horizontal',
        ARRANGEMENT_MARGIN: 24
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
     * 칼럼 이름으로 칼럼 옵션을 얻어온다.
     * @param columns
     * @param field
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
     * @param state
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

                //TODO
                //컨텐트 삭제 방지. ok
                //더블클릭시 보여줄 액티비티 아이디: cur_wfa_config_id. ok
                //마우스 업 시에 선 하이라이트 만들기. ok
                //행 추가 api 콘텍스트에서 조정하기. ok
                //컨테이너 높이 조정. 마추기. ok
                //GMT 0 시간인데,  사용자 로컬 피시 타임존으로 바꾸기. ok
                //더블클릭 아이템 쇼우하기. ok
                //삭제 후 재구성 시에 셀 속에 sort 된 차례대로 살리기.
                //행추가시 헤더 데이터에 커스텀 값 입력해서, 데이터 헤더에 없어도 살려두기.

                // 1.컨테이너 높이 min 설정.
                // 2.시간은 빼기.(날짜만.)
                // 3.세로는 고정.
                // 4.셀 안에서 컨텐트들이 자유롭게 움직이는 방안.
                //
                // 5.삭제 만들기 삭제하면 전부 왼쪽으로 가기.
                // 6.칼럼 신규 추가, 프로젝트 복사시 그 칼럼의 인덱스대로 추가해놓기.

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
     * rows 데이터 를 조회하여, 주어진 액티비티에 해당하는 정보를 반환한다.
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
                if (typeof values == 'object') {
                    $.each(values, function (v, value) {
                        if (activityId == value['tot_wfa']) {
                            selected = {
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
        var tableElement;

        me.existJson = null;
        me.canvas.clear();

        //기존 json 정보가 있을 경우 로드 한 후, 데이터 테이블을 얻어온다.
        if (existJson) {
            me.existJson = existJson;
            me.canvas.loadJSON(existJson);
            var tables = me.canvas.getElementsByShapeId('OG.shape.component.DataTable');
            if (tables && tables.length) {
                tableElement = tables[0];
                dataTable = tableElement.shape;
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
            columnEditable: false,
            axis: 'X',
            pageLength: 100,
            currentPage: 1,
            columnHeight: 30,
            columnWidth: 160,
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
            var convertDate;

            function getLocaleShortDateString(d) {
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

                var l = navigator.language ? navigator.language : navigator['userLanguage'], y = d.getFullYear(), m = d.getMonth() + 1, d = d.getDate();
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

            try {
                convertDate = new Date(headers[i]['_end_date'] + ' GMT');
                convertDate = getLocaleShortDateString(convertDate);
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

        var rowData = [];
        for (var i = 0; i < rows.length; i++) {
            var row = {};
            //제일 앞 칼럼은 팀이름 데이터
            row['team'] = rows[i]['_eng_func_code'];
            rowData.push(row);
        }

        //할일.
        //기존 액티비티들만 살려서 row 를 꾸민다.
        //신규 액티비티들을 푸쉬한다.

        //기존 데이터 테이블에 있는 액티비티를 재구성한다.
        $.each(activities, function (a, activity) {
            var rowByTeam = me.getDataRowByTeam(activity['cur_eng_func_code'], rowData);

            var column, isExist = false, contentIndex = 0;

            //기존 데이터가 있다면, 기존 액티비티가 들어있는 칼럼을 찾는다.
            if (existTableData) {
                var existActivityInfo = me.getExistActivityFromRowsData(activity, existTableData);
                if (existActivityInfo) {
                    column = existActivityInfo.column;

                    //칼럼이 옵션 칼럼 리스트 안에 포함되어있다면
                    if (me.getColumnByField(options.columns, column)) {
                        isExist = true;
                        contentIndex = existActivityInfo.contentIndex;
                    }else{
                        column = null;
                    }
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
            tableElement = this.canvas.drawShape([50, 50], dataTable, [100, 100], {});
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

        var boundary = me.canvas.getBoundary(tableElement);


        //캔버스 사이즈 조정
        this.canvas.setCanvasSize([boundary.getWidth() + 5, boundary.getHeight() + 5]);

        //컨테이너 높이 조정
        var containerHeight = me._CONFIG.CONTAINER_MIN_HEIGHT;
        if(boundary.getHeight() + 30 > containerHeight){
            containerHeight = boundary.getHeight() + 30;
        }
        this._CONTAINER.height(containerHeight);
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
        var chartRenderer = this;
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

        OG.shape.bpmn.A_Task.prototype.createSubShape = function () {
            this.sub = [];
            return this.sub;
        };

        OG.shape.bpmn.A_Task.prototype.createContextMenu = function () {
            var me = this;
            this.contextMenu = {
                'property': {
                    name: '정보보기', callback: function () {
                        if (me.data && me.data['cur_wfa_config_id']) {
                            if (chartRenderer.viewController.aras) {
                                chartRenderer.viewController.aras.showPropertyWindow('activity', me.data['cur_wfa_config_id']);
                            }
                        }
                    }
                }
            };
            return this.contextMenu;
        };
        OG.shape.bpmn.A_Task.prototype.onDrawShape = function () {
            var me = this;
            $(me.currentElement).bind('mouseover', function (event) {
                var prevEdges = me.currentCanvas.getPrevEdges(me.currentElement);
                var nextEdges = me.currentCanvas.getNextEdges(me.currentElement);
                var edges = prevEdges.concat(nextEdges);
                $.each(edges, function (i, edge) {
                    me.currentCanvas.setShapeStyle(edge, {
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
                });
            });
            $(me.currentElement).bind('mouseout', function () {
                var prevEdges = me.currentCanvas.getPrevEdges(me.currentElement);
                var nextEdges = me.currentCanvas.getNextEdges(me.currentElement);
                var edges = prevEdges.concat(nextEdges);
                var style = JSON.parse(JSON.stringify(chartRenderer.canvas._CONFIG.DEFAULT_STYLE.EDGE));
                style.marker = null;
                $.each(edges, function (i, edge) {
                    me.currentCanvas.setShapeStyle(edge, style);
                });
            });

            $(me.currentElement).bind({
                'dblclick': function () {
                    if (me.data && me.data['cur_wfa_config_id']) {
                        if (chartRenderer.viewController.aras) {
                            chartRenderer.viewController.aras.showPropertyWindow('activity', me.data['cur_wfa_config_id']);
                        }
                    }
                }
            });
        };

        OG.shape.component.Cell.prototype.createContextMenu = function () {
            var me = this;

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
                                console.log('cellView.cellIndex' , cellView.cellIndex);
                                var existColumn = table.shape.getColumnByField(cellView.column);
                                table.shape.addColumn({
                                    data: guid(),
                                    title: '',
                                    defaultContent: '',
                                    renderer: existColumn.renderer,
                                    columnEditable: false
                                }, cellView.cellIndex + 1);
                            }
                        },
                        'right': {
                            name: '왼쪽 열 추가', callback: function () {
                                console.log('cellView.cellIndex' , cellView.cellIndex);
                                var existColumn = table.shape.getColumnByField(cellView.column);
                                table.shape.addColumn({
                                    data: guid(),
                                    title: '',
                                    defaultContent: '',
                                    renderer: existColumn.renderer,
                                    columnEditable: false
                                }, cellView.cellIndex);
                            }
                        },
                        'remove': {
                            name: '열 삭제', callback: function () {
                                console.log('cellView.cellIndex' , cellView.cellIndex);
                                table.shape.removeColumn(cellView.cellIndex);
                            }
                        }
                    };
                    return this.contextMenu;
                }
            } else {
                return {};
            }
        };
    }

};
ChartRenderer.prototype.constructor = ChartRenderer;