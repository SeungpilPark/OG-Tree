/**
 * Doosan html view Handler
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
     * Dev 모드
     * @type {string}
     */
    this.mode = 'sample'; //random,sample


    this.chartStateJson = null;
};
ChartViewController.prototype = {
    getChartStateJson: function () {
        return this.chartStateJson;
    },
    /**
     * Html 페이지가 처음 로딩되었을 때 차크 렌더러를 활성화하고, 데이터를 불러온다.
     */
    init: function () {
        var me = this;
        me.renderer = new ChartRenderer('canvas', me);
        me.renderer.init();

        if (parent.top.aras) {
            me.aras = new DataController(null, me.renderer, me);
            me.aras.init();

            // var headerItem = me.aras.getWorkflowHeader(me.aras.wfId);
            // if (headerItem.getItemCount() == 1) {
            //     me.renderHeaders(headerItem);
            // }
            me.renderHeaders(me.aras.projectName);
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
            me.renderer.setScale(1);
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
            try{
                me.startRender();
                toastr.success('Refreshed.');
            }catch (e){
                toastr.error('Refresh failed.');
            }
        });

        me.startRender();
    },
    startRender: function () {
        var me = this;
        if (parent.top.aras) {
            var data = me.aras.getChartData();
            me.renderer.render(data.chartData, data.chartMap);

        } else {
            me.getSampleData(function (chartData, chartMap) {
                me.renderer.render(chartData, chartMap);
            });
        }
    },
    /**
     * common/state.json 에 저장된 스테이터스 데이터를 불러와 스테이터스 박스를 구성한다.
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
     * @param headerItem
     * @param myOther
     */
    renderHeaders: function (headerItem) {
        console.log('headerItem', headerItem);

        var targetTable = $('#targetTable');
        // var project_code = headerItem.getProperty('project_code', '');
        // var process_id = headerItem.getProperty('process_id', '');
        // var pjt_name = headerItem.getProperty('pjt_name', '');
        // var processname = headerItem.getProperty('processname', '');
        // var sub_processname = headerItem.getProperty('sub_processname', '');
        // targetTable.find('[name=project_code]').html(project_code);
        // targetTable.find('[name=process_id]').html(process_id);
        // targetTable.find('[name=pjt_name]').html(pjt_name);
        // targetTable.find('[name=processname]').html(processname);
        // targetTable.find('[name=sub_processname]').html(sub_processname);

        targetTable.find('[name=pjt_name]').html(headerItem);
    },
    /**
     * Dev 모드일시 개발용 샘플 데이터를 오픈그래프 트리에 반영한다.
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
