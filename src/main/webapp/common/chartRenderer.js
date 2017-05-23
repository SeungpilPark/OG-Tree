/**
 * Open graph Tree Library (OG-Tree)
 *
 * @class
 * @requires OG.*
 *
 * @param {String} container Dom Element Id
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ChartRenderer = function (container) {
    this._CONFIG = {
        /**
         * 캔버스 높이
         */
        CONTAINER_HEIGHT: 600
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
    //ENABLE_HOTKEY

    this._RENDERER = this.canvas._RENDERER;
    this._HANDLER = this.canvas._HANDLER;
};
ChartRenderer.prototype = {

    /**
     * 캔버스를 초기 빌드한다.  최초 1번만 실행된다.
     */
    init: function () {
        var me = this;
        me.render();
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


    //========================================================================//
    //===========================Render apis==================================//
    //========================================================================//
    /**
     * 스토리지의 데이터를 기반으로 화면에 렌더링한다.
     */
    render: function () {
        var dataTable = new OG.DataTable();
        dataTable.MOVABLE = false;
        var renderer = function (value) {
            var result = {
                contents: [],
                contentsPosition: {
                    /**
                     * 컨텐츠 배열
                     */
                    arrangement: 'horizontal', //수평 || vertical 수직

                    /**
                     * 컨텐츠 배열 마진 (number,px,%)
                     */
                    arrangementMargin: '10',
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
            }
            if (!value) {
                return result;
            }
            if (value && typeof value != 'object') {
                return result;
            }

            for (var i = 0; i < value.length; i++) {
                var contentData = value[i];
                if (contentData.type == 'text') {
                    result.contents.push({
                        shape: new OG.TextShape(value.value),
                        width: '80px',
                        height: '78px',
                        style: {
                            'fill': '#f8f8f8',
                            'fill-opacity': 1,
                            'font-size': 9
                        }
                    });
                }

                if (contentData.type == 'activity') {
                    result.contents.push({
                        /**
                         * 도형 shape
                         */
                        shape: new OG.A_Task(contentData.value),
                        /**
                         * 도형 가로 (number,px,%)
                         */
                        width: '80px',
                        /**
                         * 도형 세로 (number,px,%)
                         */
                        height: '38px',
                        /**
                         * 도형 스타일
                         */
                        style: {
                            'fill': '#fff',
                            'fill-opacity': 1,
                            'font-size': 9
                        }
                    })
                }

                if (contentData.type == 'doubleActivity') {
                    result.contents.push({
                        shape: new OG.A_Task(value.value),
                        width: '80px',
                        height: '78px',
                        style: {
                            'fill': '#f8f8f8',
                            'fill-opacity': 1,
                            'font-size': 9
                        }
                    });
                }
            }
            return result;
        };

        //옵션데이터
        var options = {
            /**
             * 셀 콘텐트 axis 무브
             */
            axis: 'none',
            /**
             * 페이지당 row 수
             */
            pageLength: 25,
            /**
             * 시작 페이지
             */
            currentPage: 1,
            /**
             * 디폴트 칼럼 높이
             */
            columnHeight: 30,
            /**
             * 디폴트 칼럼 가로폭
             */
            columnWidth: 140,
            /**
             * 디폴트 칼럼 스타일
             */
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

            /**
             * 디폴트 cell 높이
             */
            cellHeight: 40,
            /**
             * 디폴트 셀 스타일
             */
            cellStyle: {
                'fill': '#fff',
                'fill-opacity': 0,
                'font-size': 8,
                'border-right': {
                    'stroke': '#ebeaed',
                    'stroke-width': '1'
                }
            },
            /**
             * 칼럼 정의
             */
            columns: [
                {
                    /**
                     * 데이터 필드 이름
                     */
                    data: 'activity',
                    /**
                     * 칼럼 타이틀
                     */
                    title: '주요 Activity\n일정(D day)',
                    /**
                     * 디폴트 컨텐츠
                     */
                    defaultContent: '',
                    /**
                     * 칼럼 너비
                     */
                    columnWidth: 100,
                    /**
                     * 칼럼 스타일
                     */
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
                    /**
                     * 칼럼에 소속된 셀 스타일
                     */
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
                },
                {
                    data: '90',
                    title: '견적 착수\n90',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '85',
                    title: 'IRS\n85',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '80',
                    title: 'Ref.PJT 선정',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '75',
                    title: 'HBD\n75',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '70',
                    title: 'WBD\n70',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '65',
                    title: 'P&ID\n65',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '60',
                    title: 'P&ID\n60',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '55',
                    title: 'P&ID\n55',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '50',
                    title: 'P&ID\n50',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '100',
                    title: 'P&ID\n100',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '101',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '102',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '103',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '104',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '105',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '106',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '107',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '108',
                    title: 'P&ID\n45',
                    defaultContent: '',
                    renderer: renderer
                },
                {
                    data: '40',
                    title: 'Plot Plan\n40',
                    defaultContent: '',
                    renderer: renderer,
                    columnStyle: {
                        'border-right': {
                            'stroke': '#abaaad',
                            'stroke-width': '1'
                        }
                    }
                }
            ]
        };


        var data = [
            {
                activity: 'FUNCTION'
            },
            {
                activity: '견적 TFT / EM',
                '90': [
                    {type: 'activity', value: 'ITB 배포'},
                    {type: 'activity', value: 'ITB 배포2'}
                ],
                '75': [
                    {type: 'activity', value: 'Reference PJT 선정'}
                ]
            },
            {
                activity: '성능',
                '75': [
                    {type: 'activity', value: 'Plant Configuration'}
                ],
                '70': [
                    {type: 'activity', value: 'Performance Guideline'}
                ],
                '65': [
                    {type: 'activity', value: 'Plant HBD\n(보안문서)'}
                ]
            },
            {
                activity: '프로세스',
                '60': [
                    {type: 'doubleActivity', value: 'Utility\nConsumption\n취합'}
                ],
                '50': [
                    {type: 'doubleActivity', value: 'P&ID\nCalculation'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '플랜트(보조기기)',
                '55': [
                    {type: 'activity', value: 'WBD'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '플랜트(주기기)\nor STG,BLR BG',
                '75': [
                    {type: 'activity', value: 'MPS'}
                ],
                '70': [
                    {type: 'activity', value: 'GT data / STG\nHBD'}
                ],
                '65': [
                    {type: 'activity', value: 'BLR / HRSG\nPerformance\nData'}
                ],
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '배관'
            },
            {
                activity: '배치',
                '40': [
                    {type: 'activity', value: 'Plot\nplan'}
                ]
            },
            {
                activity: '운반',
                '85': [
                    {type: 'largeActivity', value: 'IRS\n&\nBIGS'}
                ],
                '80': [
                    {type: 'largeActivity', value: 'Devajtion\n&\nClarification'}
                ],
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '50': [
                    {type: 'activity', value: 'CHS & LHS\nFlowdagram'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '수처리',
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '55': [
                    {type: 'activity', value: 'Conceptual\nDesign\nCalculation'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: 'HVAC',
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: 'Fire Fighting',
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '전력',
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '계측',
                '60': [
                    {type: 'activity', value: 'Utility\nConsumption'}
                ],
                '45': [
                    {type: 'activity', value: 'Pre-requisite\ndata'}
                ]
            },
            {
                activity: '건축',
                '40': [
                    {type: 'activity', value: 'Building list'}
                ]
            },
            {
                activity: '토목',
                '90': [
                    {type: 'report', value: 'SI Report\nPhotography\nStudy'}
                ],
                '50': [
                    {type: 'horizontalActivity', value: 'Coal Jetty Design\n Coal Storage Yard Design'}
                ]
            },
            {
                activity: ''
            }
        ];
        dataTable.setOptions(options);
        dataTable.setData(data);

        this.canvas.drawShape([50, 50], dataTable, [100, 100], {});
        dataTable.draw();


        //최초 로딩 시간 단축을 위해, draw 후 또 draw 를 방지하자.

        //데이터 로딩
        //프로젝트가 없다면 신규 datatable shape.
        //있다면 datatable shape 만 얻어옴.
        //shape data 비교 => data update 후 draw
        //Edge 들 shape, style 얻어옴.
        //Edge 들 draw.


        //refresh 일 경우.
        //데이터 로딩
        //Edge 삭제
        //shape data 비교 => data update 후 draw
        //Edge 들 shape,style 얻어옴.
        //Edge 들 draw.
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