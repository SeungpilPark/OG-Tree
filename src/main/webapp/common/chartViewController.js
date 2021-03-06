/**
 * ChartViewController html view Handler
 *
 * @class
 *
 * @author <a href="mailto:sppark@uengine.org">Seungpil Park</a>
 */
var ChartViewController = function () {
    /**
     * ChartRenderer 클래스
     * @type {Tree}
     */
    this.renderer = null;

    /**
     * Aras 클래스
     * @type {Aras}
     */
    this.aras = null;

    /**
     * Edit 모드
     * @type {string}
     */
    this.editMode = true;


    this.chartStateJson = null;
};
ChartViewController.prototype = {
    /**
     * 차트의 스테이터스 컬러 정보를 가져온다.
     * @return {null|*}
     */
    getChartStateJson: function () {
        return this.chartStateJson;
    },
    /**
     * Html 페이지가 처음 로딩되었을 때 차크 렌더러를 활성화하고, 데이터를 불러온다.
     */
    init: function () {
        var me = this;

        if (parent.top.aras) {
            me.aras = new DataController(null, null, me);
            me.aras.init();
            me.renderHeaders(me.aras.projectName);

            this.editMode = me.aras.checkPM();
            if (typeof this.editMode == 'string' && this.editMode == 'true') {
                this.editMode = true;
            } else {
                this.editMode = false;
            }
            $('#print').hide();
        }

        me.renderer = new ChartRenderer('canvas', me, this.editMode);
        me.renderer.init();

        //에디트 모드가 아닐경우 save,alignment 숨김
        if (!this.editMode) {
            $('#save').hide();
            $('#alignment').hide();
        }

        me.renderStateBox();

        $('#zoomIn').click(function () {
            var scale = me.renderer.getScale();
            var reScale = scale + 0.1;
            if (reScale > 3) {
                return;
            } else {
                me.renderer.setScale(reScale);
            }
        });
        $('#zoomOut').click(function () {
            var scale = me.renderer.getScale();
            var reScale = scale - 0.1;
            if (reScale < 0.2) {
                return;
            } else {
                me.renderer.setScale(reScale);
            }
        });
        $('#zoomFit').click(function () {
            me.renderer.zoomFit();
        });

        $('#print').click(function () {
            console.log(JSON.stringify(me.renderer.canvas.toJSON()));
        });

        $('#save').click(function () {
            var mapData = JSON.stringify(me.renderer.canvas.toJSON());
            if (mapData) {
                var saved = me.aras.saveMapData(mapData);
                toastr.success('Workflow Saved');
            } else {
                toastr.error('Failed to save');
            }
        });

        $('#refresh').click(function () {
            try {
                me.startRender();
                toastr.success('Refreshed.');
            } catch (e) {
                toastr.error('Refresh failed.');
            }
        });

        $('#alignment').click(function () {
            me.renderer.lineAlignment();
        });

        me.startRender();
    },
    /**
     * 챠트 렌더러가 렌더링을 시작하도록 한다.
     */
    //TODO 차트 렌더링은 여기서부터 시작합니다.
    startRender: function () {
        var me = this;
        blockStart();
        setTimeout(function(){
            if (parent.top.aras) {
                var data = me.aras.getChartData();
                me.renderer.render(data.chartData, data.chartMap);

            } else {
                me.getSampleData(function (chartData, chartMap) {
                    me.renderer.render(chartData, chartMap);
                });
            }
            blockStop();
        },100);
    },
    /**
     * common/chartState.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.
     */
    renderStateBox: function () {
        var me = this;
        var stdYN = 'N';
        if (me.aras && me.aras.stdYN) {
            stdYN = me.aras.stdYN;
        }
        $.ajax({
            type: 'GET',
            url: 'common/chartState.json',
            dataType: 'json',
            async: false,
            success: function (data) {
                me.chartStateJson = data;
            }
        });
        var stateColorBox = $('.state-color');
        var renderState = function (name, color, stroke) {
            var bar = $('<li><a href="Javascript:void(0)"><div class="state-bar">&nbsp;</div>' + name + '</a></li>');
            stateColorBox.append(bar);
            if (stroke) {
                bar.find('.state-bar').css('border', '1px solid ' + stroke);
            }
            if (color) {
                bar.find('.state-bar').css('background-color', color);
            }
        };
        if (me.chartStateJson) {
            stateColorBox.html('');
            for (var i = 0; i < me.chartStateJson.length; i++) {
                renderState(me.chartStateJson[i]['name'], me.chartStateJson[i]['color'], me.chartStateJson[i]['stroke']);
            }
        }
    },
    /**
     * Html 페이지의 헤더 부분에 프로젝트 정보를 표기한다.
     * @param headerItem {String} 프로젝트 이름
     */
    renderHeaders: function (headerItem) {
        $('[name=pjt_name]').html(headerItem);
    },
    /**
     * Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.
     * @param callback
     */
    getSampleData: function (callback) {
        $.getJSON("common/sampleData/chartData.json", function (chartData) {
            //callback(chartData);
            $.getJSON("common/sampleData/chartMap.json", function (chartMap) {
                callback(chartData, chartMap);
            });
        });
    }
}
;
ChartViewController.prototype.constructor = ChartViewController;

$(function () {
    var viewController = new ChartViewController();
    viewController.init();
});
